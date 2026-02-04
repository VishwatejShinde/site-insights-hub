import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisResult {
  url: string;
  timestamp: string;
  basicInfo: {
    domain: string;
    ip: string | null;
    protocol: string;
    port: number;
  };
  ssl: {
    valid: boolean;
    issuer: string | null;
    expiresAt: string | null;
    grade: string;
    protocol: string | null;
  };
  dns: {
    aRecords: string[];
    mxRecords: string[];
    txtRecords: string[];
    nsRecords: string[];
  };
  headers: {
    server: string | null;
    xPoweredBy: string | null;
    contentType: string | null;
    securityHeaders: {
      strictTransportSecurity: boolean;
      xFrameOptions: boolean;
      xContentTypeOptions: boolean;
      contentSecurityPolicy: boolean;
      xXssProtection: boolean;
      referrerPolicy: boolean;
    };
    score: number;
  };
  performance: {
    responseTime: number;
    contentLength: number | null;
    compression: boolean;
  };
  technologies: string[];
  seo: {
    hasTitle: boolean;
    hasDescription: boolean;
    hasViewport: boolean;
    hasCanonical: boolean;
    hasRobotsTxt: boolean;
    hasSitemap: boolean;
    score: number;
  };
  security: {
    grade: string;
    issues: string[];
    recommendations: string[];
  };
}

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'SiteScope Security Analyzer/1.0'
      }
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return url.replace(/^(https?:\/\/)?/, '').split('/')[0];
  }
}

function detectTechnologies(headers: Headers, html: string): string[] {
  const technologies: string[] = [];
  
  // Server detection
  const server = headers.get('server');
  if (server) {
    if (server.toLowerCase().includes('nginx')) technologies.push('Nginx');
    if (server.toLowerCase().includes('apache')) technologies.push('Apache');
    if (server.toLowerCase().includes('cloudflare')) technologies.push('Cloudflare');
    if (server.toLowerCase().includes('vercel')) technologies.push('Vercel');
    if (server.toLowerCase().includes('netlify')) technologies.push('Netlify');
  }
  
  // X-Powered-By detection
  const poweredBy = headers.get('x-powered-by');
  if (poweredBy) {
    if (poweredBy.toLowerCase().includes('php')) technologies.push('PHP');
    if (poweredBy.toLowerCase().includes('asp.net')) technologies.push('ASP.NET');
    if (poweredBy.toLowerCase().includes('express')) technologies.push('Express.js');
    if (poweredBy.toLowerCase().includes('next.js')) technologies.push('Next.js');
  }
  
  // HTML-based detection
  if (html.includes('react')) technologies.push('React');
  if (html.includes('vue')) technologies.push('Vue.js');
  if (html.includes('angular')) technologies.push('Angular');
  if (html.includes('jquery')) technologies.push('jQuery');
  if (html.includes('bootstrap')) technologies.push('Bootstrap');
  if (html.includes('tailwind')) technologies.push('Tailwind CSS');
  if (html.includes('wordpress')) technologies.push('WordPress');
  if (html.includes('shopify')) technologies.push('Shopify');
  if (html.includes('wix')) technologies.push('Wix');
  if (html.includes('squarespace')) technologies.push('Squarespace');
  if (html.includes('gatsby')) technologies.push('Gatsby');
  if (html.includes('nuxt')) technologies.push('Nuxt.js');
  if (html.includes('svelte')) technologies.push('Svelte');
  
  // Analytics & tracking
  if (html.includes('google-analytics') || html.includes('gtag')) technologies.push('Google Analytics');
  if (html.includes('hotjar')) technologies.push('Hotjar');
  if (html.includes('segment')) technologies.push('Segment');
  if (html.includes('mixpanel')) technologies.push('Mixpanel');
  
  return [...new Set(technologies)];
}

function analyzeSecurityHeaders(headers: Headers): { headers: AnalysisResult['headers']['securityHeaders']; score: number } {
  const securityHeaders = {
    strictTransportSecurity: headers.has('strict-transport-security'),
    xFrameOptions: headers.has('x-frame-options'),
    xContentTypeOptions: headers.has('x-content-type-options'),
    contentSecurityPolicy: headers.has('content-security-policy'),
    xXssProtection: headers.has('x-xss-protection'),
    referrerPolicy: headers.has('referrer-policy'),
  };
  
  const count = Object.values(securityHeaders).filter(Boolean).length;
  const score = Math.round((count / 6) * 100);
  
  return { headers: securityHeaders, score };
}

