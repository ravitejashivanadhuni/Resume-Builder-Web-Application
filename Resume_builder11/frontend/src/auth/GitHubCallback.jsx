import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, endPoints } from '../api/axios';
import toast from 'react-hot-toast';

const GithubCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGithubCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Exchange code for access token
          const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client_id: process.env.GITHUB_CLIENT_ID,
              client_secret: process.env.GITHUB_CLIENT_SECRET,
              code,
            }),
          });

          const tokenData = await tokenResponse.json();
          
          if (tokenData.access_token) {
            // Get user data from GitHub
            const userResponse = await fetch('https://api.github.com/user', {
              headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
              },
            });
            const userData = await userResponse.json();

            // Get user email from GitHub
            const emailResponse = await fetch('https://api.github.com/user/emails', {
              headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
              },
            });
            const emailData = await emailResponse.json();
            const primaryEmail = emailData.find(email => email.primary)?.email;

            if (primaryEmail) {
              // Login with our backend
              const { data } = await axiosInstance.post(
                endPoints.auth.loginWithGithub,
                { email: primaryEmail, user: userData },
                { withCredentials: true }
              );

              toast.success(data.message);
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));

              const { role } = data.user;
              if (role === "admin") {
                navigate("/admin");
              } else if (role === "user") {
                navigate("/user");
              } else if (role === "recruiter") {
                navigate("/recruiter");
              }
            } else {
              toast.error("Could not get email from GitHub");
              navigate("/");
            }
          } else {
            toast.error("GitHub authentication failed");
            navigate("/");
          }
        } catch (error) {
          console.error('GitHub auth error:', error);
          toast.error("Authentication failed");
          navigate("/");
        }
      } else {
        toast.error("No authentication code received");
        navigate("/");
      }
    };

    handleGithubCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4DC3AB] mx-auto"></div>
        <p className="mt-4 text-gray-600">Authenticating with GitHub...</p>
      </div>
    </div>
  );
};

export default GithubCallback; 