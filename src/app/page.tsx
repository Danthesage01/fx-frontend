import React from "react";
import Link from "next/link";
import {
  CreditCard,
  Globe,
  Shield,
  ArrowRightLeft,
  TrendingUp,
  ChevronRight,
  Star,
  Check,
  Zap,
  Building,
  Smartphone,
  DollarSign,
  BarChart3,
  Wallet,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/common/layouts/Navbar";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div
        id="products"
        className="bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Seamless FX Converter for Global Commerce
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Empower your business with FX Converter's comprehensive payment
                infrastructure. Accept payments, exchange currencies, and expand
                globally with enterprise-grade security.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium flex items-center hover:bg-blue-700 transition-colors"
                >
                  Convert FX Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#demo"
                  className="border border-blue-600 text-blue-600 rounded-lg px-6 py-3 font-medium hover:bg-blue-50 transition-colors"
                >
                  View Demo
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <span>PCI DSS Compliant</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-blue-500" />
                  <span>40+ Countries</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 md:w-80">
                <div className="w-64 md:w-80 h-full rounded-xl shadow-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-slate-800">
                        FX Exchange
                      </h3>
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <ArrowRightLeft className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">🇺🇸</span>
                          <span className="font-medium">USD</span>
                        </div>
                        <span className="font-bold text-slate-900">$1,000</span>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <ArrowRightLeft className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">🇳🇬</span>
                          <span className="font-medium">NGN</span>
                        </div>
                        <span className="font-bold text-blue-600">
                          ₦1,650,500
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-slate-600">
                      Rate: 1 USD = 1,650.50 NGN
                    </div>
                    <div className="flex space-x-3 mt-4 justify-center">
                      <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <RefreshCw className="h-5 w-5 text-blue-600" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-green-500" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-16 bottom-16 w-56 h-32 bg-white rounded-lg shadow-lg border border-slate-200 p-3 hidden md:block">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Live Rates</h4>
                      <p className="text-xs text-slate-600">
                        Real-time exchange rates updated every minute
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Complete Payment Infrastructure
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Everything you need to accept payments, manage currencies, and
              scale your business globally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Payment Gateway</h3>
              <p className="text-slate-600">
                Accept payments from anywhere in the world with our secure,
                reliable payment gateway. Support for cards, bank transfers, and
                mobile money.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <ArrowRightLeft className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Currency Exchange</h3>
              <p className="text-slate-600">
                Real-time currency conversion with competitive rates. Support
                for 50+ currencies including major African currencies like NGN,
                GHS, and KES.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Virtual Accounts</h3>
              <p className="text-slate-600">
                Create and manage multi-currency virtual accounts. Perfect for
                global businesses, freelancers, and cross-border transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div
        id="solutions"
        className="bg-slate-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Built for Global Businesses
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From startups to enterprise, FX Converter powers payments for
                thousands of businesses across Africa and beyond.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-slate-900">
                      Enterprise-grade security
                    </h3>
                    <p className="text-slate-600">
                      PCI DSS Level 1 certified with advanced fraud protection
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-slate-900">
                      Developer-friendly APIs
                    </h3>
                    <p className="text-slate-600">
                      Comprehensive REST APIs with detailed documentation and
                      SDKs
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-slate-900">24/7 support</h3>
                    <p className="text-slate-600">
                      Round-the-clock technical support and dedicated account
                      management
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-blue-600 text-xs">
                      FB
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-green-600 text-xs">
                      JM
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-purple-600 text-xs">
                      KA
                    </div>
                    <div className="w-8 h-8 rounded-full bg-yellow-200 border-2 border-white flex items-center justify-center text-yellow-600 text-xs">
                      LO
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs">
                      1k+
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-600">
                      Trusted by 1,000+ businesses
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium ml-2">Mobile Payments</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Accept mobile money and card payments
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium ml-2">Multi-Currency</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Support for USD, EUR, NGN, and more
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium ml-2">Analytics</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Real-time transaction analytics
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium ml-2">Payouts</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Send money globally with ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        id="testimonials"
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Trusted by Leading Businesses
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              See how companies are using FX Converter to scale their operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "FX Converter's payment infrastructure helped us expand to 15
                African countries. The currency exchange rates are competitive
                and the API is incredibly robust."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  AO
                </div>
                <div>
                  <h4 className="font-medium">Adebayo Ogundimu</h4>
                  <p className="text-sm text-slate-500">CTO, TechCorp Africa</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "As an e-commerce platform, reliable payments are crucial. FX
                Converter's uptime and security standards give us confidence in
                processing millions in transactions."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  FN
                </div>
                <div>
                  <h4 className="font-medium">Fatima Nakamura</h4>
                  <p className="text-sm text-slate-500">Founder, ShopAfrica</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "The multi-currency virtual accounts feature transformed how we
                handle international payments. Setup was seamless and support is
                outstanding."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  KM
                </div>
                <div>
                  <h4 className="font-medium">Kwame Mensah</h4>
                  <p className="text-sm text-slate-500">CFO, GlobalRemit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        className="bg-slate-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Pay only for what you use with no hidden fees or setup costs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <div className="p-6">
                <h3 className="font-bold text-lg">Starter</h3>
                <p className="text-slate-600 mt-2">
                  Perfect for small businesses
                </p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">2.9%</span>
                  <span className="text-slate-600"> per transaction</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Payment gateway</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Basic currency exchange</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Link
                  href="/auth/register"
                  className="block w-full text-center bg-slate-600 text-white rounded-lg py-2 font-medium hover:bg-slate-700 transition-colors mt-6"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-500 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                Popular
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">Business</h3>
                <p className="text-slate-600 mt-2">For growing companies</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">2.5%</span>
                  <span className="text-slate-600"> per transaction</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Everything in Starter</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Virtual accounts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/auth/register"
                  className="block w-full text-center bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition-colors mt-6"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <div className="p-6">
                <h3 className="font-bold text-lg">Enterprise</h3>
                <p className="text-slate-600 mt-2">For large organizations</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">Custom</span>
                  <span className="text-slate-600"> pricing</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Everything in Business</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-sm">24/7 phone support</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center bg-slate-600 text-white rounded-lg py-2 font-medium hover:bg-slate-700 transition-colors mt-6"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Transform Your Payments?
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Join thousands of businesses already using FX Converter to scale
              globally. Get started in minutes with our easy integration.
            </p>

            <div className="mt-8 flex justify-center space-x-4">
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 rounded-lg px-8 py-3 font-medium hover:bg-slate-50 transition-colors"
              >
                Start Building Today
              </Link>
              <Link
                href="#demo"
                className="border border-white text-white rounded-lg px-8 py-3 font-medium hover:bg-blue-700 transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link
                href={"/"}
                className="flex "
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FX</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    Converter
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-slate-400">
                Empowering global commerce with seamless payment solutions
                across Africa and beyond.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Payment Gateway
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Currency Exchange
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Virtual Accounts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Payouts
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Status Page
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} FX Converter. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
