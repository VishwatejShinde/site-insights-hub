import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Globe,
  Server,
  Zap,
  Eye,
  FileSearch,
  Network,
  Code,
  Activity,
  AlertTriangle,
  CheckCircle,
  Search,
  Database,
  Cloud,
  Fingerprint,
  Map,
  Clock,
  BarChart3,
  Link2,
  Mail,
  Cpu,
  Wifi,
  Key,
  Bug,
  Layers,
} from "lucide-react";

const features = [
  { icon: Lock, title: "SSL/TLS Check", desc: "Certificate validation & chain analysis" },
  { icon: Globe, title: "DNS Lookup", desc: "Complete record enumeration" },
  { icon: Shield, title: "Headers Scan", desc: "Security header analysis" },
  { icon: Activity, title: "Uptime Monitor", desc: "Real-time availability tracking" },
  { icon: Code, title: "Tech Detection", desc: "Framework & library identification" },
  { icon: Search, title: "SEO Audit", desc: "Meta tags & crawlability" },
  { icon: Bug, title: "Vulnerability Scan", desc: "Known CVE detection" },
  { icon: Fingerprint, title: "Fingerprinting", desc: "Server & CMS identification" },
  { icon: Network, title: "Port Scanner", desc: "Open port enumeration" },
  { icon: Eye, title: "Screenshot Capture", desc: "Visual page snapshots" },
  { icon: FileSearch, title: "robots.txt Parse", desc: "Crawler rules analysis" },
  { icon: Map, title: "Sitemap Crawl", desc: "Site structure mapping" },
  { icon: Link2, title: "Link Checker", desc: "Broken link detection" },
  { icon: Zap, title: "Performance Test", desc: "Core Web Vitals metrics" },
  { icon: Database, title: "WHOIS Lookup", desc: "Domain ownership info" },
  { icon: Cloud, title: "CDN Detection", desc: "Content delivery analysis" },
  { icon: Mail, title: "Email Config", desc: "SPF/DKIM/DMARC check" },
  { icon: Server, title: "Hosting Info", desc: "Infrastructure details" },
  { icon: AlertTriangle, title: "Blacklist Check", desc: "Reputation scanning" },
  { icon: CheckCircle, title: "HSTS Preload", desc: "Transport security status" },
  { icon: Clock, title: "Response Time", desc: "Latency measurements" },
  { icon: BarChart3, title: "Traffic Analysis", desc: "Estimated visitor data" },
  { icon: Cpu, title: "HTTP/2 Check", desc: "Protocol support test" },
  { icon: Wifi, title: "IPv6 Support", desc: "Dual-stack verification" },
  { icon: Key, title: "Cookie Analysis", desc: "Security flag inspection" },
  { icon: Layers, title: "Redirect Trace", desc: "Chain following & analysis" },
];

export const Features = () => {
  return (
    <section className="py-24 relative" id="features">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-mono text-primary bg-primary/10 rounded-full border border-primary/20">
            Powerful Toolkit
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            25+ Analysis <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From security audits to performance metrics, get complete visibility into any website's technical stack
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group"
            >
              <div className="p-4 h-full rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 card-hover">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
