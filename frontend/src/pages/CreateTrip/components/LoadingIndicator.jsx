import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTruck, faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LoadingIndicator = ({ isLoading, message = "Processing your request..." }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) return;
    
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, navigate]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 animate-fadeIn">
      <div className=" p-8  flex flex-col items-center max-w-md mx-4 ">
        <div className="relative mb-6">
          <div className="animate-bounce w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <FontAwesomeIcon icon={faTruck} className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
            <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <FontAwesomeIcon 
            icon={faSpinner} 
            className="animate-spin h-8 w-8 text-blue-600 mr-4" 
          />
          <span className="text-xl font-semibold text-gray-800">{message}</span>
        </div>
        
        <div className="flex items-center justify-center bg-blue-50 px-4 py-2 rounded-full mb-4">
          <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-lg font-medium text-blue-800">
            Redirecting in {secondsRemaining} seconds
          </span>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-2 mt-2 mb-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear" 
            style={{ width: `${(30 - secondsRemaining) * (100/30)}%` }}
          ></div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Please wait while we process your information...</p>
          <p className="mt-1">You will be automatically redirected when complete.</p>
        </div>
        
        <div className="flex space-x-2 mt-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="w-2 h-2 bg-blue-400 rounded-full animate-ping"
              style={{ animationDelay: `${item * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;