import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-400/20 rounded-full"></div>
          
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-white text-3xl" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-white mb-2">404</h1>
            <p className="text-blue-100 font-medium">Page Not Found</p>
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Lost in Space?</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for seems to have drifted off into the cosmos. 
            Don't worry, we can help you get back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaHome className="mr-2" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>

          <div className="mt-10 flex justify-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 py-4 px-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact support
            </a>
          </p>
        </div>
      </div>

      <div className="fixed bottom-10 left-10 w-6 h-6 bg-blue-400/30 rounded-full animate-float"></div>
      <div className="fixed top-20 right-16 w-8 h-8 bg-amber-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="fixed top-1/3 left-1/4 w-4 h-4 bg-indigo-400/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          .animate-float {
            animation: float 8s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}