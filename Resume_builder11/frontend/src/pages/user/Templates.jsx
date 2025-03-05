import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import template preview images

const Templates = () => {
  const navigate = useNavigate();

  // Use a data URL for the placeholder image
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23475569' text-anchor='middle' dy='.3em'%3EResume Template Preview%3C/text%3E%3C/svg%3E";

  const templates = [
    {
      id: 1,
      name: 'Professional Classic',
      image: '/assets/resume-one.png',
      description: 'Clean and professional design with a traditional layout. Perfect for corporate roles and experienced professionals.',
      path: 'resume-one',
      features: ['ATS-Friendly', 'Clean Layout', 'Professional Design']
    },
    {
      id: 2,
      name: 'Modern Creative',
      image: '/assets/resume-two.png',
      description: 'Modern and creative design with a unique layout. Ideal for creative professionals and designers.',
      path: 'resume-two',
      features: ['Creative Layout', 'Modern Design', 'Visual Appeal']
    },
    {
      id: 3,
      name: 'Executive Premium',
      image: '/assets/resume-three.png',
      description: 'Premium design for executive and senior-level professionals. Emphasizes leadership and achievements.',
      path: 'resume-three',
      features: ['Executive Style', 'Achievement Focus', 'Professional']
    },
    {
      id: 4,
      name: 'Tech Specialist',
      image: '/assets/resume-four.png',
      description: 'Optimized for tech professionals with dedicated sections for technical skills and projects.',
      path: 'resume-four',
      features: ['Tech-Focused', 'Skills Highlight', 'Project Showcase']
    },
    {
      id: 5,
      name: 'Minimalist Pro',
      image: '/assets/resume-five.png',
      description: 'Clean and minimalist design that lets your content shine. Perfect for any industry.',
      path: 'resume-five',
      features: ['Minimalist', 'Content-Focused', 'Versatile']
    },
    {
      id: 6,
      name: 'Creative Portfolio',
      image: '/assets/resume-six.png',
      description: 'Showcase your creative work with this portfolio-style resume template.',
      path: 'resume-six',
      features: ['Portfolio Style', 'Visual Focus', 'Creative Layout']
    },
    {
      id: 7,
      name: 'Business Professional',
      image: '/assets/resume-seven.png',
      description: 'Traditional business layout with modern touches. Ideal for business and management roles.',
      path: 'resume-seven',
      features: ['Business-Focused', 'Professional', 'Traditional']
    },
    {
      id: 8,
      name: 'Graduate Entry',
      image: '/assets/resume-eight.png',
      description: 'Perfect for recent graduates and early career professionals. Emphasizes education and skills.',
      path: 'resume-eight',
      features: ['Entry-Level', 'Education Focus', 'Skills-Based']
    },
    {
      id: 9,
      name: 'Modern Professional',
      image: '/assets/resume-nine.png',
      description: 'Contemporary design with a perfect balance of professionalism and modernity.',
      path: 'resume-nine',
      features: ['Modern', 'Professional', 'Balanced Layout']
    },
    {
      id: 10,
      name: 'Modern Professional',
      image: '/assets/resume-ten.png',
      description: 'Contemporary design with a perfect balance of professionalism and modernity.',
      path: 'resume-ten',
      features: ['Modern', 'Professional', 'Balanced Layout']
    }
  ];

  const handleTemplateClick = (templatePath) => {
    // Store the selected template path in localStorage
    localStorage.setItem('selectedTemplate', templatePath);
    // Navigate to the resume builder to collect information
    navigate('/user/resume-builder');
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="border-b border-gray-200 pb-8 mb-12">
        <h1 className="text-4xl font-bold text-gray-800 relative mb-4">
          Resume Templates
          <div className="absolute bottom-[-2px] left-0 w-20 h-1 bg-indigo-600"></div>
        </h1>
        <p className="text-gray-600 text-lg">
          Choose from our collection of professionally designed resume templates. Each template is ATS-friendly and fully customizable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative group">
              <div className="w-full h-72 overflow-hidden bg-gray-50">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-indigo-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            
            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {template.name}
              </h3>
              
              <p className="text-gray-600">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm rounded-full bg-indigo-50 text-indigo-600 font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => handleTemplateClick(template.path)}
                className="w-full py-4 px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-100 font-medium text-lg"
              >
                <span>Use This Template</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-200 transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates; 