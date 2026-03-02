import { Heart } from "lucide-react";
import { FOOTER_LINKS, APP_NAME } from "@/lib/constants";
import tlvLogo from "@/assets/tlv-logo.png";

export function Footer() {
  return (
    <footer className="bg-azure-50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <nav aria-label="Footer" className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={tlvLogo} alt={APP_NAME} className="w-10 h-10 rounded-2xl" />
              <span className="font-serif font-semibold text-xl text-foreground">{APP_NAME}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Navigating early parenthood, together.
            </p>
          </div>

          {/* Link sections */}
          {(Object.entries(FOOTER_LINKS) as [string, readonly { name: string; href: string }[]][]).map(
            ([section, links]) => (
              <div key={section}>
                <h4 className="font-semibold text-foreground mb-4 capitalize">{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </nav>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> for parents everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
