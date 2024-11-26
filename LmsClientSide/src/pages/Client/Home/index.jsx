import React, { useState, useEffect } from 'react';
import './index.css';
import Swal from 'sweetalert2';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    Age: '',
    IsParent: '',
    PhoneNumber: '',
    ChoosenCourse: '',
    ChildName: '',
    ChildAge: '',
    Email: '',
  });
  const [courses, setCourses] = useState([]); // State to store courses
  const [submissionResponse, setSubmissionResponse] = useState(null); 
  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://localhost:7032/api/Course/GetAllAsSelectItem');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data); // Update the state with fetched courses
      } catch (error) {
        console.error('Error fetching courses:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load courses. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataObj = new FormData();
  
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }
  
      const response = await fetch('https://localhost:7032/api/RequstToRegister', {
        method: 'POST',
        body: formDataObj,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
  
        if (errorResponse.errors) {
          // Format validation errors
          const errorMessages = Object.entries(errorResponse.errors)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) {
                // Join messages if it's an array
                return `${field}: ${messages.join(', ')}`;
              } else {
                // Otherwise, assume it's a string or single message
                return `${field}: ${messages}`;
              }
            })
            .join('\n');
  
          throw new Error(`Validation errors:\n${errorMessages}`);
        }
  
        throw new Error('Failed to submit the request.');
      }
  
      const data = await response.json();
      setSubmissionResponse(data.message || 'Submission successful!');

      Swal.fire({
        title: 'Success!',
        text: 'Your request has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `An error occurred: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };
  

  return (
    <div>
     <div className="flex justify-center items-center mt-10">
        <div className="relative w-full max-w-2xl">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl blur-2xl opacity-30"></div>

          {/* Auth Card */}
          <div className="relative bg-gradient-to-bl from-gray-800 via-gray-900 to-gray-800 shadow-2xl rounded-3xl p-10">
            {/* Floating Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg floating">
                <span className="text-white text-4xl font-extrabold">A</span>
              </div>
            </div>

            {/* Welcome Message */}
            <h1 className="text-4xl font-bold text-center mb-4 tracking-wide">
              Welcome to <span className="text-purple-400">EduHub</span>
            </h1>
            <p className="text-center text-gray-300 text-lg mb-8">
              Login or create an account to explore the features we offer.
            </p>

            {/* Action Buttons */}
            <div className="space-y-6">
              <button
                id="loginButton"
                className="block w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold text-lg text-center py-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="block w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold text-lg text-center py-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                RequestToCourse
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Other UI components */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-header">Request a Course</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Age */}
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="Age"
                    value={formData.Age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    required
                  />
                </div>

                {/* IsParent */}
               {/* IsParent */}
        <div className="form-group">
          <label htmlFor="isParent">Are you a parent?</label>
          <select
            id="isParent"
            name="IsParent"
            value={formData.IsParent}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Conditional Fields for Parents */}
        {formData.IsParent === 'true' && (
          <>
            <div className="form-group">
              <label htmlFor="childName">Child's Name</label>
              <input
                type="text"
                id="childName"
                name="ChildName"
                value={formData.ChildName}
                onChange={handleInputChange}
                placeholder="Enter child's name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="childAge">Child's Age</label>
              <input
                type="number"
                id="childAge"
                name="ChildAge"
                value={formData.ChildAge}
                onChange={handleInputChange}
                placeholder="Enter child's age"
                required
              />
            </div>
          </>
        )}

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Chosen Course */}
                <div className="form-group">
                  <label htmlFor="chosenCourse">Chosen Course</label>
                  <select
                    id="chosenCourse"
                    name="ChoosenCourse"
                    value={formData.ChoosenCourse}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Section to display the server's response */}
      {submissionResponse && (
  <div className="response-section">
    <h3 className="response-title">Server Response</h3>
    <p className="response-message">{submissionResponse}</p>
  </div>
)}

    </div>
  );
};

export default Home;
