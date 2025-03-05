import React from 'react';

const AboutUs = () => {
  const advantages = [
    {
      title: "AI-Powered Resume Optimization",
      description: "Our advanced AI algorithms analyze and enhance your resume to match industry standards and job requirements.",
      icon: "🤖"
    },
    {
      title: "ATS-Friendly Templates",
      description: "Professional templates designed to pass Applicant Tracking Systems while maintaining visual appeal.",
      icon: "📄"
    },
    {
      title: "Smart Content Suggestions",
      description: "Get intelligent recommendations for skills, keywords, and achievements based on your industry.",
      icon: "💡"
    },
    {
      title: "Real-Time ATS Score",
      description: "Instant feedback on your resume's compatibility with ATS systems used by employers.",
      icon: "📊"
    },
    {
      title: "Easy Customization",
      description: "Quickly tailor your resume for different job applications with our user-friendly interface.",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Our Resume Builder
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're dedicated to helping professionals create compelling resumes that stand out in today's competitive job market. Our AI-powered platform combines cutting-edge technology with professional expertise to ensure your success.
        </p>
      </div>

      {/* Advantages Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {advantage.title}
              </h3>
              <p className="text-gray-600">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600">
          We believe everyone deserves a chance to showcase their best professional self. Our mission is to democratize the resume creation process by providing intelligent tools that help job seekers create powerful, ATS-optimized resumes that effectively communicate their value to potential employers.
        </p>
      </div>
    </div>
  );
};

export default AboutUs; 