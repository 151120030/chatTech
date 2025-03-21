import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import logo from '../../images/chat_logo.png';
import './register.css'
const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    console.log(file); // Log the file to ensure it's set correctly
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('fullname', data.fullname);
      formData.append('Username', data.Username);
      formData.append('email', data.email);
      formData.append('password', data.password);

      // Append the profile picture if it's selected
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      } else {
        formData.append('profilePicture', null); // Or skip it if optional in the backend
      }

      // Send POST request to the backend for registration
      const response = await axios.post('http://localhost:7000/api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      reset();

      // Show success alert with a loading spinner when clicking OK
      Swal.fire({
        title: 'Success!',
        text: 'Registration successful. Redirecting to login...',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        preConfirm: () => {
          Swal.showLoading();
          return new Promise((resolve) => {
            setTimeout(resolve, 1500);
          });
        }
      }).then(() => {
        navigate('/login');
      });

    } catch (error) {
      console.error("An error occurred:", error.response ? error.response.data : error.message);
      reset();

      Swal.fire({
        title: 'Error!',
        text: error.response ? error.response.data : 'An error occurred during registration',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-left">
          
          <img src={logo} alt="Chatech Logo"  width="200px"/>
          <h1>Welcome to ChaTech</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quos sequi inventore non et facere 
            provident incidunt asperiores quae nihil deserunt, veritatis voluptatibus perspiciatis harum dolorem temporibus 
            commodi ut, officia nesciunt aspernatur? Quam, odio soluta nulla iste ullam commodi voluptas accusamus quia illo possimus
          </p>
        </div>

        <div className="register-right">
          <form onSubmit={handleSubmit(onSubmit)} className='py-3 rounded-2 register_form p-3 mt-4'>
            <h2 className='text-center'>Register To ChaTech</h2>

            <div>
              <label htmlFor="fullname">FullName</label>
              <input
                id="fullname"
                placeholder="Name"
                name='fullname'
                {...register("fullname", { required: true })}
                className='w-100 mb-2 p-3 mt-1 border-0 rounded mb-3'
              />
              {errors.fullname && <span className="error">Name is required</span>}
            </div>

            <div>
              <label htmlFor="Username">UserName</label>
              <input
                id="Username"
                placeholder="UserName"
                name='Username'
                {...register("Username", { required: true })}
                className='w-100 mb-2 p-3 mt-1 border-0 rounded mb-3'
              />
              {errors.Username && <span className="error">Username is required</span>}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="Email"
                name='email'
                {...register("email", { required: true })}
                className='w-100 mb-2 mt-1 border-0 p-3 rounded mb-3'
              />
              {errors.email && <span className="error">Email is required</span>}
            </div>

            <div className="password-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name='password'
                {...register("password", { required: true })}
                className='w-100 mb-2 mt-1 border-0 rounded mb-3 p-3'
              />
              {errors.password && <span className="error">Password is required</span>}
            </div>

            {/* Profile Picture Field */}
            <div>
              <input
                id="profilePicture"
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-100 mb-2 p-3 mt-1 border-0 rounded mb-3"
              />
            </div>

            <div>
              <button type="submit" className="register-btn mt-3">Register</button>
            </div>

            <div>
              <p className="login-link text-center mt-3">I have an account <a href="/login" style={{ color: "#330000" }}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
