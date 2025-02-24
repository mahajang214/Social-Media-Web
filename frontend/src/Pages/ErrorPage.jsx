import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const ErrorPage = () => {

  useEffect(() => {
    // GSAP animation for page elements
    gsap.from('.error-title', {
      duration: 1.5,
      opacity: 0,
      y: -50,
      ease: 'power3.out',
    });

    gsap.from('.error-message', {
      duration: 1.5,
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      delay: 0.5,
    });

    gsap.from('.btn', {
      duration: 1.5,
      opacity: 0,
      scale: 0.5,
      ease: 'back.out(1.7)',
      delay: 1,
    });
    gsap.to('.btn', {
        duration: 1.5,
        opacity: 1,
        scale:1,
        ease: 'back.out(1.7)',
        delay: 1,
      });

  }, []);

  const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="error-title text-6xl font-extrabold mb-4 text-red-500">
          404 - Page Not Found
        </h1>
        <p className="error-message text-lg mb-6">
          Oops! Looks like you've encountered an error. But don't worry, you can get back on track.
        </p>
        <div className="space-x-4">
          <button
            className="btn bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
          <button
            className="btn bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition duration-300"
            onClick={() => navigate('/register')}
          >
            Go to Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
