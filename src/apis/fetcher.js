import axios from "axios";

// Setup axios instance - tạo ra cấu hình mặc định
const fetcher = axios.create({
  baseURL: "http://localhost:8080",
});

fetcher.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X25hbWUiOiJhbGliYWJhMjAyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA4NTczOTQwLCJleHAiOjE3MTM3NzU5NDB9.UBxeRAoDcFJqFldkm4pTfv5lso80bQnDE2WfKYpd_6A";
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.post(session_url, {}, {
//   headers: { 'Authorization': + basicAuth }
// }).then(function(response) {
//   console.log('Authenticated');
// }).catch(function(error) {
//   console.log('Error on Authentication');
// });
export default fetcher;