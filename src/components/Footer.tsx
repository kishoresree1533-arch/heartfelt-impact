import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="font-display text-2xl">Hope Foundation</p>

          <div className="flex gap-8">
            {["About", "Impact", "Donate", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="h-px w-24 bg-border" />

          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-gold" /> for a better world
          </p>

          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Hope Foundation Trust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
