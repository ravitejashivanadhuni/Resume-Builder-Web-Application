import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Resume Builder?",
      answer:
        "Resume Builder is an online platform that helps users create professional resumes using various templates and tools.",
    },
    {
      question: "Is Resume Builder free to use?",
      answer:
        "Yes, its completely free to use",
    },
    {
      question: "How can I download my resume?",
      answer:
        "Once you've completed your resume, you can download it in PDF format by clicking on the 'Download' button on the resume preview page.",
    },
    {
      question: "Can I edit my resume after saving it?",
      answer:
        "Yes, you can edit and update your resume anytime by logging into your account and selecting 'Edit Resume' from the dashboard.",
    },
    {
      question: "What are ATS-friendly resumes?",
      answer:
        "ATS-friendly resumes are designed to pass through Applicant Tracking Systems used by employers to filter job applications based on keywords and formatting.",
    },
    {
      question: "Do you provide career advice along with resume building?",
      answer:
        "Yes! We have a dedicated Career Advice section where you can find tips on job searching, resume writing, and interview preparation.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our support team via the 'Contact Us' page or email us at resumebyhirely@gmail.com.",
    },
    {
      question: "Can I use Resume Builder for different types of jobs?",
      answer:
        "Absolutely! We provide templates suitable for various industries, including IT, finance, healthcare, and creative fields.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
