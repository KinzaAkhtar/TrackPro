import React, { useState } from 'react';
import axios from "axios";
import Logo from '../assets/Logo.png';
import LoginPgImage from '../assets/LoginPgImage.png';
import LoginPgArrow from '../assets/LoginPgArrow.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [workemail, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  //const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the login request to the backend
      const response = await axios.post("/api/v1/user/login", { workemail, password });

      // Check for success in the response
      if (response.data.success) {
        // Extract user and accessToken from the response
        const { user, accessToken } = response.data.data;

        // Save the accessToken in localStorage
        // Save the accessToken and user info in localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Convert the user object to a JSON string


        // Navigate based on user role or designation
        if (user.role === "admin") {
          navigate('/admin-dashboard', { state: { user } }); // Navigate to admin dashboard
        } else if (user.designation === "Team Lead") {
          navigate('/tl-dashboard'); // Navigate to team lead dashboard
        } else {
          navigate('/employee-dashboard'); // Navigate to employee dashboard
        }
      } else {
        // Handle case where success is not true
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      // Handle errors from the backend
      if (error.response && error.response.data.error) {
        setError(error.response.data.error); // Display backend error message
      } else {
        setError("Internal Server Error. Please try again later."); // Fallback error
      }
    }
  };

  return (
    <div className="bg-white min-h-screen flex">
      <div className="flex justify-center mt-4">
        <img src={Logo} alt="Image 1" className="w-30 h-28" />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={LoginPgImage} alt="Image 2" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 bg-white p-8 shadow-md rounded relative flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-3">Sign In</h1>
        <p>Enter Your Details Below</p>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full flex flex-col items-center">
          <div className="mb-4 relative">
            <input
              type="text"
              id="workemail"
              name="workemail"
              value={workemail}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="peer shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
            <label htmlFor="workemail" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:left-3 peer-valid:top-0 peer-valid:text-xs peer-valid:text-gray-600">
              Work Email
            </label>
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
            <label htmlFor="password" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-600 peer-valid:top-0 peer-valid:text-xs peer-valid:text-gray-600">
              Password
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="rememberMe" className="block text-gray-700 text-sm font-bold">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold w-[250px] h-[35px] rounded focus:outline-none focus:shadow-outline"
          >
            SIGN IN
          </button>
        </form>
        <div className="absolute bottom-0 right-4">
          <img src={LoginPgArrow} alt="Image 1" className="w-30 h-28" />
        </div>
      </div>
    </div>
  )
}

export default Login