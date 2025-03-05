const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const enhanceResume = async (resumeText, jobTitle) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Construct the prompt
    const prompt = `As a professional resume writer and career coach, enhance the following resume to better target the position of "${jobTitle}". 
    Focus on:
    1. Highlighting relevant skills and experiences
    2. Using industry-specific keywords
    3. Quantifying achievements where possible
    4. Improving clarity and impact
    5. Maintaining professional tone
    6. Ensuring ATS-friendly formatting

    Original Resume:
    ${resumeText}

    Please provide the enhanced resume in markdown format, maintaining a clean and professional structure.`;

    // Generate enhanced resume
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedResume = response.text();

    return enhancedResume;
  } catch (error) {
    console.error('Error in resume enhancement:', error);
    throw new Error('Failed to enhance resume. Please try again.');
  }
};

module.exports = {
  enhanceResume
};
