import { Link } from 'react-router-dom';
import { Sparkles, Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold">InsightEdge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered career intelligence for emerging sectors. Healthcare, Agri-Tech, and Smart Cities.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/upload" className="hover:text-foreground transition-colors">
                Upload Resume
              </Link>
              <Link to="/quiz" className="hover:text-foreground transition-colors">
                Career Quiz
              </Link>
              <Link to="/sectors" className="hover:text-foreground transition-colors">
                Sector Insights
              </Link>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Sectors */}
          <div className="space-y-4">
            <h4 className="font-semibold">Sectors</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/sectors?tab=healthcare" className="hover:text-foreground transition-colors">
                Healthcare
              </Link>
              <Link to="/sectors?tab=agritech" className="hover:text-foreground transition-colors">
                Agri-Tech
              </Link>
              <Link to="/sectors?tab=smartcities" className="hover:text-foreground transition-colors">
                Smart Cities
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              InsightEdge is designed with modular AI and pluggable data services.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 InsightEdge. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
