import React, { useState } from "react";
import { Link as GatsbyLink } from "gatsby";
import { ChevronDown, Menu, X } from "lucide-react";
import "../styles/header.css";
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
    <div className={`sub-menu ${isOpen ? "show" : ""}`}>
      {items.map((item, index) => (
        <div key={index} className="sub-menu-item" style={{ "--item-index": index } as React.CSSProperties}>
          {item.href?.startsWith("http") ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ) : (
            <GatsbyLink to={item.href || "#"}>{item.label}</GatsbyLink>
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
      <li className="nav-item">
        {link.href?.startsWith("http") ? (
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ) : (
          <GatsbyLink to={link.href || "#"}>{link.label}</GatsbyLink>
        )}
      </li>
    );
  }

  return (
    <li className="nav-item with-submenu" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="nav-link-with-arrow">
        {link.label}
        <ChevronDown size={16} className={`arrow ${isOpen ? "rotate" : ""}`} />
      </button>
      <Submenu items={link.submenu} isOpen={isOpen} />
    </li>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar">
        {/* Logo */}
        <div className="logo">
          <GatsbyLink to="/">
            <StaticImage src="../images/logo2025.png" alt="MERCon 2025 Logo" className="logo-image" />
          </GatsbyLink>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <ul className="links">
            {navLinks.map((link, index) => (
              <NavItem key={index} link={link} />
            ))}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-links">
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
      <li className="mobile-nav-item">
        {link.href?.startsWith("http") ? (
          <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
            {link.label}
          </a>
        ) : (
          <GatsbyLink to={link.href || "#"} onClick={onNavigate}>
            {link.label}
          </GatsbyLink>
        )}
      </li>
    );
  }

  return (
    <li className="mobile-nav-item with-submenu">
      <button className="mobile-nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        {link.label}
        <ChevronDown size={16} className={`arrow ${isOpen ? "rotate" : ""}`} />
      </button>
      {isOpen && (
        <ul className="mobile-submenu">
          {link.submenu.map((subitem, index) => (
            <li key={index} className="mobile-submenu-item">
              {subitem.href?.startsWith("http") ? (
                <a href={subitem.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
                  {subitem.label}
                </a>
              ) : (
                <GatsbyLink to={subitem.href || "#"} onClick={onNavigate}>
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
