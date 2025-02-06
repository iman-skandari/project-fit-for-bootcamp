import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3010",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
   
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log("Token being sent:", token);
    }else{
      console.log("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any response status code 2xx is handled here
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // No response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response;
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await apiClient.put(endpoint, data);
    return response.data;
  }catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const token = localStorage.getItem('token');
if (!token) {
    console.error("No token found, user might not be logged in.");
    // می‌توانید کاربر را به صفحه ورود هدایت کنید یا پیام خطا نمایش دهید
}






