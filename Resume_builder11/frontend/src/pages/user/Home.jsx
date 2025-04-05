import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GoogleAd from "@/component/GoogleAd";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');
  const isUserDashboard = location.pathname.startsWith('/user');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: 'Smart Resume Builder',
      description: 'Create professional resumes with our intuitive builder. Multiple templates and real-time preview.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'ATS Optimization',
      description: 'Ensure your resume passes ATS systems with our intelligent scoring and optimization suggestions.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'AI Enhancement',
      description: 'Leverage AI to enhance your resume content and make it more impactful and professional.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const whyChooseUs = [
    {
      title: 'Professional Templates',
      description: 'Choose from a variety of ATS-friendly, professionally designed templates.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: 'Easy to Use',
      description: 'Intuitive interface that makes resume creation a breeze.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: 'AI-Powered',
      description: 'Advanced AI technology to enhance your resume content.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Expert Support',
      description: 'Get assistance from our expert team whenever you need.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${!isUserDashboard ? 'pt-0' : ''}`}>
      {/* Public Header for non-authenticated users */}
      {!isAuthenticated && !isUserDashboard && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex-shrink-0 w-[300px]">
                <img
                  src="/assets/resume-logo.svg"
                  alt="Resume Builder"
                  className="h-12 w-full"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section with Welcome Effect */}
      <div className={`relative bg-gradient-to-br from-blue-600 to-blue-800 ${!isUserDashboard ? '' : 'mt-20 pt-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-blue-100">
                Create Your Professional Resume
                <span className="block mt-2 text-cyan-200 font-extrabold">in Minutes</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed font-medium">
                Build a standout resume that gets you noticed. 
                <span className="block mt-2 text-cyan-100">Powered by AI, designed for success.</span>
              </p>
              <div className="pt-4">
                <Link
                  to={isAuthenticated ? "/user/resume-builder" : "/login"}
                  className="inline-flex items-center px-8 py-4 bg-cyan-50 text-blue-700 rounded-xl hover:bg-white transition-all duration-200 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isAuthenticated ? "Create Resume" : "Get Started"}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/assets/resume-builder-hero.svg" 
                alt="Resume Builder" 
                className="w-full h-auto max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-blue-600/80">Everything you need to create a professional resume</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-6 transform hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-blue-600/75 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Google Ad after Features */}
      <div className="my-8 flex justify-center">
        <GoogleAd />
      </div>
      {/* Why Choose Us Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Why Choose Us</h2>
            <p className="text-xl text-blue-600/80">Stand out from the crowd with our unique features</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="p-8 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-4 transform hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                <p className="text-blue-600/75 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Resume Builder</h3>
              <p className="text-gray-400 leading-relaxed">Create professional resumes with ease using our AI-powered platform.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to={isAuthenticated ? "/user/resume-builder" : "/login"} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Create Resume</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to={isAuthenticated ? "/user/templates" : "/login"} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Templates</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to={isAuthenticated ? "/user/ats-score" : "/login"} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>ATS Score</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/resumetips" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Resume Tips</span>
                  </Link>
                </li>
                <li>
                <Link to="/career-advice" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Career Advice</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>FAQ</span>
                </Link>
              </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Contact</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>resumesbyhirely@gmail.com</span>
                </li>
                <li className="flex space-x-4 mt-4">
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Home; 
