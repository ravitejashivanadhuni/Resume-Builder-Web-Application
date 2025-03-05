import React, { useState } from 'react';

const ATSScore = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [errors, setErrors] = useState({});
  const [resumeContent, setResumeContent] = useState(null);
  const [analysisMode, setAnalysisMode] = useState('basic'); // 'basic' or 'comparison'

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!validTypes.includes(file.type)) {
        setErrors({
          resume: 'Please upload a PDF, DOC, DOCX, or TXT file'
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          resume: 'File size should be less than 5MB'
        });
        return;
      }

      setResumeFile(file);
      setErrors({});

      // Read file content
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        setResumeContent(text);
      };

      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        // For other file types, we would need to use appropriate parsing libraries
        // This is a simplified version for demonstration
        reader.readAsText(file);
      }
    }
  };

  const analyzeResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setErrors({
        resume: 'Please upload your resume'
      });
      return;
    }

    if (analysisMode === 'comparison' && !jobDescription.trim()) {
      setErrors({
        jobDescription: 'Please enter the job description'
      });
      return;
    }

    setLoading(true);
    try {
      // Analyze the resume content
      const analysisResult = await analyzeResumeContent(resumeContent, jobDescription);
      setScore(analysisResult.score);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setErrors({
        resume: 'Error analyzing resume. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeResumeContent = async (content, jobDesc = '') => {
    if (!content) return null;

    // Initialize scoring categories
    const formatScore = calculateFormatScore(content);
    const contentScore = calculateContentScore(content);
    const keywordScore = calculateKeywordScore(content);
    
    let matchScore = 0;
    let matchFeedback = [];
    
    if (analysisMode === 'comparison' && jobDesc) {
      const { score, feedback } = calculateJobMatch(content, jobDesc);
      matchScore = score;
      matchFeedback = feedback;
    }

    // Calculate overall score
    const scores = [formatScore, contentScore, keywordScore];
    if (analysisMode === 'comparison') {
      scores.push(matchScore);
    }
    const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return {
      score: overallScore,
      sections: {
        format: {
          score: formatScore,
          feedback: generateFormatFeedback(content)
        },
        content: {
          score: contentScore,
          feedback: generateContentFeedback(content)
        },
        keywords: {
          score: keywordScore,
          feedback: generateKeywordFeedback(content)
        },
        ...(analysisMode === 'comparison' && {
          jobMatch: {
            score: matchScore,
            feedback: matchFeedback
          }
        })
      },
      criticalIssues: identifyCriticalIssues(content),
      improvement: generateImprovementSuggestions(content, jobDesc)
    };
  };

  const calculateJobMatch = (resume, jobDesc) => {
    const resumeWords = new Set(resume.toLowerCase().split(/\W+/));
    const jobWords = new Set(jobDesc.toLowerCase().split(/\W+/));
    
    // Calculate keyword match
    const keywordMatches = [...jobWords].filter(word => resumeWords.has(word));
    const matchScore = Math.round((keywordMatches.length / jobWords.size) * 100);
    
    // Generate feedback
    const feedback = [];
    
    if (matchScore < 50) {
      feedback.push("Low job description match. Consider adding more relevant keywords.");
    } else if (matchScore < 75) {
      feedback.push("Moderate job description match. Some key terms are present but could be improved.");
    } else {
      feedback.push("Strong job description match. Your resume aligns well with the job requirements.");
    }

    // Missing keywords feedback
    const missingKeywords = [...jobWords].filter(word => !resumeWords.has(word) && word.length > 3);
    if (missingKeywords.length > 0) {
      feedback.push(`Consider adding these relevant keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
    }

    return {
      score: matchScore,
      feedback
    };
  };

  const calculateFormatScore = (content) => {
    let score = 0;
    const sections = ['experience', 'education', 'skills', 'contact'];
    const formatChecks = {
      hasProperSections: 0,
      hasConsistentFormatting: 0,
      hasProperSpacing: 0,
      hasCleanStructure: 0
    };

    // Check for proper sections
    sections.forEach(section => {
      if (content.toLowerCase().includes(section)) {
        formatChecks.hasProperSections += 25;
      }
    });

    // Check for consistent formatting
    if (content.split('\n').length > 5) {
      formatChecks.hasConsistentFormatting = 25;
    }

    // Check for proper spacing
    if (content.split('\n\n').length > 2) {
      formatChecks.hasProperSpacing = 25;
    }

    // Check for clean structure
    if (!content.includes('  ') && !content.includes('   ')) {
      formatChecks.hasCleanStructure = 25;
    }

    score = Object.values(formatChecks).reduce((a, b) => a + b, 0);
    return Math.min(100, score);
  };

  const calculateContentScore = (content) => {
    let score = 0;
    const contentChecks = {
      hasQuantifiableResults: 0,
      hasActionVerbs: 0,
      hasRelevantExperience: 0,
      hasAppropriateLength: 0
    };

    // Check for quantifiable results
    const numbers = content.match(/\d+/g);
    if (numbers && numbers.length > 3) {
      contentChecks.hasQuantifiableResults = 25;
    }

    // Check for action verbs
    const actionVerbs = ['managed', 'developed', 'led', 'created', 'implemented'];
    const hasActionVerbs = actionVerbs.some(verb => 
      content.toLowerCase().includes(verb)
    );
    if (hasActionVerbs) {
      contentChecks.hasActionVerbs = 25;
    }

    // Check for relevant experience
    const experienceKeywords = ['experience', 'work', 'project'];
    const hasExperience = experienceKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
    if (hasExperience) {
      contentChecks.hasRelevantExperience = 25;
    }

    // Check for appropriate length
    const wordCount = content.split(/\s+/).length;
    if (wordCount > 200 && wordCount < 1000) {
      contentChecks.hasAppropriateLength = 25;
    }

    score = Object.values(contentChecks).reduce((a, b) => a + b, 0);
    return Math.min(100, score);
  };

  const calculateKeywordScore = (content) => {
    let score = 0;
    const keywordChecks = {
      hasTechnicalSkills: 0,
      hasIndustryTerms: 0,
      hasJobTitles: 0,
      hasToolsAndTechnologies: 0
    };

    // Check for technical skills
    const technicalSkills = ['programming', 'software', 'development', 'engineering'];
    const hasTechnical = technicalSkills.some(skill => 
      content.toLowerCase().includes(skill)
    );
    if (hasTechnical) {
      keywordChecks.hasTechnicalSkills = 25;
    }

    // Check for industry terms
    const industryTerms = ['agile', 'scrum', 'project management', 'analysis'];
    const hasIndustry = industryTerms.some(term => 
      content.toLowerCase().includes(term)
    );
    if (hasIndustry) {
      keywordChecks.hasIndustryTerms = 25;
    }

    // Check for job titles
    const jobTitles = ['engineer', 'developer', 'manager', 'analyst'];
    const hasJobTitles = jobTitles.some(title => 
      content.toLowerCase().includes(title)
    );
    if (hasJobTitles) {
      keywordChecks.hasJobTitles = 25;
    }

    // Check for tools and technologies
    const tools = ['git', 'jira', 'react', 'java', 'python'];
    const hasTools = tools.some(tool => 
      content.toLowerCase().includes(tool)
    );
    if (hasTools) {
      keywordChecks.hasToolsAndTechnologies = 25;
    }

    score = Object.values(keywordChecks).reduce((a, b) => a + b, 0);
    return Math.min(100, score);
  };

  const generateFormatFeedback = (content) => {
    const feedback = [];
    
    if (!content.includes('CONTACT') && !content.includes('Contact')) {
      feedback.push("Add a clear contact information section at the top");
    }
    
    if (content.split('\n').length < 10) {
      feedback.push("Improve resume structure with clear section headings");
    }
    
    if (content.includes('  ') || content.includes('   ')) {
      feedback.push("Ensure consistent spacing throughout the document");
    }

    return feedback.length > 0 ? feedback : ["Resume format is ATS-friendly"];
  };

  const generateContentFeedback = (content) => {
    const feedback = [];
    
    if (!content.match(/\d+/g)) {
      feedback.push("Add quantifiable achievements with specific numbers");
    }
    
    if (content.split(/\s+/).length < 200) {
      feedback.push("Expand on your experience with more details");
    }
    
    if (!content.toLowerCase().includes('experience')) {
      feedback.push("Include detailed work experience section");
    }

    return feedback.length > 0 ? feedback : ["Content is well-structured and detailed"];
  };

  const generateKeywordFeedback = (content) => {
    const feedback = [];
    const keywords = ['technical', 'project', 'development', 'management'];
    
    const missingKeywords = keywords.filter(keyword => 
      !content.toLowerCase().includes(keyword)
    );
    
    if (missingKeywords.length > 0) {
      feedback.push(`Add relevant keywords: ${missingKeywords.join(', ')}`);
    }
    
    if (!content.match(/\b[A-Z][A-Z]+\b/g)) {
      feedback.push("Include industry-specific acronyms and tools");
    }

    return feedback.length > 0 ? feedback : ["Good use of relevant keywords"];
  };

  const identifyCriticalIssues = (content) => {
    const issues = [];
    
    if (!content.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)) {
      issues.push("Missing or invalid email address format");
    }
    
    if (!content.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)) {
      issues.push("Missing or invalid phone number format");
    }
    
    if (content.split('\n').length < 5) {
      issues.push("Resume is too brief - expand content");
    }
    
    if (content.length > 5000) {
      issues.push("Resume is too long - consider condensing");
    }

    return issues;
  };

  const generateImprovementSuggestions = (content, jobDesc) => {
    const suggestions = [];
    
    if (!content.toLowerCase().includes('summary') && !content.toLowerCase().includes('objective')) {
      suggestions.push("Add a professional summary section");
    }
    
    if (!content.toLowerCase().includes('linkedin.com')) {
      suggestions.push("Include LinkedIn profile URL");
    }
    
    if (!content.match(/\d+%|\d+ percent/)) {
      suggestions.push("Add metrics to quantify achievements");
    }
    
    if (!content.toLowerCase().includes('certification')) {
      suggestions.push("Consider adding relevant certifications");
    }

    if (analysisMode === 'comparison' && jobDesc) {
      suggestions.push("Consider adding more relevant keywords to your resume");
    }

    return suggestions;
  };

  return (
    <div className="p-8 mx-auto space-y-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl max-w-7xl">
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 relative mb-4">
          ATS Resume Analyzer
          <div className="absolute bottom-[-2px] left-0 w-20 h-1 bg-indigo-600"></div>
        </h1>
        <p className="text-gray-600 text-lg">
          Upload your resume to get an instant ATS compatibility score and detailed feedback to improve your resume's performance with Applicant Tracking Systems.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAnalysisMode('basic')}
            className={`px-4 py-2 rounded-xl ${
              analysisMode === 'basic'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
            } transition-all duration-200`}
          >
            Basic Analysis
          </button>
          <span className="text-gray-500 font-medium">or</span>
          <button
            onClick={() => setAnalysisMode('comparison')}
            className={`px-4 py-2 rounded-xl ${
              analysisMode === 'comparison'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
            } transition-all duration-200`}
          >
            Job Description Comparison
          </button>
        </div>
      </div>

      <form onSubmit={analyzeResume} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">
            Upload Your Resume<span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX or TXT (MAX. 5MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </label>
            {resumeFile && (
              <div className="mt-2 text-sm text-gray-500">
                Selected file: {resumeFile.name}
              </div>
            )}
            {errors.resume && (
              <p className="mt-2 text-sm text-red-600">{errors.resume}</p>
            )}
          </div>
        </div>

        {analysisMode === 'comparison' && (
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Job Description<span className="text-indigo-600">*</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl min-h-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Paste the job description here..."
            />
            {errors.jobDescription && (
              <p className="mt-2 text-sm text-red-600">{errors.jobDescription}</p>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-indigo-100 text-lg font-medium flex items-center space-x-2"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing Resume...</span>
              </div>
            ) : (
              <>
                <span>Analyze Resume</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {score !== null && analysis !== null && (
        <div className="mt-8 space-y-6">
          {/* Overall Score */}
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall ATS Score</h2>
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-indigo-600">{score}%</span>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#4f46e5"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${score * 3.51} 351`}
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Section Scores:</h3>
                <div className="space-y-2">
                  {Object.entries(analysis.sections).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="flex-1">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${value.score}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-right">{value.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(analysis.sections).map(([key, value]) => (
              <div key={key} className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {key.charAt(0).toUpperCase() + key.slice(1)} Analysis
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {value.feedback.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Critical Issues */}
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-red-600">Critical Issues</h3>
              <ul className="list-disc list-inside space-y-2">
                {analysis.criticalIssues.map((issue, index) => (
                  <li key={index} className="text-gray-700">{issue}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Improvement Suggestions</h3>
            <ul className="list-disc list-inside space-y-2">
              {analysis.improvement.map((suggestion, index) => (
                <li key={index} className="text-gray-700">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScore; 