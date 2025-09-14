import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaUserTie, FaChevronRight, FaMapMarkedAlt, FaChartLine, FaCogs, FaShieldAlt, FaCrown } from "react-icons/fa";
import driverImg from "../assets/driver.jpg"; 
import managerImg from "../assets/manger.jpg"; 
import logisticsBg from "../assets/truk.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleSelect = (selectedRole) => {
    setIsExiting(true);
    setRole(selectedRole);
    
    setTimeout(() => {
      if (selectedRole === "manager") {
        navigate("/manager"); 
      } else if (selectedRole === "driver") {
        navigate("/driver/trips/create"); 
      }
    }, 600);
  };

  const features = [
    { icon: <FaMapMarkedAlt className="text-blue-500 text-xl" />, text: "Real-time GPS Tracking" },
    { icon: <FaChartLine className="text-blue-500 text-xl" />, text: "Advanced Analytics" },
    { icon: <FaCogs className="text-blue-500 text-xl" />, text: "Fleet Optimization" },
    { icon: <FaShieldAlt className="text-blue-500 text-xl" />, text: "Safety Compliance" },
  ];

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-navy-900 p-4 overflow-hidden relative"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 35, 64, 0.85), rgba(8, 27, 51, 0.9)), url(${logisticsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-blue-600/10 opacity-15 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 5}s`
            }}
          />
        ))}
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400 animate-particle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 15 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-sparkle"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
              animationDelay: `${i * 3}s`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full filter blur-[2px]"></div>
          </div>
        ))}
      </div>

      <div className={`w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 text-center transform transition-all duration-500 ${isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'} relative z-10 border border-gray-200`}>
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition duration-1000 blur-md animate-border-pulse"></div>
        
        <div className="mb-6 flex flex-col items-center relative">
          <div className="flex items-center justify-center mb-3">
            <div className="relative mr-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg ring-2 ring-blue-400/30">
                <FaTruck className="text-white text-2xl transform -rotate-12" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center shadow-md ring-1 ring-blue-400/40">
                <FaCrown className="text-amber-400 text-xs" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-black tracking-tight">
              TruckLog
            </h1>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 mx-auto mb-3 rounded-full"></div>
          
          <p className="mb-5 text-sm text-gray-700 max-w-2xl mx-auto leading-tight font-light">
            Enterprise-grade logistics optimization platform for maximizing fleet efficiency and operational excellence
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 font-display">Access Your Professional Portal</h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div 
              className={`flex-1 transition-all duration-300 ${hoveredRole === 'driver' ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}`}
              onMouseEnter={() => setHoveredRole('manager')}
              onMouseLeave={() => setHoveredRole(null)}
            >
              <button
                onClick={() => handleSelect("manager")}
                className="group relative overflow-hidden bg-white text-gray-800 w-full h-80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center p-4 border border-gray-200"
              >
                <span className="absolute inset-0 w-0 bg-blue-100 transition-all duration-700 group-hover:w-full"></span>
                
                <div className="relative w-full h-40 rounded-lg mb-3 transition-all duration-300 overflow-hidden border border-gray-200 shadow-md">
                  <img 
                    src={managerImg} 
                    alt="Manager" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent rounded-lg flex items-center justify-center">
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs py-1 px-2 rounded-md font-medium">
                      Executive Access
                    </div>
                    <FaUserTie className="text-2xl relative z-10 text-white bg-blue-600/80 p-2 rounded-full border border-white/30" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-1 z-10 text-gray-800">Management Console</h3>
                <p className="text-gray-600 text-xs mb-3 z-10">Strategic oversight & analytics</p>
                
                <div className="flex items-center justify-center mt-1 z-10 transform group-hover:translate-x-1 transition-transform duration-300 bg-blue-600 text-white py-1 px-3 rounded-full">
                  <span className="text-xs font-medium mr-1">Enter Dashboard</span>
                  <FaChevronRight className="text-xs transform group-hover:translate-x-1 transition-transform" />
                </div>
                
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-700"></div>
              </button>
            </div>

            <div 
              className={`flex-1 transition-all duration-300 ${hoveredRole === 'manager' ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}`}
              onMouseEnter={() => setHoveredRole('driver')}
              onMouseLeave={() => setHoveredRole(null)}
            >
              <button
                onClick={() => handleSelect("driver")}
                className="group relative overflow-hidden bg-white text-gray-800 w-full h-80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center p-4 border border-gray-200"
              >
                <span className="absolute inset-0 w-0 bg-blue-100 transition-all duration-700 group-hover:w-full"></span>
                
                <div className="relative w-full h-40 rounded-lg mb-3 transition-all duration-300 overflow-hidden border border-gray-200 shadow-md">
                  <img 
                    src={driverImg} 
                    alt="Driver" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent rounded-lg flex items-center justify-center">
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs py-1 px-2 rounded-md font-medium">
                      Field Operations
                    </div>
                    <FaTruck className="text-2xl relative z-10 text-white bg-blue-600/80 p-2 rounded-full border border-white/30" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-1 z-10 text-gray-800">Driver Interface</h3>
                <p className="text-gray-600 text-xs mb-3 z-10">Route execution & logistics</p>
                
                <div className="flex items-center justify-center mt-1 z-10 transform group-hover:translate-x-1 transition-transform duration-300 bg-blue-600 text-white py-1 px-3 rounded-full">
                  <span className="text-xs font-medium mr-1">Begin Journey</span>
                  <FaChevronRight className="text-xs transform group-hover:translate-x-1 transition-transform" />
                </div>
                
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 font-display">Enterprise Capabilities</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md group border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:bg-blue-200 group-hover:animate-pulse ring-1 ring-blue-100">
                  {feature.icon}
                </div>
                <p className="text-xs text-gray-800 font-medium text-center leading-tight">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {role && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg animate-pulse border border-blue-200">
            <p className="text-blue-700 text-xs font-medium">
              Initializing {role} portal access...
            </p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-6 left-6 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-bounce-slow"></div>
      <div className="absolute top-10 right-6 w-12 h-12 bg-blue-300 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-blue-200 rounded-full opacity-40 animate-float"></div>
      
      <p className="text-xs text-white/90 absolute bottom-4 text-center px-4 backdrop-blur-sm bg-blue-900/70 py-1.5 rounded-full border border-blue-700/30">
        Premium logistics solutions • ISO 9001 certified • Trusted by industry leaders
      </p>
      
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          @keyframes particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(20vw); opacity: 0; }
          }
          @keyframes sparkle {
            0% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
            100% { opacity: 0; transform: scale(0) rotate(360deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes border-pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
          }
          .animate-float {
            animation: float 8s infinite ease-in-out;
          }
          .animate-particle {
            animation: particle linear infinite;
          }
          .animate-sparkle {
            animation: sparkle 4s infinite ease-in-out;
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s infinite ease-in-out;
          }
          .animate-bounce-slow {
            animation: bounce-slow 6s infinite ease-in-out;
          }
          .animate-border-pulse {
            animation: border-pulse 3s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}