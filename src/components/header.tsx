import React, { useState } from "react";
import { Link as GatsbyLink } from "gatsby";
import { ChevronDown, Menu, X } from "lucide-react";
import { StaticImage } from "gatsby-plugin-image";

interface NavLink {
  label: string;
  href?: string;
  submenu?: NavLink[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Keynotes", href: "/keynote-speakers" },
  {
    label: "For Attendees",
    submenu: [
      { label: "Registration", href: "/registration" },
      { label: "Program", href: "/conferenceSchedule" },
    ],
  },
  {
    label: "Committee",
    submenu: [
      { label: "Organizing Committee", href: "/organizing-committee" },
      { label: "Technical Program Committee", href: "/technical-programming-committee" },
    ],
  },
  {
    label: "For Authors",
    submenu: [
      { label: "Call for Papers", href: "/call-for-papers" },
      { label: "Important Dates", href: "/important_dates" },
      { label: "Author Instructions", href: "/author-instructions" },
      { label: "Camera Ready Paper Instructions", href: "/camera_ready_paper_instructions" },
    ],
  },
  {
    label: "Explore Programs",
    submenu: [
      { label: "Workshops", href: "/workshops_updated" },
      { label: "Special Sessions", href: "/special_sessions" },
    ],
  },
  {
    label: "Past Proceedings",
    submenu: [
      { label: "2024", href: "https://ieeexplore.ieee.org/xpl/conhome/10688402/proceeding" },
      { label: "2023", href: "https://ieeexplore.ieee.org/xpl/conhome/10355380/proceeding" },
      { label: "2022", href: "https://ieeexplore.ieee.org/xpl/conhome/9906100/proceeding" },
      // ... allow more items
    ],
  },
  {
    label: "Destination",
    submenu: [
      { label: "Things to see in Sri Lanka", href: "/things-to-see" },
      { label: "Visa Information", href: "#" },
    ],
  },
];

// --- Subcomponents ---

// 1. Desktop Submenu
const DesktopSubmenu: React.FC<{ items: NavLink[]; isOpen: boolean }> = ({ items, isOpen }) => {
  return (
    <div
      className={`absolute top-full left-0 min-w-60 bg-black/90 backdrop-blur-md border-t-2 border-primary-500 rounded-b-lg shadow-2xl transition-all duration-300 transform origin-top z-50 py-2
      ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`transition-all duration-300 transform ${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
          }`}
          style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
        >
          {item.href?.startsWith("http") ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-sm text-gray-200 hover:text-primary-500 hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <GatsbyLink
              to={item.href || "#"}
              className="block px-4 py-2.5 text-sm text-gray-200 hover:text-primary-500 hover:bg-white/5 transition-colors"
            >
              {item.label}
            </GatsbyLink>
          )}
        </div>
      ))}
    </div>
  );
};

// 2. Desktop Nav Item
const DesktopNavItem: React.FC<{ link: NavLink }> = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative h-full flex items-center group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {link.submenu ? (
        <button
          className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors outline-none
          ${isOpen ? "text-primary-500" : "text-white hover:text-primary-500"}`}
        >
          {link.label}
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      ) : link.href?.startsWith("http") ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 text-sm font-medium text-white hover:text-primary-500 transition-colors"
        >
          {link.label}
        </a>
      ) : (
        <GatsbyLink
          to={link.href || "#"}
          className="px-3 py-2 text-sm font-medium text-white hover:text-primary-500 transition-colors"
        >
          {link.label}
        </GatsbyLink>
      )}

      {/* Render Submenu if it exists */}
      {link.submenu && <DesktopSubmenu items={link.submenu} isOpen={isOpen} />}
    </li>
  );
};

// 3. Mobile Nav Item
const MobileNavItem: React.FC<{ link: NavLink; onNavigate: () => void }> = ({ link, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="border-b border-white/10 last:border-none">
      {link.submenu ? (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-4 py-4 text-white text-base font-medium hover:bg-white/5 transition-colors"
          >
            {link.label}
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180 text-primary-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Mobile Submenu Accordion */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/40 ${
              isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="flex flex-col py-2 pl-4 border-l-2 border-primary-500 ml-4 mb-2">
              {link.submenu.map((subitem, idx) => (
                <li key={idx}>
                  {subitem.href?.startsWith("http") ? (
                    <a
                      href={subitem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onNavigate}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-primary-500 hover:translate-x-1 transition-all"
                    >
                      {subitem.label}
                    </a>
                  ) : (
                    <GatsbyLink
                      to={subitem.href || "#"}
                      onClick={onNavigate}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-primary-500 hover:translate-x-1 transition-all"
                    >
                      {subitem.label}
                    </GatsbyLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : // Standard Mobile Link
      link.href?.startsWith("http") ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="block px-4 py-4 text-white text-base font-medium hover:bg-white/5 hover:text-primary-500 transition-colors"
        >
          {link.label}
        </a>
      ) : (
        <GatsbyLink
          to={link.href || "#"}
          onClick={onNavigate}
          className="block px-4 py-4 text-white text-base font-medium hover:bg-white/5 hover:text-primary-500 transition-colors"
        >
          {link.label}
        </GatsbyLink>
      )}
    </li>
  );
};

// --- Main Header Component ---

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Navbar Container */}
      <nav className="fixed top-0 left-0 w-full h-[70px] bg-black/80 backdrop-blur-md border-b border-white/5 z-50 shadow-lg">
        <div className="h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <GatsbyLink to="/" className="shrink-0 relative z-50">
            <StaticImage
              src="../images/logo2025.png"
              alt="MERCon 2025 Logo"
              className="w-40 md:w-52 h-auto object-contain"
              placeholder="none"
              loading="eager"
            />
          </GatsbyLink>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-1 justify-end h-full">
            <ul className="flex gap-1 items-center h-full">
              {navLinks.map((link, index) => (
                <DesktopNavItem key={index} link={link} />
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-primary-500 transition-colors focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black lg:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"
        }`}
        style={{ top: "70px", height: "calc(100vh - 70px)" }}
      >
        <div className="h-full overflow-y-auto pb-10">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <MobileNavItem key={index} link={link} onNavigate={() => setMobileMenuOpen(false)} />
            ))}
          </ul>

          {/* Optional Footer in Mobile Menu */}
          <div className="p-6 mt-4 text-center text-gray-500 text-xs border-t border-white/10">© MERCon 2026</div>
        </div>
      </div>
    </>
  );
}
