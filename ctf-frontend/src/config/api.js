// API Configuration
// This ensures all API calls point to the correct backend URL

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://backend2.bhupeshkumar.blog";

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  
  // Team endpoints
  TEAM_CREATE: `${API_BASE_URL}/api/team/create`,
  TEAM_JOIN: `${API_BASE_URL}/api/team/join`,
  TEAM_LOGIN: `${API_BASE_URL}/api/team/login`,
  TEAM_ME: `${API_BASE_URL}/api/team/me`,
  
  // Challenge endpoints
  CHALLENGES: `${API_BASE_URL}/api/challenges`,
  SUBMIT: `${API_BASE_URL}/api/submit`,
  
  // Leaderboard endpoint
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard`,
};

// Helper function for authenticated requests
export const fetchWithAuth = (url, options = {}) => {
  const token = localStorage.getItem("teamToken");
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

export default API_BASE_URL;
