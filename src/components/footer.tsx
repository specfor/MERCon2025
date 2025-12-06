import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { FacebookIcon, LinkedinIcon, TwitterIcon, XIcon } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/95 text-white pt-16 border-t-2 border-primary-400">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 container justify-items-center mx-auto px-6 mb-10">
        {/* Contact Section */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="text-lg font-bold mb-5 text-primary-500 uppercase tracking-wider">Contact Us</h3>
          <p className="text-sm leading-relaxed text-gray-200 mb-3">
            Email:{" "}
            <a href="mailto:mercon@uom.lk" className="text-primary-500 font-medium hover:text-white transition-colors">
              mercon@uom.lk
            </a>
          </p>
          <p className="text-sm leading-relaxed text-gray-200 mb-3">
            Phone:{" "}
            <a
              href="https://wa.me/94112650301"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 font-medium hover:text-white transition-colors"
            >
              +94112650301
            </a>
          </p>
          <p className="text-sm leading-relaxed text-gray-200">
            Engineering Research Unit,
            <br /> Faculty of Engineering,
            <br /> University of Moratuwa,
            <br /> Sri Lanka
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-lg font-bold mb-5 text-primary-500 uppercase tracking-wider">Quick Links</h3>
          <ul className="flex flex-col gap-3 lg:items-left">
            <li>
              <GatsbyLink
                to="/"
                className="text-gray-200 text-sm hover:text-primary-500 transition-colors inline-flex items-center gap-2 hover:gap-3 group"
              >
                <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                Home
              </GatsbyLink>
            </li>
            <li>
              <GatsbyLink
                to="/conferenceSchedule"
                className="text-gray-200 text-sm hover:text-primary-500 transition-colors inline-flex items-center gap-2 hover:gap-3 group"
              >
                <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                Program
              </GatsbyLink>
            </li>
            <li>
              <GatsbyLink
                to="/registration"
                className="text-gray-200 text-sm hover:text-primary-500 transition-colors inline-flex items-center gap-2 hover:gap-3 group"
              >
                <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                Registration
              </GatsbyLink>
            </li>
            <li>
              <GatsbyLink
                to="/call-for-papers"
                className="text-gray-200 text-sm hover:text-primary-500 transition-colors inline-flex items-center gap-2 hover:gap-3 group"
              >
                <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                Call For Papers
              </GatsbyLink>
            </li>
            <li>
              <GatsbyLink
                to="/workshops_updated"
                className="text-gray-200 text-sm hover:text-primary-500 transition-colors inline-flex items-center gap-2 hover:gap-3 group"
              >
                <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                Workshops
              </GatsbyLink>
            </li>
            <li>
              <GatsbyLink
                to="/special_sessions"
                className="text-gray-200 text-sm hover:text-primary-500 transition-colors inline-flex items-center gap-2 hover:gap-3 group"
              >
                <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                Special Sessions
              </GatsbyLink>
            </li>
            <li>
              <GatsbyLink
                to="/author-instructions"
                className="text-gray-200 text-sm hover:text-primary-500 transition-colors inline-flex items-center gap-2 hover:gap-3 group"
              >
                <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                Author Instructions
              </GatsbyLink>
            </li>
          </ul>
        </div>

        {/* Social Media & Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold mb-5 text-primary-500 uppercase tracking-wider">Follow Us</h3>
          <div className="flex gap-5 mb-6 lg:justify-start">
            <a
              href="https://www.facebook.com/pg/erumercon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex items-center justify-center w-10 h-10 bg-primary-500/10 border-2 border-primary-500 rounded-full text-primary-500 hover:text-dark-900 hover:-translate-y-1 transition-all"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/merconeru"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="inline-flex items-center justify-center w-10 h-10 bg-primary-500/10 border-2 border-primary-500 rounded-full text-primary-500 hover:text-dark-900 hover:-translate-y-1 transition-all"
            >
              <XIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/showcase/erumercon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center w-10 h-10 bg-primary-500/10 border-2 border-primary-500 rounded-full text-primary-500 hover:text-dark-900 hover:-translate-y-1 transition-all"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
          <div className="mt-5">
            <StaticImage
              src="../images/logo2025.png"
              alt="MERCon 2025 Logo"
              className="max-w-44 h-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-primary-500/20 px-6 py-4 bg-black/80">
        <p className="text-center text-xs text-gray-400 tracking-wide">
          &copy; {currentYear} MERCon 2026 All rights reserved.
        </p>
      </div>
    </footer>
  );
}
