import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  


  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-200">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-slate-900">QuizApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/auth" className="text-sm font-medium hover:underline underline-offset-4">
            Sign In
          </Link>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 space-y-6 py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Create engaging quizzes with ease
                </h1>
                <p className="max-w-[600px] text-slate-600 md:text-xl">
                  Build, share, and analyze interactive quizzes for education, training, or just for fun.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl border border-slate-200">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sample Quiz</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-slate-50">
                      <p className="font-medium">1. What is the capital of France?</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-slate-300 mr-2"></div>
                          <p>London</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-slate-300 mr-2 bg-slate-900"></div>
                          <p className="font-medium">Paris</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-slate-300 mr-2"></div>
                          <p>Berlin</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50">
                      <p className="font-medium">2. The Earth is flat.</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-slate-300 mr-2"></div>
                          <p>True</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-slate-300 mr-2 bg-slate-900"></div>
                          <p className="font-medium">False</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
              <p className="max-w-[900px] text-slate-600 md:text-xl">
                Everything you need to create and manage engaging quizzes
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl">
              <div className="p-2 bg-slate-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M8 13h2" />
                  <path d="M8 17h2" />
                  <path d="M14 13h2" />
                  <path d="M14 17h2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Multiple Question Types</h3>
              <p className="text-center text-slate-600">
                Create multiple-choice, true/false, and short-answer questions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl">
              <div className="p-2 bg-slate-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 20v-6M6 20V10M18 20V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Detailed Analytics</h3>
              <p className="text-center text-slate-600">
                Track quiz performance with comprehensive analytics and insights.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl">
              <div className="p-2 bg-slate-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Custom Branding</h3>
              <p className="text-center text-slate-600">
                Premium users can add custom branding and themes to their quizzes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-12 md:py-24 lg:py-32 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Pricing</h2>
              <p className="max-w-[900px] text-slate-600 md:text-xl">
                Choose the plan that's right for you
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-slate-600">Perfect for getting started</p>
                <div className="text-3xl font-bold">$0</div>
              </div>
              <ul className="flex flex-col mt-6 space-y-2 grow">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Up to 5 quizzes</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Community support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/auth">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-xl shadow-md border-2 border-slate-900">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-slate-600">For professionals and educators</p>
                <div className="text-3xl font-bold">$9/mo</div>
              </div>
              <ul className="flex flex-col mt-6 space-y-2 grow">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Unlimited quizzes</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Custom branding</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/auth">
                  <Button className="w-full">Subscribe Now</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Business</h3>
                <p className="text-slate-600">For teams and organizations</p>
                <div className="text-3xl font-bold">$29/mo</div>
              </div>
              <ul className="flex flex-col mt-6 space-y-2 grow">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Team management</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/auth">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 border-t border-slate-200">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">© 2025 QuizApp. All rights reserved.</span>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-slate-600 hover:underline underline-offset-4">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-slate-600 hover:underline underline-offset-4">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}