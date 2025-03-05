import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const resumeRef = useRef();

  const handleDownloadPDF = async () => {
    try {
      const element = resumeRef.current;
      if (!element) {
        console.error("Resume element not found.");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false
      });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imageData);
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

      pdf.addImage(imageData, "PNG", 0, 0, pageWidth, imgHeight);

      pdf.save("Resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className="flex justify-end max-sm:justify-center max-md:justify-center max-lg:justify-center resume-flex">
        <button
          className="bg-[#005151] text-white py-2 px-6 rounded-lg mb-5 mr-2 button-select"
          onClick={() =>
            navigate("/user/select-resume", { state: { formData } })
          }
        >
          Select Another Resume
        </button>
        <button
          className="bg-[#005151] text-white py-2 px-6 rounded-lg mb-5 ml-2 flex justify-center items-center max-sm:ml-0"
          onClick={handleDownloadPDF}
        >
          Download
          <img src="/assets/download.svg" className="ml-2" width={23} />
        </button>
      </div>
      <div className="w-[850px] mx-auto mt-6" ref={resumeRef}>
        <div className="bg-white shadow-lg p-8">
          <header className="flex justify-between items-center border-b-2 pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold capitalize">
                {formData.name || "Alice Doe"}
              </h1>
              <p className="text-gray-600 capitalize">
                {formData.role || "Enthusiastic Nursing Graduate"}
              </p>
            </div>
            <div className="text-right text-sm">
              <p>123 Your Street</p>
              <p>Your City, ST 12345</p>
              <p>(123) 456-7890</p>
              <p>{formData.email || "no_reply@example.com"}</p>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <section className="mb-6">
                <h2 className="text-xl font-semibold border-b-2 mb-3">
                  EXPERIENCE
                </h2>
                {formData.workExperience?.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold capitalize">
                      {exp.jobTitle} - {exp.company}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(exp.startDate).toLocaleString("en-GB", {
                        month: "short",
                        year: "numeric"
                      })} - 
                      {new Date(exp.endDate).toLocaleString("en-GB", {
                        month: "short",
                        year: "numeric"
                      })}
                    </p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </section>

              <section>
                <h2 className="text-xl font-semibold border-b-2 mb-3">
                  EDUCATION
                </h2>
                {formData.education?.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold capitalize">{edu.school}</h3>
                    <p className="text-gray-600 capitalize">{edu.degree}</p>
                    <p className="text-gray-600">
                      {new Date(edu.startDate).toLocaleString("en-GB", {
                        month: "short",
                        year: "numeric"
                      })} - 
                      {new Date(edu.endDate).toLocaleString("en-GB", {
                        month: "short",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                ))}
              </section>
            </div>

            <div>
              <section className="mb-6">
                <h2 className="text-xl font-semibold border-b-2 mb-3">
                  SKILLS
                </h2>
                <ul className="list-disc pl-5">
                  {formData.skills?.map((skill, index) => (
                    <li key={index} className="mb-1">{skill.name}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-semibold border-b-2 mb-3">
                  LANGUAGES
                </h2>
                <ul className="list-disc pl-5">
                  {formData.languages?.map((lang, index) => (
                    <li key={index} className="mb-1">{lang.name}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeTwo;