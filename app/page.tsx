import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Users,
  Shield,
  DollarSign,
  Clock,
  TrendingUp,
  CheckCircle,
  Menu,
  ArrowRight,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold">HR Platform</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#docs" className="text-gray-600 hover:text-gray-900">
                Docs
              </Link>
              <Link href="/admin">
                <Button variant="outline">Login</Button>
              </Link>
            </nav>

            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern HR Management
              <span className="block text-blue-600">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline your HR operations with our comprehensive platform.
              Manage employees, payroll, attendance, and performance reviews all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admin">
                <Button size="lg" className="text-lg px-8">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to simplify HR management and boost productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1: Multi-Panel */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Panel Interface</h3>
              <p className="text-gray-600">
                Separate dashboards for admins, HR managers, and employees.
                Each role gets the perfect view for their needs.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Admin control panel</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">HR management dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Employee self-service portal</span>
                </li>
              </ul>
            </div>

            {/* Feature 2: RBAC */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access Control</h3>
              <p className="text-gray-600">
                Granular permissions ensure data security and proper access levels
                for every team member.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Custom role creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Permission management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Audit trail logging</span>
                </li>
              </ul>
            </div>

            {/* Feature 3: Payroll */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payroll Automation</h3>
              <p className="text-gray-600">
                Automated payroll processing with tax calculations, deductions,
                and instant payslip generation.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Automatic calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Tax & deduction handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Digital payslips</span>
                </li>
              </ul>
            </div>

            {/* Feature 4: Attendance */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
              <p className="text-gray-600">
                Real-time attendance monitoring with check-in/out functionality
                and comprehensive reporting.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Daily check-in/out</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Real-time monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Attendance reports</span>
                </li>
              </ul>
            </div>

            {/* Feature 5: Performance */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Reviews</h3>
              <p className="text-gray-600">
                Structured review cycles with goal tracking, ratings, and
                360-degree feedback capabilities.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Review templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Goal tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Performance analytics</span>
                </li>
              </ul>
            </div>

            {/* Feature 6: Leave Management */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Leave Management</h3>
              <p className="text-gray-600">
                Streamlined leave requests, approvals, and balance tracking
                for all leave types.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Easy request submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Approval workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Balance tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your HR Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using our platform to streamline their HR operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li>
                  <Link href="#compliance" className="hover:text-white">Compliance</Link>
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
                <a href="https://twitter.com" className="hover:text-white" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" className="hover:text-white" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com" className="hover:text-white" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
