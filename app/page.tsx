"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, FileText, Palette, Zap, Users, Star, Menu, X, Play } from "lucide-react"
import Link from "next/link"
import { signInWithGoogle } from "@/server/action/signIn"
import { useSession } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"

export default function RezumiLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const { data: session, status } = useSession();
  const router = useRouter(); 

  useEffect(() => {
    
    if (status === 'authenticated') {
      router.replace('/dashboard'); 
    }
  }, [status, router]);

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Rezumi
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  How it Works
                </Link>
                <Link
                  href="#templates"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Templates
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 text-sm" onClick={signInWithGoogle}>
                Sign In
              </Button>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm" onClick={signInWithGoogle}>Get Started Free</Button>
            </div>
            <button className="md:hidden text-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  How it Works
                </Link>
                <Link
                  href="#templates"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Templates
                </Link>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900 justify-start text-sm" onClick={signInWithGoogle}>
                    Sign In
                  </Button>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm">Get Started Free</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Trusted by 50,000+ professionals
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Build resumes that
              <br />
              <span className="text-gray-600">get you hired</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Create professional, ATS-optimized resumes in minutes. Our platform combines beautiful design with smart
              technology to help you land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg group" onClick={signInWithGoogle}>
                  Create Your Resume
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
             
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg group bg-transparent"
              >
                <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Resume Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-900 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-400 rounded w-24"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>

                <div className="space-y-3">
                  <div className="h-4 bg-gray-900 rounded w-24"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-4 bg-gray-900 rounded w-20"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
              <div className="text-xs text-gray-600">ATS Optimized ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "50+ Templates",
                description: "Professional designs for every industry",
                icon: "📄",
              },
              {
                title: "ATS Friendly",
                description: "Pass applicant tracking systems",
                icon: "✅",
              },
              {
                title: "One-Click Export",
                description: "PDF, Word, and more formats",
                icon: "⬇️",
              },
              {
                title: "Real-time Preview",
                description: "See changes as you type",
                icon: "👁️",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rezumi Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Choose Rezumi?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've revolutionized resume building with cutting-edge technology and design expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Create professional resumes in under 5 minutes with our streamlined process",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Beautiful Designs",
                description: "Choose from dozens of professionally designed templates that make you stand out",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "ATS Optimized",
                description: "All templates are optimized for Applicant Tracking Systems to ensure visibility",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 rounded-full bg-gray-100 mb-6 group-hover:bg-gray-900 group-hover:text-white transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Three simple steps to your perfect resume</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Template",
                description: "Select from our collection of professionally designed templates",
                icon: <FileText className="w-12 h-12" />,
              },
              {
                step: "02",
                title: "Add Your Details",
                description: "Fill in your information with our guided form and AI suggestions",
                icon: <Users className="w-12 h-12" />,
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Export your resume in multiple formats and start applying",
                icon: <Star className="w-12 h-12" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gray-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Land Your Dream Job?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've successfully landed interviews with Rezumi-built resumes
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-4 text-lg group">
            Start Your Success Story
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Rezumi
              </Link>
              <p className="text-gray-600 text-sm">Professional resumes made simple</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <span>© {new Date().getFullYear()} Rezumi</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
