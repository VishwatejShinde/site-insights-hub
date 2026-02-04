import { motion } from "framer-motion";
import { Github, Server, Code2, ArrowUpRight, Terminal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Github,
    title: "Explore the Code",
    description: "Fork, contribute, or star us on GitHub. MIT licensed and open for all.",
    buttonText: "View Repository",
    variant: "default" as const,
    href: "#",
  },
  {
    icon: Server,
    title: "Run Your Own Instance",
    description: "Deploy SiteScope on your infrastructure with Docker or bare metal setup.",
    buttonText: "Self-Host Guide",
    variant: "secondary" as const,
    href: "#",
  },
  {
    icon: Code2,
    title: "Integrate via API",
    description: "RESTful endpoints for programmatic access. Automate your security workflows.",
    buttonText: "API Documentation",
    variant: "secondary" as const,
    href: "#",
  },
];

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-mono text-primary bg-primary/10 rounded-full border border-primary/20">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Open Source & <span className="text-gradient">Developer-First</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built by the community, for the community. Choose how you want to use SiteScope
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 card-hover flex flex-col">
                <div className="p-3 w-fit rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-muted-foreground text-sm flex-1 mb-6">{action.description}</p>
                <Button
                  variant={action.variant}
                  className={`w-full group/btn ${action.variant === "default" ? "bg-gradient-primary text-primary-foreground hover:opacity-90" : ""}`}
                >
                  {action.buttonText}
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 border-b border-border">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono text-muted-foreground">Quick Start</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-success">$</span>
                <span className="text-muted-foreground">npx sitescope analyze https://example.com</span>
              </div>
              <div className="text-primary">→ Running 25 security checks...</div>
              <div className="text-muted-foreground">→ SSL Certificate: Valid (expires in 364 days)</div>
              <div className="text-muted-foreground">→ Security Headers: 8/10 configured</div>
              <div className="text-muted-foreground">→ Technologies: React, Next.js, Vercel</div>
              <div className="text-success">✓ Analysis complete. View full report at sitescope.dev/r/abc123</div>
            </div>
          </div>
        </motion.div>

        {/* Additional links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="w-4 h-4" />
            Read the Docs
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
          <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Code2 className="w-4 h-4" />
            API Reference
          </a>
        </motion.div>
      </div>
    </section>
  );
};
