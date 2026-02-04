export interface AnalysisResult {
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
