import { Shield, Globe, Search, Server, Wifi, FileCode, Zap, ArrowRight, ArrowDown } from "lucide-react";

const FlowStep = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
  <div className="flex items-start gap-3 bg-secondary/50 border border-border rounded-lg p-4">
    <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shrink-0`}>
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
    <div>
      <h4 className="font-semibold text-sm text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
    </div>
  </div>
);

const FlowArrow = () => (
  <div className="flex justify-center py-1">
    <ArrowDown className="w-5 h-5 text-primary/60" />
  </div>
);

export const AnalysisFlowchart = () => {
  return (
    <div className="space-y-8">
      {/* How It Works Theory */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-3">How SiteScope Analysis Works</h3>
        <div className="bg-secondary/30 border border-border rounded-xl p-5 space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">SiteScope</strong> performs a comprehensive, non-intrusive analysis of any website using a multi-layered 
            approach. When you submit a URL, our backend engine executes several parallel checks to gather intelligence 
            about the target website's security posture, performance, and configuration.
          </p>
          <p>
            The analysis leverages <strong className="text-foreground">Google DNS-over-HTTPS (DoH)</strong> for DNS resolution, 
            <strong className="text-foreground"> HTTP header inspection</strong> for security analysis, 
            <strong className="text-foreground"> regex-based HTML scanning</strong> for technology detection and SEO auditing, 
            and <strong className="text-foreground"> response timing</strong> for performance measurement — all without relying on 
            third-party scraping services.
          </p>
          <p>
            Each analysis module produces a score or grade that is aggregated into an overall security assessment with 
            actionable recommendations for improvement.
          </p>
        </div>
      </div>

      {/* Visual Flowchart */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-3">Analysis Pipeline Flowchart</h3>
        <div className="bg-secondary/30 border border-border rounded-xl p-5">
          {/* Step 1: Input */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
            <p className="font-bold text-primary text-sm">🌐 User Submits URL</p>
            <p className="text-xs text-muted-foreground">URL is normalized (https:// prefix added if missing)</p>
          </div>
          <FlowArrow />

          {/* Step 2: Backend */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
            <p className="font-bold text-primary text-sm">⚡ Edge Function Triggered</p>
            <p className="text-xs text-muted-foreground">Serverless backend function processes the request</p>
          </div>
          <FlowArrow />

          {/* Parallel Analysis */}
          <div className="border-2 border-dashed border-primary/30 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-primary text-center mb-3">⟡ PARALLEL ANALYSIS MODULES ⟡</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FlowStep
                icon={Wifi}
                title="DNS Resolution"
                description="Google DoH API queries for A, MX, NS, TXT records"
                color="bg-primary"
              />
              <FlowStep
                icon={Shield}
                title="Security Headers"
                description="Checks HSTS, CSP, X-Frame-Options, XSS Protection, Referrer-Policy"
                color="bg-primary"
              />
              <FlowStep
                icon={Search}
                title="SEO Audit"
                description="Scans for title, meta description, viewport, canonical, robots.txt, sitemap.xml"
                color="bg-primary"
              />
              <FlowStep
                icon={FileCode}
                title="Technology Detection"
                description="Regex pattern matching on HTML + header analysis for frameworks & services"
                color="bg-primary"
              />
              <FlowStep
                icon={Zap}
                title="Performance Metrics"
                description="Measures response time, content length, and compression status"
                color="bg-primary"
              />
              <FlowStep
                icon={Server}
                title="Server Fingerprinting"
                description="Extracts server software, powered-by headers, IP address, protocol info"
                color="bg-primary"
              />
            </div>
          </div>
          <FlowArrow />

          {/* Scoring */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
            <p className="font-bold text-primary text-sm">📊 Score Aggregation & Grading</p>
            <p className="text-xs text-muted-foreground">Security grade (A+ to F), SEO score, header score calculated</p>
          </div>
          <FlowArrow />

          {/* Output */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
            <p className="font-bold text-primary text-sm">📋 Results Dashboard</p>
            <p className="text-xs text-muted-foreground">Interactive report with grades, DNS records, tech stack, and recommendations</p>
          </div>
        </div>
      </div>

      {/* Tools & Technologies Used */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-3">Tools & Technologies Used</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "Google DNS-over-HTTPS", desc: "Secure DNS resolution API for querying A, MX, NS, TXT records without running a DNS server." },
            { name: "HTTP Header Inspection", desc: "Analyzes response headers for security best practices (HSTS, CSP, X-Frame-Options, etc.)." },
            { name: "Regex HTML Scanner", desc: "Pattern matching engine that detects frameworks, CMS platforms, and analytics tools from page source." },
            { name: "Edge Functions (Deno)", desc: "Serverless compute layer running on Deno runtime for fast, secure backend processing." },
            { name: "SEO Auditor", desc: "Checks for essential SEO elements: title tags, meta descriptions, canonical URLs, sitemaps." },
            { name: "Performance Timer", desc: "Measures server response time, content size, and compression to evaluate site speed." },
          ].map((tool, i) => (
            <div key={i} className="bg-secondary/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold text-sm text-foreground">{tool.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
