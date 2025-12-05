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
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Keynotes",
    href: "/keynote-speakers",
  },
  {
    label: "For Attendees",
    submenu: [
      {
        label: "Registration",
        href: "/registration",
      },
      {
        label: "Program",
        href: "/conferenceSchedule",
      },
    ],
  },
  {
    label: "Committee",
    submenu: [
      {
        label: "Organizing Committee",
        href: "/organizing-committee",
      },
      {
        label: "Technical Program Committee",
        href: "/technical-programming-committee",
      },
    ],
  },
  {
    label: "For Authors",
    submenu: [
      {
        label: "Call for Papers",
        href: "/call-for-papers",
      },
      {
        label: "Important Dates",
        href: "/important_dates",
      },
      {
        label: "Author Instructions",
        href: "/author-instructions",
      },
      {
        label: "Camera Ready Paper Instructions",
        href: "/camera_ready_paper_instructions",
      },
    ],
  },
  {
    label: "Explore Programs",
    submenu: [
      {
        label: "Workshops",
        href: "/workshops_updated",
      },
      {
        label: "Special Sessions",
        href: "/special_sessions",
      },
    ],
  },
  {
    label: "Past Proceedings",
    submenu: [
      {
        label: "2024",
        href: "https://ieeexplore.ieee.org/xpl/conhome/10688402/proceeding",
      },
      {
        label: "2023",
        href: "https://ieeexplore.ieee.org/xpl/conhome/10355380/proceeding",
      },
      {
        label: "2022",
        href: "https://ieeexplore.ieee.org/xpl/conhome/9906100/proceeding",
      },
      {
        label: "2021",
        href: "https://ieeexplore.ieee.org/xpl/conhome/9525629/proceeding",
      },
      {
        label: "2020",
        href: "https://ieeexplore.ieee.org/xpl/conhome/9179991/proceeding",
      },
      {
        label: "2019",
        href: "https://ieeexplore.ieee.org/xpl/conhome/8807126/proceeding",
      },
      {
        label: "2018",
        href: "https://ieeexplore.ieee.org/xpl/conhome/8410204/proceeding",
      },
      {
        label: "2017",
        href: "https://ieeexplore.ieee.org/xpl/conhome/7972818/proceeding",
      },
      {
        label: "2016",
        href: "https://ieeexplore.ieee.org/xpl/conhome/7469533/proceeding",
      },
      {
        label: "2015",
        href: "https://ieeexplore.ieee.org/xpl/conhome/7105793/proceeding",
      },
    ],
  },
  {
    label: "Destination and Visa Information",
    submenu: [
      {
        label: "Things to see in Sri Lanka",
        href: "/things-to-see",
      },
      {
        label: "Visa Information",
        href: "#",
      },
    ],
  },
];

interface SubmenuProps {
  items: NavLink[];
  isOpen: boolean;
}

const Submenu: React.FC<SubmenuProps> = ({ items, isOpen }) => {
  return (
    <div
      className={`absolute top-[70px] left-0 min-w-full bg-black/90 opacity-0 invisible transform -translate-y-2.5 transition-all duration-300 z-50 py-2 border-t-2 border-primary-500 rounded-b-lg ${
        isOpen ? "opacity-100 visible translate-y-0" : ""
      }`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`px-6 py-3 opacity-0 transform -translate-x-2.5 transition-all duration-300 ${
            isOpen ? `opacity-100 translate-x-0` : ""
          }`}
          style={{ transitionDelay: isOpen ? `${0.05 * index}s` : "0s" }}
        >
          {item.href?.startsWith("http") ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-medium hover:text-primary-500 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <GatsbyLink
              to={item.href || "#"}
              className="text-white text-sm font-medium hover:text-primary-500 transition-colors"
            >
              {item.label}
            </GatsbyLink>
          )}
        </div>
      ))}
    </div>
  );
};

interface NavItemProps {
  link: NavLink;
}

const NavItem: React.FC<NavItemProps> = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!link.submenu) {
    return (
      <li className="relative flex items-center h-full list-none">
        {link.href?.startsWith("http") ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm font-medium px-3 h-full flex items-center hover:text-primary-500 transition-colors"
          >
            {link.label}
          </a>
        ) : (
          <GatsbyLink
            to={link.href || "#"}
            className="text-white text-sm font-medium px-3 h-full flex items-center hover:text-primary-500 transition-colors"
          >
            {link.label}
          </GatsbyLink>
        )}
      </li>
    );
  }

  return (
    <li
      className="relative flex items-center h-full list-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-white text-sm font-medium px-3 h-full flex items-center gap-1.5 hover:text-primary-500 transition-colors bg-none border-none cursor-pointer font-poppins">
        {link.label}
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <Submenu items={link.submenu} isOpen={isOpen} />
    </li>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-nav z-50 shadow-md bg-black/70">
      <div className="h-full w-full flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center cursor-pointer hover:scale-102 transition-transform">
          <GatsbyLink to="/" className="flex items-center">
            <StaticImage src="../images/logo2025.png" alt="MERCon 2025 Logo" className="w-52 h-14 object-contain" />
          </GatsbyLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end h-full">
          <ul className="flex gap-2 list-none items-center h-full">
            {navLinks.map((link, index) => (
              <NavItem key={index} link={link} />
            ))}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden bg-none border-none text-white cursor-pointer p-2 transition-colors hover:text-primary-500 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[70px] left-0 w-full max-h-[calc(100vh-70px)] bg-submenu overflow-y-auto z-40 animate-slideDown">
          <ul className="list-none p-2">
            {navLinks.map((link, index) => (
              <MobileNavItem key={index} link={link} onNavigate={() => setMobileMenuOpen(false)} />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

interface MobileNavItemProps {
  link: NavLink;
  onNavigate: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ link, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!link.submenu) {
    return (
      <li className="border-b border-primary-500/10">
        {link.href?.startsWith("http") ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="block px-4 py-4 text-white text-sm font-medium hover:bg-primary-500/10 transition-colors"
          >
            {link.label}
          </a>
        ) : (
          <GatsbyLink
            to={link.href || "#"}
            onClick={onNavigate}
            className="block px-4 py-4 text-white text-sm font-medium hover:bg-primary-500/10 transition-colors"
          >
            {link.label}
          </GatsbyLink>
        )}
      </li>
    );
  }

  return (
    <li className="border-b border-primary-500/10">
      <button
        className="w-full flex items-center justify-between px-4 py-4 text-white text-sm font-medium hover:bg-primary-500/10 transition-colors bg-none border-none cursor-pointer font-poppins text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {link.label}
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <ul className="list-none bg-primary-500/5 border-l-4 border-primary-500 animate-slideDown">
          {link.submenu.map((subitem, index) => (
            <li key={index} className="border-b border-primary-500/5">
              {subitem.href?.startsWith("http") ? (
                <a
                  href={subitem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  className="block px-6 py-3 text-gray-300 text-xs font-medium hover:text-primary-500 transition-colors"
                >
                  {subitem.label}
                </a>
              ) : (
                <GatsbyLink
                  to={subitem.href || "#"}
                  onClick={onNavigate}
                  className="block px-6 py-3 text-gray-300 text-xs font-medium hover:text-primary-500 transition-colors"
                >
                  {subitem.label}
                </GatsbyLink>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
