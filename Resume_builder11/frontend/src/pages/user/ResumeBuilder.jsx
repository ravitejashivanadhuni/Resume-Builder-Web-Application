import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../../component/ResumeBuilderSection";

const ResumeBuilder = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    gender: "",
    profile_photo: null,
    dateOfBirth: "",
    phone: "",
    email: "",
    website: "",
    objective: "",
    workExperience: [
      {
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        location: "",
        description: ""
      }
    ],
    education: [
      {
        school: "",
        startDate: "",
        endDate: "",
        degree: "",
        cgpa: "",
        additionalInfo: "",
        location: ""
      }
    ],
    certificates: [{ name: "", location: "", startDate: "", endDate: "" }],
    projects: [{ projectName: "", date: "", description: "", url: "" }],
    languages: [{ name: "" }],
    interests: [{ name: "" }],
    skills: [{ name: "" }],
    featuredSkills: [{ name: "" }]
  });
  const [errors, setErrors] = useState({});

  // Get the selected template from localStorage when component mounts
  useEffect(() => {
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
      // Clear the selected template from localStorage
      localStorage.removeItem('selectedTemplate');
      // Store it in component state
      setSelectedTemplate(selectedTemplate);
    }
  }, []);

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profile_photo: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (index, field, section, value) => {
    setFormData((prev) => {
      const updatedArray = [...(prev[section] || [])];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return { ...prev, [section]: updatedArray };
    });
  };

  const addSectionItem = (section, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeSectionItem = (section, index) => {
    const updatedArray = formData[section].filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, [section]: updatedArray }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.role.trim()) newErrors.role = "Role is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required.";
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone =
        "Phone number must start with 6, 7, 8, or 9 and be 10 digits long.";
    if (
      !formData.email.trim() ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    )
      newErrors.email = "Valid email is required.";
    if (
      !formData.website.trim() ||
      !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(formData.website)
    )
      newErrors.website = "Valid website URL is required.";
    if (!formData.objective.trim())
      newErrors.objective = "Objective is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setLoader(true);
    if (Object.keys(validationErrors).length === 0) {
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          if (Array.isArray(value)) {
            return [
              key,
              value.filter((item) =>
                Object.values(item).some((field) => field && field.trim?.())
              )
            ];
          }
          return [key, value];
        })
      );

      try {
        // If we have a selected template from the Templates page
        if (selectedTemplate) {
          navigate(`/user/${selectedTemplate}`, { state: { formData: filteredFormData } });
        } else {
          // Otherwise, go to template selection page
          navigate("/user/select-resume", { state: { formData: filteredFormData } });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setLoader(false);
  };

  return (
    <form
      className="p-8 mx-auto space-y-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl max-w-7xl"
      onSubmit={handleSubmit}
    >
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 relative mb-4">
          Resume Builder
          <div className="absolute bottom-[-2px] left-0 w-20 h-1 bg-indigo-600"></div>
        </h1>
      </div>

      {/* Form Fields */}
      <div className="items-start block md:flex gap-10">
        <div className="relative w-[160px] h-[160px] max-sm:w-[160px] max-md:w-[160px] max-lg:w-[200px] max-2xl:w-[250px] max-xl:w-[180px] 3xl:w-[180px] rounded-2xl bg-gray-50 flex items-center justify-center group border-2 border-dashed border-gray-200">
          <label
            htmlFor="uploadProfile"
            className="cursor-pointer w-full h-full relative"
          >
            {formData.profile_photo ? (
              <img
                src={URL.createObjectURL(formData.profile_photo)}
                alt="Profile"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5v-4.5m0 0V7.5m0 4.5H7.5m4.5 0h4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}

            {/* Hover Effect */}
            <label
              htmlFor="profile_photo"
              className="absolute inset-0 bg-indigo-600 bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer"
            >
              <span className="text-indigo-600 text-lg font-medium opacity-0 group-hover:opacity-100">Upload Photo</span>
            </label>

            {/* Hidden File Input */}
            <input
              id="profile_photo"
              type="file"
              name="profile_photo"
              className="hidden"
              accept=".png,.jpeg,.jpg"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 flex-1">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Full Name<span className="text-indigo-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Role<span className="text-indigo-600">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter your role"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Location<span className="text-indigo-600">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Phone Number<span className="text-indigo-600">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const { value } = e.target;
                if (/^\d{0,10}$/.test(value)) {
                  handleChange(e);
                }
              }}
              placeholder="Enter your phone number"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Email<span className="text-indigo-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Gender<span className="text-indigo-600">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              URL<span className="text-indigo-600">*</span>
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter your website (e.g., LinkedIn URL)"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          Objective<span className="text-indigo-600">*</span>
        </label>
        <textarea
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          rows={4}
          placeholder="Enter your objective"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
        {errors.objective && (
          <p className="text-red-500 text-sm">{errors.objective}</p>
        )}
      </div>

      {/* Work Experience, Education, Certificates, Projects */}
      <div className="space-y-8">
        <Section
          title="Work Experience"
          sectionKey="workExperience"
          items={formData.workExperience}
          fields={[
            "company",
            "jobTitle",
            "startDate",
            "endDate",
            "location",
            "description"
          ]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() =>
            addSectionItem("workExperience", {
              company: "",
              jobTitle: "",
              startDate: "",
              endDate: "",
              location: "",
              description: ""
            })
          }
          removeSectionItem={(index) => removeSectionItem("workExperience", index)}
        />

        <Section
          title="Education"
          sectionKey="education"
          items={formData.education}
          fields={[
            "school",
            "degree",
            "startDate",
            "endDate",
            "cgpa",
            "additionalInfo",
            "location"
          ]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() =>
            addSectionItem("education", {
              school: "",
              startDate: "",
              endDate: "",
              degree: "",
              cgpa: "",
              additionalInfo: "",
              location: ""
            })
          }
          removeSectionItem={(index) => removeSectionItem("education", index)}
        />

        <Section
          title="Certificates"
          sectionKey="certificates"
          items={formData.certificates}
          fields={["name", "location", "startDate", "endDate"]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() =>
            addSectionItem("certificates", {
              name: "",
              location: "",
              startDate: "",
              endDate: ""
            })
          }
          removeSectionItem={(index) => removeSectionItem("certificates", index)}
        />

        <Section
          title="Projects"
          sectionKey="projects"
          items={formData.projects}
          fields={["projectName", "date", "description", "url"]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() =>
            addSectionItem("projects", {
              projectName: "",
              date: "",
              description: "",
              url: ""
            })
          }
          removeSectionItem={(index) => removeSectionItem("projects", index)}
        />
      </div>

      {/* Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Section
          title="Languages"
          sectionKey="languages"
          items={formData.languages}
          fields={["name"]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() =>
            addSectionItem("languages", {
              name: ""
            })
          }
          removeSectionItem={(index) => removeSectionItem("languages", index)}
        />

        {/* Interests */}
        <Section
          title="Interests - (Hobbies)"
          sectionKey="interests"
          items={formData.interests}
          fields={["name"]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() =>
            addSectionItem("interests", {
              name: ""
            })
          }
          removeSectionItem={(index) => removeSectionItem("interests", index)}
        />

        {/* Skills */}
        <Section
          title="Skills"
          sectionKey="skills"
          items={formData.skills}
          fields={["name"]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() =>
            addSectionItem("skills", {
              name: ""
            })
          }
          removeSectionItem={(index) => removeSectionItem("skills", index)}
        />

        {/* Featured Skills */}
        <Section
          title="Featured Skills"
          sectionKey="featuredSkills"
          items={formData.featuredSkills}
          fields={["name"]}
          handleArrayChange={handleArrayChange}
          addSectionItem={() => addSectionItem("featuredSkills", { name: "" })}
          removeSectionItem={(index) =>
            removeSectionItem("featuredSkills", index)
          }
        />
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-indigo-100 text-lg font-medium flex items-center space-x-2"
          disabled={loader}
        >
          {loader ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <span>Create Resume</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ResumeBuilder;
