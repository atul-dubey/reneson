import { Linkedin, Twitter, Mail, Instagram, MapPin, Phone } from 'lucide-react';
import reneson from '/reneson.png'

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "#contact" },
];

const servicesLinks = [
  { name: "IoT Solutions", href: "#services" },
  { name: "Artificial Intelligence", href: "#services" },
  { name: "Software Development", href: "#services" },
  { name: "Digital Transformation", href: "#services" },
  { name: "Hardware Engineering", href: "#services" },
  { name: "Staff Augmentation", href: "#services" },
];

const Footer = () => (
  <footer className="bg-white border-t border-gray-50 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center">
              <img src={reneson} alt="" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#426369]">Reneson</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premier tech agency specializing in high-performance digital products and intelligent IoT ecosystems.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#426369] group transition-all">
              <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-white" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#426369] group transition-all">
              <Twitter className="w-5 h-5 text-gray-600 group-hover:text-white" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#426369] group transition-all">
              <Instagram className="w-5 h-5 text-gray-600 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-6">
          <h5 className="font-bold text-gray-900">Quick Links</h5>
          <ul className="space-y-4 text-sm text-gray-400">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-[#426369] transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Column */}
        <div className="space-y-6">
          <h5 className="font-bold text-gray-900">Services</h5>
          <ul className="space-y-4 text-sm text-gray-400">
            {servicesLinks.map((service) => (
              <li key={service.name}>
                <a href={service.href} className="hover:text-[#426369] transition-colors">
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-6">
          <h5 className="font-bold text-gray-900">Contact</h5>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 text-[#426369] mt-1 shrink-0" />
              <span>Sector-35, Noida, Uttar Pradesh India - 201301</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-[#426369] shrink-0" />
              <a href="mailto:hello@reneson.tech" className="hover:text-[#426369] transition-colors">info@reneson.com</a>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-[#426369] shrink-0" />
              <a href="tel:+1234567890" className="hover:text-[#426369] transition-colors">+91 8072685710</a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2026 Reneson Tech Services. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#426369]">Privacy Policy</a>
          <a href="#" className="hover:text-[#426369]">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;