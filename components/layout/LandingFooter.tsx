import Link from 'next/link';
import { Users, Linkedin, Twitter, Github } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold text-white">HR Platform</span>
            </div>
            <p className="text-sm text-gray-400">
              Modern HR management solution for growing teams.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-white">Features</Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white">Pricing</Link>
              </li>
              <li>
                <Link href="#docs" className="hover:text-white">Documentation</Link>
              </li>
              <li>
                <Link href="#api" className="hover:text-white">API</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-white">Careers</Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-white">Blog</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#privacy" className="hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link href="#security" className="hover:text-white">Security</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 HR Platform. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
