import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const RESUME_API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v2",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

export const enhanceResume = async (resumeContent) => {
  try {
    const response = await RESUME_API.post("/resume/enhance", { resumeContent });
    return response.data;
  } catch (error) {
    console.error('Error enhancing resume:', error);
    throw error;
  }
};
