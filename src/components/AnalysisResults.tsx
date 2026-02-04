import { motion } from "framer-motion";
import { 
  Shield, Globe, Lock, Server, Zap, FileCode, Search, 
  AlertTriangle, CheckCircle, XCircle, Clock, Database,
  Wifi, FileText, ArrowLeft, RefreshCw, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AnalysisResult } from "@/types/analysis";

interface AnalysisResultsProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
  onRetry: () => void;
}

const GradeDisplay = ({ grade, label }: { grade: string; label: string }) => {
  const gradeColors: Record<string, string> = {
    'A+': 'text-success bg-success/10 border-success/30',
    'A': 'text-success bg-success/10 border-success/30',
    'B': 'text-info bg-info/10 border-info/30',
    'C': 'text-warning bg-warning/10 border-warning/30',
    'D': 'text-warning bg-warning/10 border-warning/30',
    'F': 'text-destructive bg-destructive/10 border-destructive/30',
  };
  
  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 text-2xl font-bold ${gradeColors[grade] || gradeColors['F']}`}>
        {grade}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

const ScoreBar = ({ score, label }: { score: number; label: string }) => {
  const getColor = (s: number) => {
    if (s >= 80) return 'bg-success';
    if (s >= 60) return 'bg-info';
    if (s >= 40) return 'bg-warning';
    return 'bg-destructive';
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{score}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${getColor(score)} rounded-full`}
        />
      </div>
    </div>
  );
};

const SecurityHeaderItem = ({ name, enabled }: { name: string; enabled: boolean }) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
    <span className="text-sm text-muted-foreground">{name}</span>
    {enabled ? (
      <CheckCircle className="w-4 h-4 text-success" />
    ) : (
      <XCircle className="w-4 h-4 text-destructive" />
    )}
  </div>
);

const LoadingSkeleton = () => (
  <div className="container max-w-6xl mx-auto px-4 py-12 space-y-8">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-64 mx-auto" />
      <Skeleton className="h-4 w-96 mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} className="h-64 rounded-xl" />
      ))}
    </div>
  </div>
);

export const AnalysisResults = ({ result, isLoading, error, onBack, onRetry }: AnalysisResultsProps) => {
  if (isLoading) {
    return (
      <section className="min-h-screen bg-background pt-20">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card/50">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-lg font-medium">Analyzing...</span>
            </div>
            <LoadingSkeleton />
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md mx-auto px-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Analysis Failed</h2>
          <p className="text-muted-foreground">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button onClick={onRetry}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </motion.div>
      </section>
    );
  }

  if (!result) return null;

  return (
    <section className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              New Scan
            </Button>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-sm">{result.basicInfo.domain}</span>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Rescan
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6 flex items-center justify-center">
              <GradeDisplay grade={result.security.grade} label="Security Grade" />
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6 flex items-center justify-center">
              <GradeDisplay grade={result.ssl.grade} label="SSL Grade" />
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold mt-2">{result.performance.responseTime}ms</p>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security Headers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/50 border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Headers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScoreBar score={result.headers.score} label="Headers Score" />
                <div className="pt-2">
                  <SecurityHeaderItem name="Strict-Transport-Security" enabled={result.headers.securityHeaders.strictTransportSecurity} />
                  <SecurityHeaderItem name="X-Frame-Options" enabled={result.headers.securityHeaders.xFrameOptions} />
                  <SecurityHeaderItem name="X-Content-Type-Options" enabled={result.headers.securityHeaders.xContentTypeOptions} />
                  <SecurityHeaderItem name="Content-Security-Policy" enabled={result.headers.securityHeaders.contentSecurityPolicy} />
                  <SecurityHeaderItem name="X-XSS-Protection" enabled={result.headers.securityHeaders.xXssProtection} />
                  <SecurityHeaderItem name="Referrer-Policy" enabled={result.headers.securityHeaders.referrerPolicy} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* SEO Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="w-5 h-5 text-primary" />
                  SEO Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScoreBar score={result.seo.score} label="SEO Score" />
                <div className="pt-2">
                  <SecurityHeaderItem name="Title Tag" enabled={result.seo.hasTitle} />
                  <SecurityHeaderItem name="Meta Description" enabled={result.seo.hasDescription} />
                  <SecurityHeaderItem name="Viewport Meta" enabled={result.seo.hasViewport} />
                  <SecurityHeaderItem name="Canonical URL" enabled={result.seo.hasCanonical} />
                  <SecurityHeaderItem name="robots.txt" enabled={result.seo.hasRobotsTxt} />
                  <SecurityHeaderItem name="sitemap.xml" enabled={result.seo.hasSitemap} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* DNS Records */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wifi className="w-5 h-5 text-primary" />
                  DNS Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">A Records</p>
                      <div className="flex flex-wrap gap-2">
                        {result.dns.aRecords.length > 0 ? (
                          result.dns.aRecords.map((record, i) => (
                            <Badge key={i} variant="secondary" className="font-mono text-xs">{record}</Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No records found</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">MX Records</p>
                      <div className="flex flex-wrap gap-2">
                        {result.dns.mxRecords.length > 0 ? (
                          result.dns.mxRecords.map((record, i) => (
                            <Badge key={i} variant="secondary" className="font-mono text-xs">{record}</Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No records found</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">NS Records</p>
                      <div className="flex flex-wrap gap-2">
                        {result.dns.nsRecords.length > 0 ? (
                          result.dns.nsRecords.map((record, i) => (
                            <Badge key={i} variant="secondary" className="font-mono text-xs">{record}</Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No records found</span>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card/50 border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileCode className="w-5 h-5 text-primary" />
                  Technologies Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.technologies.length > 0 ? (
                    result.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5 border-primary/20">
                        {tech}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No technologies detected</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Server Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Server className="w-5 h-5 text-primary" />
                  Server Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Server</p>
                    <p className="font-mono text-sm">{result.headers.server || 'Hidden'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">IP Address</p>
                    <p className="font-mono text-sm">{result.basicInfo.ip || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Protocol</p>
                    <p className="font-mono text-sm uppercase">{result.basicInfo.protocol}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Port</p>
                    <p className="font-mono text-sm">{result.basicInfo.port}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Compression</p>
                    <p className="font-mono text-sm">{result.performance.compression ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Content Size</p>
                    <p className="font-mono text-sm">{result.performance.contentLength ? `${Math.round(result.performance.contentLength / 1024)} KB` : 'Unknown'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Security Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.security.issues.length > 0 ? (
                  <ScrollArea className="h-32">
                    <ul className="space-y-2">
                      {result.security.issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span>No security issues detected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recommendations */}
        {result.security.recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6"
          >
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-info" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.security.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-info/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs text-info font-medium">{i + 1}</span>
                      </div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Scan timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          Scanned at {new Date(result.timestamp).toLocaleString()}
        </motion.div>
      </div>
    </section>
  );
};
