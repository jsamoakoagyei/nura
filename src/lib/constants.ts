// App-wide constants

export const APP_NAME = "The Little Voyage";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  STUDIO: "/studio",
  COMMUNITY: "/community",
  AUTH: "/auth",
  PROFILE: "/profile",
} as const;

export const NAV_ITEMS = [
  { name: "Home", href: ROUTES.HOME },
  { name: "About", href: ROUTES.ABOUT },
  { name: "The Studio", href: ROUTES.STUDIO },
  { name: "Community", href: ROUTES.COMMUNITY },
] as const;

export const FOOTER_LINKS = {
  product: [
    { name: "The Studio", href: ROUTES.STUDIO },
    { name: "Community", href: "#community" },
  ],
  company: [
    { name: "About Us", href: ROUTES.ABOUT },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Safety", href: "#" },
    { name: "Accessibility", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
} as const;

export const STATS = {
  PARENTS_TRUST: "50,000+",
  COMMUNITY_MEMBERS: "10k+",
  COMMUNITY_MEMBERS_LABEL: "Join 10,000+ parents",
  DISCUSSIONS: "50k+",
  FEEL_SUPPORTED: "98%",
} as const;
