import React from "react";

const tips = [
  "Formatting & Structure",
  "Keep your resume concise and relevant (1-2 pages).",
  "Use a professional format with clear headings and sections.",
  "Choose a clean, easy-to-read font like Arial, Calibri, or Times New Roman.",
  "Maintain consistent formatting with proper spacing and alignment.",
  "Use bullet points to list achievements and responsibilities.",
  "Avoid using tables or excessive graphics that ATS systems may not read.",
  "Ensure a balance between white space and text to improve readability.",
  
  "Content & Writing Style",
  "Start each bullet point with a strong action verb (e.g., 'Implemented', 'Led', 'Developed').",
  "Highlight key achievements rather than listing job duties.",
  "Quantify your results whenever possible (e.g., 'Increased sales by 30%').",
  "Keep descriptions clear and avoid unnecessary jargon.",
  "Ensure proper grammar, punctuation, and avoid typos.",
  "Use present tense for current roles and past tense for previous roles.",
  "Include both hard skills (technical abilities) and soft skills (communication, leadership).",
  
  "ATS Optimization",
  "Customize your resume for each job by using relevant keywords from the job description.",
  "Use standard section headings (e.g., 'Work Experience', 'Education', 'Skills') to improve ATS readability.",
  "Save and submit your resume in PDF format unless stated otherwise.",
  "Avoid using images, charts, or non-text elements that ATS may not recognize.",
  
  "Sections to Include",
  "Start with a strong summary statement highlighting your key strengths.",
  "Include your contact information at the top (phone, email, LinkedIn).",
  "List relevant work experience with job titles, company names, and dates.",
  "Mention certifications, training programs, and professional development.",
  "Include links to your portfolio, GitHub, or LinkedIn if applicable.",
  "If you're a fresher, emphasize internships, projects, and academic achievements.",
  
  "Job Application & Extra Tips",
  "Research the company before applying to tailor your resume accordingly.",
  "Use a professional email address (avoid usernames like 'coolguy123@gmail.com').",
  "Ensure your resume aligns with your LinkedIn profile for consistency.",
  "Have someone proofread your resume for errors and readability.",
  "Keep a master resume with all details and tailor a specific one for each job.",
  "Update your resume regularly to reflect new skills and experiences.",
  "Follow up with recruiters after submitting your resume to increase visibility."
];

const ResumeTips = () => {
  console.log("ResumeTips component rendered!");
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Resume Creation Tips</h2>
      <div className="p-6 shadow-lg rounded-2xl bg-white">
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✔️</span>
              <span className="text-gray-800 text-lg">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeTips;