function analyzeSEO(html: string): AnalysisResult['seo'] {
  const hasTitle = /<title[^>]*>.*?<\/title>/i.test(html);
  const hasDescription = /<meta[^>]*name=["']description["'][^>]*>/i.test(html);
  const hasViewport = /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html);
  const hasCanonical = /<link[^>]*rel=["']canonical["'][^>]*>/i.test(html);
  
  const checks = [hasTitle, hasDescription, hasViewport, hasCanonical];
  const score = Math.round((checks.filter(Boolean).length / 4) * 100);
  
  return {
    hasTitle,
    hasDescription,
    hasViewport,
    hasCanonical,
    hasRobotsTxt: false, // Will check separately
    hasSitemap: false, // Will check separately
    score,
  };
}

function calculateSecurityGrade(result: Partial<AnalysisResult>): { grade: string; issues: string[]; recommendations: string[] } {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;
  
  // SSL checks
  if (!result.ssl?.valid) {
    score -= 30;
    issues.push('SSL certificate is invalid or missing');
    recommendations.push('Install a valid SSL certificate');
  }
  
  // Security headers checks
  if (result.headers?.securityHeaders) {
    if (!result.headers.securityHeaders.strictTransportSecurity) {
      score -= 10;
      issues.push('Missing Strict-Transport-Security header');
      recommendations.push('Add HSTS header to enforce HTTPS');
    }
    if (!result.headers.securityHeaders.xFrameOptions) {
      score -= 10;
      issues.push('Missing X-Frame-Options header');
      recommendations.push('Add X-Frame-Options to prevent clickjacking');
    }
    if (!result.headers.securityHeaders.contentSecurityPolicy) {
      score -= 10;
      issues.push('Missing Content-Security-Policy header');
      recommendations.push('Implement CSP to prevent XSS attacks');
    }
    if (!result.headers.securityHeaders.xContentTypeOptions) {
      score -= 5;
      issues.push('Missing X-Content-Type-Options header');
      recommendations.push('Add X-Content-Type-Options: nosniff');
    }
  }
  
  let grade: string;
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 60) grade = 'C';
  else if (score >= 50) grade = 'D';
  else grade = 'F';
  
  return { grade, issues, recommendations };
}

async function performDNSLookup(domain: string): Promise<AnalysisResult['dns']> {
  try {
    // Use DNS over HTTPS for lookups
    const dnsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
    const dnsData = await dnsResponse.json();
    
    const mxResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    const mxData = await mxResponse.json();
    
    const nsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=NS`);
    const nsData = await nsResponse.json();
    
    const txtResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=TXT`);
    const txtData = await txtResponse.json();
    
    return {
      aRecords: dnsData.Answer?.map((a: { data: string }) => a.data) || [],
      mxRecords: mxData.Answer?.map((a: { data: string }) => a.data) || [],
      nsRecords: nsData.Answer?.map((a: { data: string }) => a.data) || [],
      txtRecords: txtData.Answer?.map((a: { data: string }) => a.data) || [],
    };
  } catch {
    return { aRecords: [], mxRecords: [], nsRecords: [], txtRecords: [] };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    const domain = extractDomain(normalizedUrl);
    const parsedUrl = new URL(normalizedUrl);
    
    // Start timing
    const startTime = Date.now();
    
    // Fetch the page
    let response: Response;
    let html = '';
    let fetchError = false;
    
    try {
      response = await fetchWithTimeout(normalizedUrl);
      html = await response.text();
    } catch (e) {
      fetchError = true;
      response = new Response('', { status: 0 });
    }
    
    const responseTime = Date.now() - startTime;
    
    // Perform DNS lookup
    const dns = await performDNSLookup(domain);
    
    // Check for robots.txt and sitemap
    let hasRobotsTxt = false;
    let hasSitemap = false;
    
    try {
      const robotsResponse = await fetchWithTimeout(`${parsedUrl.origin}/robots.txt`, 5000);
      hasRobotsTxt = robotsResponse.ok;
    } catch {}
    
    try {
      const sitemapResponse = await fetchWithTimeout(`${parsedUrl.origin}/sitemap.xml`, 5000);
      hasSitemap = sitemapResponse.ok;
    } catch {}
    
    // Analyze security headers
    const headerAnalysis = analyzeSecurityHeaders(response.headers);
    
    // Analyze SEO
    const seoAnalysis = analyzeSEO(html);
    seoAnalysis.hasRobotsTxt = hasRobotsTxt;
    seoAnalysis.hasSitemap = hasSitemap;
    
    // Recalculate SEO score with robots and sitemap
    const seoChecks = [
      seoAnalysis.hasTitle,
      seoAnalysis.hasDescription,
      seoAnalysis.hasViewport,
      seoAnalysis.hasCanonical,
      hasRobotsTxt,
      hasSitemap
    ];
    seoAnalysis.score = Math.round((seoChecks.filter(Boolean).length / 6) * 100);
    
    // Detect technologies
    const technologies = detectTechnologies(response.headers, html);
    
    // Build result object
    const result: AnalysisResult = {
      url: normalizedUrl,
      timestamp: new Date().toISOString(),
      basicInfo: {
        domain,
        ip: dns.aRecords[0] || null,
        protocol: parsedUrl.protocol.replace(':', ''),
        port: parseInt(parsedUrl.port) || (parsedUrl.protocol === 'https:' ? 443 : 80),
      },
      ssl: {
        valid: parsedUrl.protocol === 'https:' && !fetchError,
        issuer: null, // Would need TLS inspection
        expiresAt: null,
        grade: parsedUrl.protocol === 'https:' && !fetchError ? 'A' : 'F',
        protocol: 'TLS 1.3', // Assumed for modern sites
      },
      dns,
      headers: {
        server: response.headers.get('server'),
        xPoweredBy: response.headers.get('x-powered-by'),
        contentType: response.headers.get('content-type'),
        securityHeaders: headerAnalysis.headers,
        score: headerAnalysis.score,
      },
      performance: {
        responseTime,
        contentLength: parseInt(response.headers.get('content-length') || '0') || html.length,
        compression: response.headers.get('content-encoding')?.includes('gzip') || false,
      },
      technologies,
      seo: seoAnalysis,
      security: { grade: 'A', issues: [], recommendations: [] },
    };
    
    // Calculate security grade
    result.security = calculateSecurityGrade(result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error: unknown) {
    console.error('Analysis error:', error);
    const message = error instanceof Error ? error.message : 'Failed to analyze URL';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
