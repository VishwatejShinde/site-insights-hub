import { motion } from "framer-motion";
import { ExternalLink, Lock, Server, Globe } from "lucide-react";

const previewItems = [
  {
    title: "Security Overview",
    description: "SSL certificates, headers, and vulnerability status",
    icon: Lock,
    color: "from-primary/20 to-info/20",
  },
  {
    title: "DNS Intelligence",
    description: "Complete DNS record analysis and nameserver info",
    icon: Globe,
    color: "from-info/20 to-success/20",
  },
  {
    title: "Server Analysis",
    description: "Technology stack, hosting, and infrastructure details",
    icon: Server,
    color: "from-success/20 to-warning/20",
  },
];

export const PreviewGallery = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-mono text-primary bg-primary/10 rounded-full border border-primary/20">
            Live Analysis Preview
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Comprehensive <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get detailed reports with actionable security recommendations and technical breakdowns
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-64 rounded-xl overflow-hidden border border-border bg-card card-hover">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50`} />
                
                {/* Mock terminal content */}
                <div className="absolute inset-4 font-mono text-xs">
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="space-y-2 text-muted-foreground/70">
                    <div className="text-primary">$ sitescope analyze</div>
                    <div>→ Scanning target...</div>
                    <div>→ {item.description}</div>
                    <div className="text-success">✓ Analysis complete</div>
                  </div>
                </div>

                {/* Icon overlay */}
                <div className="absolute bottom-4 right-4">
                  <item.icon className="w-12 h-12 text-foreground/10 group-hover:text-primary/30 transition-colors" />
                </div>
              </div>

              <div className="mt-4 px-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {item.title}
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Large preview mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-transparent to-info/10 rounded-2xl blur-xl" />
          <div className="relative rounded-xl border border-border bg-card overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-md text-sm font-mono text-muted-foreground">
                  <Lock className="w-3.5 h-3.5 text-success" />
                  sitescope.dev/report/example.com
                </div>
              </div>
            </div>

            {/* Mock dashboard content */}
            <div className="p-6 min-h-[400px] bg-gradient-to-b from-background to-card">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {["Security Score", "SSL Grade", "Performance", "Uptime"].map((label, i) => (
                  <div key={label} className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">{label}</div>
                    <div className={`text-2xl font-bold ${i === 0 ? "text-success" : i === 1 ? "text-primary" : "text-foreground"}`}>
                      {i === 0 ? "94/100" : i === 1 ? "A+" : i === 2 ? "87ms" : "99.9%"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Detected Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Cloudflare", "PostgreSQL", "Redis"].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-primary/10 text-primary rounded-md border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Security Headers</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Content-Security-Policy", status: true },
                      { label: "X-Frame-Options", status: true },
                      { label: "Strict-Transport-Security", status: true },
                    ].map((header) => (
                      <div key={header.label} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        <span className="font-mono text-muted-foreground">{header.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
