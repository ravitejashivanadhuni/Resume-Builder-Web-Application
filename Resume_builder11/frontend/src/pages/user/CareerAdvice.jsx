import React from "react";

const CareerAdvice = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Career Advice & Guidance</h1>
        <p className="text-gray-600 mb-6">
          Whether you're starting your career, looking for a job change, or aiming for professional growth, the right advice can make a huge difference. Explore expert tips to improve your resume, prepare for interviews, and build a successful career.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">1. Crafting a Winning Resume</h2>
          <p className="text-gray-600">
            A well-structured resume is your first step toward securing a job interview. Here are some key tips:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Keep it concise and relevant (1-2 pages max).</li>
            <li>Highlight your key skills and achievements.</li>
            <li>Use strong action verbs to describe your work experience.</li>
            <li>Customize your resume for each job application.</li>
            <li>Ensure proper formatting and avoid excessive designs.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">2. Job Search Strategies</h2>
          <p className="text-gray-600">
            Looking for a job? Here’s how to maximize your chances of finding the right opportunity:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Use job portals like LinkedIn, Indeed, and Glassdoor.</li>
            <li>Network with industry professionals and attend career fairs.</li>
            <li>Apply to multiple roles but ensure each application is personalized.</li>
            <li>Follow up with recruiters and hiring managers after applying.</li>
            <li>Leverage your LinkedIn profile for professional visibility.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">3. Acing Job Interviews</h2>
          <p className="text-gray-600">
            Preparation is key to performing well in interviews. Follow these steps:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Research the company and its culture before the interview.</li>
            <li>Practice answering common interview questions.</li>
            <li>Prepare a strong introduction about yourself.</li>
            <li>Dress professionally and maintain positive body language.</li>
            <li>Follow up with a thank-you email after the interview.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">4. Career Growth & Skill Development</h2>
          <p className="text-gray-600">
            Continuous learning is essential for career success. Here’s how to stay ahead:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Take online courses and earn certifications relevant to your field.</li>
            <li>Attend webinars, workshops, and industry conferences.</li>
            <li>Improve your soft skills, including communication and leadership.</li>
            <li>Seek mentorship from experienced professionals.</li>
            <li>Stay updated with industry trends and new technologies.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">5. Maintaining a Work-Life Balance</h2>
          <p className="text-gray-600">
            A successful career should not come at the cost of personal well-being. Follow these tips:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Set clear boundaries between work and personal life.</li>
            <li>Take regular breaks and prioritize mental health.</li>
            <li>Engage in activities that help you relax and recharge.</li>
            <li>Learn to manage stress effectively through mindfulness and exercise.</li>
            <li>Seek support when needed, whether from family, friends, or a mentor.</li>
          </ul>
        </section>

        <p className="text-gray-600 mt-4">
          Your career journey is unique, and the key to success is consistent effort, adaptability, and a positive mindset. Keep learning, stay motivated, and embrace new opportunities!
        </p>
      </div>
    </div>
  );
};

export default CareerAdvice;
