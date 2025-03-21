import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context';
import './login.css'

const LogIn = () => {
  const loginUserData = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post('http://localhost:7000/api/user/forgotPassword', { email });
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent!',
        text: 'An OTP has been sent to your email.',
      });
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to send OTP');
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await axios.post('http://localhost:7000/api/user/verifyOTP', { email, otp });
      Swal.fire({
        icon: 'success',
        title: 'OTP Verified!',
        text: 'Now you can reset your password.',
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to verify OTP');
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axios.post('http://localhost:7000/api/user/resetPassword', { email, newPassword, otp });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to reset password');
    }
  };

  const emailValue = async () => {
    const { value: email } = await Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your email address to receive OTP',
      inputPlaceholder: 'Enter your email',
      showCancelButton: true,
      confirmButtonText: 'Send OTP',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a valid email!';
        }
      },
    });
    return email
  }
  const otpValue = async () => {
    const { value: otp } = await Swal.fire({
      title: 'Verify OTP',
      input: 'text',
      inputLabel: 'Enter the OTP sent to your email',
      inputPlaceholder: 'Enter OTP',
      showCancelButton: true,
      confirmButtonText: 'Verify OTP',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter the OTP!';
        }
      },
    });
    return otp;
  }
  const resetPasswordValue = async () => {
    const { value: newPassword } = await Swal.fire({
      title: 'Reset Password',
      input: 'password',
      inputLabel: 'Enter your new password',
      inputPlaceholder: 'New Password',
      inputAttributes: {
        maxlength: 100,
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a password!';
        }
        if (value.length < 6) {
          return 'Password should be at least 6 characters long!';
        }
      },
    });
    return newPassword
  }
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:7000/api/user/login', data);
      console.log(response);
      if (!response.data.isSuccess) {
        Swal.fire({
          title: 'Wrong!',
          text: response.data.message,
          icon: 'error',
        });
        return;
      }
      const userId = response.data.userId;
      const token = response.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      console.log('Stored User ID:', userId);


      reset();

      Swal.fire({
        title: 'Success!',
        text: 'Login successful. Redirecting...',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        preConfirm: () => {
          Swal.showLoading();
          return new Promise((resolve) => {
            setTimeout(resolve, 1500);
          });
        },
      }).then(() => {
        loginUserData.setlogindata(response.data.isSuccess);
        navigate('/home');
      });
    } catch (error) {
      console.error('An error occurred:', error.response ? error.response.data : error.message);

      reset();

      Swal.fire({
        title: 'Error!',
        text: error.response ? error.response.data : 'An error occurred during login',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleForgotPassword = async () => {
    let email = await emailValue()
    if (email) {
      try {
        await forgotPassword(email);
        let otp = await otpValue()
        if (otp) {
          try {
            const verifyResponse = await verifyOTP(email, otp);
            console.log(verifyResponse);
            if (verifyResponse.isSuccess) {
              Swal.fire({
                icon: 'success',
                title: 'OTP Verified!',
                text: 'Now you can reset your password.',
              });


              let newPassword = await resetPasswordValue()
              if (newPassword) {
                const resetResponse = await resetPassword(email, otp, newPassword);

                if (resetResponse.isSuccess) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Password Reset!',
                    text: 'Your password has been successfully reset.',
                  });
                  navigate('/login');
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: resetResponse.message || 'Failed to reset the password. Please try again.',
                  });
                }
              }
            } else {
              handleOTPError(verifyResponse, email); // Pass email to handleOTPError
            }
          } catch (err) {
            console.error('OTP Verification Error:', err);
            Swal.fire({
              icon: 'error',
              title: 'OTP Verification Failed',
              text: 'An error occurred while verifying the OTP. Please try again.',
            });
          }
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while sending OTP. Please try again.',
        });
      }
    }
  };

  const handleOTPError = async (verifyResponse, email, otp, newPassword) => {
    if (verifyResponse.message === 'OTP is invalid please try again!') {
      const { isConfirmed } = await Swal.fire({
        title: 'OTP Expired!',
        text: 'Your OTP has expired. Would you like to generate a new one?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Generate New OTP',
        cancelButtonText: 'Cancel',
      });

      if (isConfirmed) {
        await forgotPassword(email); // Use the passed email to resend OTP
        Swal.fire({
          icon: 'success',
          title: 'New OTP Sent!',
          text: 'A new OTP has been sent to your email.',
        });
        await otpValue();
        await resetPasswordValue();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: 'The OTP you entered is incorrect. Please try again.',
      });
    }
  };

  return (
    <>
      <div className='register-container'>
        <div className='login-left'>
          <div>
            <h1 className='text-start mb-4' style={{ marginRight: "90px" }}>Welcome To ChaTech <br /> Sign Into Your Account</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-3 py-3 rounded-2 login_form p-3 '>
            <div>
              <label>Email:</label>
              <input placeholder="Email" name='email' {...register("email", { required: true })} className='w-100 mb-2 mt-1 border-0 p-3 rounded mb-3' />
              {errors.email && <span className="error">Email is required</span>}
            </div>
            <div className='d-flex justify-content-between '>
              <label>Password:</label>
              <p ><a href="#" onClick={handleForgotPassword} style={{ color: "#330000" }}>Forgot Password?</a></p>
            </div>

            <div className="password-field" style={{ position: "relative" }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name='password'
                {...register("password", { required: true })}
                className='w-100 mb-2 mt-1 border-0 rounded mb-3 p-3'
              />
              {errors.password && <span className="error">Password is required</span>}
            </div>

            <div>
              <button type="submit" className="register-btn mt-3">Login</button>
            </div>

            <div>
              <p className="login-link text-center mt-3">I don't have an account <a href="/register" style={{ color: "#330000" }}>Register</a></p>

            </div>
          </form>
        </div>

        <div className='login-right chat_bg' ></div>
      </div>

    </>
  );
};

export default LogIn;
