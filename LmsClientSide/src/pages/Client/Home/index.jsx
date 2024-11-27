import React, { useState, useEffect } from 'react';
import './index.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
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
  <div className="hero">
    <div className="hero-content">
    
      <h1 className="hero-title">
        Welcome to <span className="highlight">EduHub</span>
      </h1>
      <p className="hero-subtitle">
        Login or create an account to explore the features we offer.
      </p>
      <div className="cta-buttons">
        <button id="loginButton" className="btn-primary">Login</button>
        <button onClick={() => setIsModalOpen(true)} className="btn-secondary">
          Request a Course
        </button>
      </div>
    </div>
  </div>

  {isModalOpen && (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Request a Course</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-body">
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
                    min={15}
                    max={18}
                    placeholder="Enter child's age"
                    required
                  />
                </div>
              </>
            )}
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
            <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  {submissionResponse && (
    <div className="response-section">
      <h3 className="response-title">Server Response</h3>
      <p className="response-message">{submissionResponse}</p>
    </div>
  )}
  <section className="features">
  <h2 className="section-title">Why Choose <span className="highlight">EduHub</span>?</h2>
  <p className="section-description">
    Unlock endless possibilities with our platform! Here's what sets us apart.
  </p>
  <div className="feature-list">
    <div className="feature-card">
      <div className="icon-wrapper">
      <FontAwesomeIcon icon={faBook} className="feature-icon" />
      </div>
      <h3>Comprehensive Courses</h3>
      <p>Access a wide range of subjects with expert guidance and tailored content.</p>
      <button className="learn-more">Learn More</button>
    </div>
    <div className="feature-card">
      <div className="icon-wrapper">
      <FontAwesomeIcon icon={faUsers} className="feature-icon" />
      </div>
      <h3>Interactive Community</h3>
      <p>Join a vibrant community of learners and educators to grow together.</p>
      <button className="learn-more">Learn More</button>
    </div>
    <div className="feature-card">
      <div className="icon-wrapper">
      <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
      </div>
      <h3>Track Your Progress</h3>
      <p>Analyze your learning journey with real-time progress tracking tools.</p>
      <button className="learn-more">Learn More</button>
    </div>
  </div>
</section>

</div>

  );
};

export default Home;
