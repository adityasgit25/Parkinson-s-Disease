// SuccessAnimation.js
import React from 'react';
import { useEffect } from 'react';

const SuccessAnimation = ({ onAnimationEnd }) => {
  useEffect(() => {
    // Call the onAnimationEnd function after 1 second
    const timer = setTimeout(onAnimationEnd, 1500); // Wait longer for better effect
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
        <div className="text-green-600 text-5xl mb-4">✔️</div>
        <div className="text-gray-800 text-xl font-semibold">Sign In Successful!</div>
        <style>{`
          .fade-in {
            animation: fadeIn 1s ease;
          }
          .fade-out {
            animation: fadeOut 1s ease forwards;
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default SuccessAnimation;
