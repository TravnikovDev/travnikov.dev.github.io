import { NavItem, SocialLinkItem } from "./types";

// Navigation items and their icons
export const navItems: NavItem[] = [
  { label: "Projects", path: "/projects", color: "primary" },
  { label: "Blog", path: "/blog", color: "secondary" },
  { label: "Experiments", path: "/experiments", color: "accent" },
];

// Social links with improved styling
export const socialLinks: SocialLinkItem[] = [
  {
    name: "GitHub",
    url: "https://github.com/TravnikovDev",
    icon: "📂",
    hoverColor: "#2290E0",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/roman-travnikov/",
    icon: "🔗",
    hoverColor: "#8422E0",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/travnikov.dev",
    icon: "📷",
    hoverColor: "#F01F24",
  },
];
