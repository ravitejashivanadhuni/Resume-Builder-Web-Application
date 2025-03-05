import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, endPoints } from '../../api/axios';
import toast from 'react-hot-toast';
import Loader from '../../component/Loader';

const ActionIcon = ({ action }) => {
  switch (action) {
    case 'created':
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      );
    case 'updated':
      return (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'downloaded_pdf':
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'downloaded_doc':
      return (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    default:
      return null;
  }
};

const formatActionText = (action) => {
  switch (action) {
    case 'created':
      return 'Created resume';
    case 'updated':
      return 'Updated resume';
    case 'downloaded_pdf':
      return 'Downloaded PDF';
    case 'downloaded_doc':
      return 'Downloaded DOC';
    default:
      return action;
  }
};

// Create dummy projects data
const dummyProjects = [
  {
    _id: 'demo-resume-1',
    templateId: '1',
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA'
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    history: [
      {
        action: 'created',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        templateId: '1'
      },
      {
        action: 'updated',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        templateId: '1'
      },
      {
        action: 'downloaded_pdf',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        templateId: '1'
      }
    ]
  },
  {
    _id: 'demo-resume-2',
    templateId: '2',
    personalInfo: {
      fullName: 'Jane Smith',
      jobTitle: 'Product Manager',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY'
    },
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    history: [
      {
        action: 'created',
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        templateId: '2'
      },
      {
        action: 'updated',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        templateId: '2'
      },
      {
        action: 'downloaded_doc',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        templateId: '2'
      }
    ]
  },
  {
    _id: 'demo-resume-3',
    templateId: '3',
    personalInfo: {
      fullName: 'Mike Johnson',
      jobTitle: 'UI/UX Designer',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Los Angeles, CA'
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    history: [
      {
        action: 'created',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        templateId: '3'
      },
      {
        action: 'updated',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        templateId: '3'
      },
      {
        action: 'downloaded_pdf',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        templateId: '3'
      }
    ]
  }
];

const MyProjects = () => {
  const [resumes, setResumes] = useState(dummyProjects); // Initialize with dummy data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async (retryCount = 0) => {
    try {
      setError(null);
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please log in to view your resumes');
        navigate('/login');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use dummy data instead of making the API call
      setResumes(dummyProjects);
      setError(null);

    } catch (error) {
      console.error('Error fetching resumes:', error);
      // Always show dummy data even if there's an error
      setResumes(dummyProjects);
      
      // Show a less alarming error message
      toast.error('Using demo data while we fix the connection');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    fetchResumes();
  };

  const handleResumeClick = (resumeId, templateId) => {
    // For demo purposes, just show a toast
    toast.success('Opening resume editor...');
    setTimeout(() => {
      navigate(`/user/resume-${templateId}`, { state: { resumeId } });
    }, 500);
  };

  const handleCreateNew = () => {
    toast.success('Creating new resume...');
    setTimeout(() => {
      navigate('/user/resume-builder');
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto space-y-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl max-w-7xl">
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 relative mb-4">
          My Projects
          <div className="absolute bottom-[-2px] left-0 w-20 h-1 bg-indigo-600"></div>
        </h1>
        <p className="text-gray-600">Manage and edit your created resumes</p>
      </div>

      {error ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl text-gray-600 mb-4">{error}</h2>
          </div>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-100 text-base font-medium flex items-center justify-center mx-auto space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Retry</span>
          </button>
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <img
              src="/assets/empty-projects.svg"
              alt="No resumes"
              className="w-64 h-64 mx-auto opacity-75"
            />
            <h2 className="text-xl text-gray-600 mb-4">No resumes created yet</h2>
            <p className="text-gray-500 mb-8">Start creating your professional resume now!</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-100 text-lg font-medium flex items-center justify-center mx-auto space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Create Your First Resume</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-100 group"
              onClick={() => handleResumeClick(resume._id, resume.templateId)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {resume.personalInfo?.fullName || 'Untitled Resume'}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Template {resume.templateId}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  {resume.personalInfo?.jobTitle && (
                    <p className="mb-2 font-medium text-indigo-600">
                      {resume.personalInfo.jobTitle}
                    </p>
                  )}
                  <div className="space-y-1">
                    <p className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Created: {resume.createdAt.toLocaleDateString()}</span>
                    </p>
                    {resume.updatedAt && (
                      <p className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Updated: {resume.updatedAt.toLocaleDateString()}</span>
                      </p>
                    )}
                  </div>
                </div>

                {resume.history && resume.history.length > 0 && (
                  <div className="border-t pt-3 mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activity</h4>
                    <div className="space-y-2">
                      {resume.history.slice(-3).reverse().map((entry, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <ActionIcon action={entry.action} />
                          <span>{formatActionText(entry.action)}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">
                            {entry.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {resumes.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleCreateNew}
            className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center"
            title="Create New Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProjects; 