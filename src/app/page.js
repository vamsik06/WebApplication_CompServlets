"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showBoxes, setShowBoxes] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showInnerBox, setShowInnerBox] = useState(false);
  const [showWebApp, setShowWebApp] = useState(false);
  const [showRBoxes, setShowRBoxes] = useState(false);
  const [showBrowserBox, setShowBrowserBox] = useState(false);
  const [urlInput, setUrlInput] = useState("https://www./192.168.0.20:9090/");
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedRBox, setSelectedRBox] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [responseData, setResponseData] = useState("");

  const handleStart = () => {
    setShowBoxes(true);
    setShowLabels(false);
    setShowInnerBox(false);
    setShowWebApp(false);
    setShowRBoxes(false);
    setShowBrowserBox(false);
    setTimeout(() => setShowLabels(true), 800); // Delay for label fade-in
    setTimeout(() => setShowInnerBox(true), 1600); // Delay for Web Container box fade-in
    setTimeout(() => setShowWebApp(true), 2400); // Delay for Web App box fade-in
    setTimeout(() => setShowRBoxes(true), 3200); // Delay for R boxes fade-in
    setTimeout(() => setShowBrowserBox(true), 4000); // Delay for browser box fade-in
  };

  const handleGoClick = () => {
    const rMatch = urlInput.match(/r([1-6])/i);
    if (rMatch) {
      const rNumber = parseInt(rMatch[1]);
      setSelectedRBox(rNumber);
      setShowAnimation(true);
      setShowResponse(false);
      
      // Animate arrows in sequence
      setTimeout(() => {
        // Show response after all arrows complete
        setShowResponse(true);
        setResponseData(`Success! Response from R${rNumber}: Data received successfully.`);
      }, 3000);
    }
  };

  const getResponseContent = (rNumber) => {
    switch(rNumber) {
      case 1:
        return (
          <div className="text-xs text-gray-700 w-full px-2">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className="text-gray-600">{responseData}</div>
            </div>
            <div className="border-t pt-3">
              <div className="mb-2">
                <label className="block text-xs font-medium mb-1">Username:</label>
                <input type="text" className="w-full px-2 py-1 text-xs border border-gray-300 rounded" placeholder="Enter username" />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium mb-1">Password:</label>
                <input type="password" className="w-full px-2 py-1 text-xs border border-gray-300 rounded" placeholder="Enter password" />
              </div>
              <button className="w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-xs text-gray-700 w-full px-2">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className="text-gray-600">{responseData}</div>
            </div>
            <div className="border-t pt-3">
              <div className="mb-2">
                <label className="block text-xs font-medium mb-1">Full Name:</label>
                <input type="text" className="w-full px-2 py-1 text-xs border border-gray-300 rounded" placeholder="Enter full name" />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium mb-1">Email:</label>
                <input type="email" className="w-full px-2 py-1 text-xs border border-gray-300 rounded" placeholder="Enter email" />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium mb-1">Password:</label>
                <input type="password" className="w-full px-2 py-1 text-xs border border-gray-300 rounded" placeholder="Enter password" />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium mb-1">Confirm Password:</label>
                <input type="password" className="w-full px-2 py-1 text-xs border border-gray-300 rounded" placeholder="Confirm password" />
              </div>
              <button className="w-full bg-green-500 text-white text-xs py-1 rounded hover:bg-green-600">
                Register
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-xs text-gray-700 w-full px-2">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className="text-gray-600">{responseData}</div>
            </div>
            <div className="border-t pt-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Image</span>
                </div>
                <div className="text-gray-600 mb-2">Sample Image Display</div>
                <button className="bg-purple-500 text-white text-xs py-1 px-3 rounded hover:bg-purple-600">
                  View Full Size
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-xs text-gray-700 w-full px-2">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className="text-gray-600">{responseData}</div>
            </div>
            <div className="border-t pt-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-600 text-xs">📊</span>
                </div>
                <div className="text-gray-600 mb-2">Data Analytics Dashboard</div>
                <div className="text-xs text-gray-500">Charts and metrics</div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-xs text-gray-700 w-full px-2">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className="text-gray-600">{responseData}</div>
            </div>
            <div className="border-t pt-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-yellow-600 text-xs">⚙️</span>
                </div>
                <div className="text-gray-600 mb-2">Settings Panel</div>
                <div className="text-xs text-gray-500">Configuration options</div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="text-xs text-gray-700 w-full px-2">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className="text-gray-600">{responseData}</div>
            </div>
            <div className="border-t pt-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-red-600 text-xs">❌</span>
                </div>
                <div className="text-gray-600 mb-2">Error Page</div>
                <div className="text-xs text-gray-500">Something went wrong</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleReset = () => {
    setShowBoxes(false);
    setShowLabels(false);
    setShowInnerBox(false);
    setShowWebApp(false);
    setShowRBoxes(false);
    setShowBrowserBox(false);
    setUrlInput("https://www./192.168.0.20:9090/");
    setShowAnimation(false);
    setSelectedRBox(null);
    setShowResponse(false);
    setResponseData("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 border-4 border-gray-400 rounded-xl shadow-lg mx-4 sm:mx-6 md:mx-8 gap-2">
      {/* Buttons at the top */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 w-full">
        <Button
          onClick={handleStart}
          className="text-sm sm:text-base"
        >
          Start
        </Button>
        <Button
          onClick={handleReset}
          variant="secondary"
          className="text-sm sm:text-base"
        >
          Reset
        </Button>
      </div>
      {/* Animated Boxes Section - Always Side by Side */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 mt-4 sm:mt-6 md:mt-8 w-full max-w-6xl relative">
                  {/* Animated Flow Lines */}
          {showAnimation && selectedRBox && (
            <svg className="absolute inset-0 pointer-events-none w-full h-full" viewBox="0 0 100 100" style={{ zIndex: 50 }}>
            {/* Step 1: Go Button to Internet (Request) */}
            <path 
              d="M 42 40 C 44 42, 46 44, 45 50" 
              stroke="#3B82F6" strokeWidth="2" fill="none" 
              className="animate-pulse"
            />
        
            {/* Step 2: Internet to Server R box (Request) */}
            <path 
              d="M 45 50 C 50 50, 60 50, 75 50" 
              stroke="#3B82F6" strokeWidth="2" fill="none" 
              className="animate-pulse"
            />
        
            {/* Step 3: R box back to Internet (Response) */}
            <path 
              d="M 75 50 C 60 50, 50 50, 45 50" 
              stroke="#10B981" strokeWidth="2" fill="none" 
              className="animate-pulse"
            />
        
            {/* Step 4: Internet to Response Box (Final Response) */}
            <path 
              d="M 45 50 C 40 47, 35 45, 30 45" 
              stroke="#10B981" strokeWidth="2" fill="none" 
              className="animate-pulse"
            />
        </svg>
        )}

                {/* Left Box */}
        <div className="relative flex flex-col items-center">
          {/* Top Label */}
          <div className={`absolute -top-6 sm:-top-12 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 ${showLabels ? 'opacity-100' : 'opacity-0'}`}>web Client</div>
          {/* Box */}
          <div className={`w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] border-4 border-black rounded-lg shadow-lg transition-opacity duration-700 relative ${showBoxes ? 'opacity-100' : 'opacity-0'}`}>
            {/* Browser Box as nested container */}
            {showBrowserBox && (
              <div className="absolute inset-4 bg-gray-800 rounded-lg">
                {/* Window Controls */}
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                {/* Window Title */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-medium text-white">web Client browser</div>
                {/* App Icons */}

                                  {/* Navigation Bar */}
                  <div className="absolute top-8 left-2 right-2 h-6 bg-gray-700 rounded flex items-center px-2">
                    {/* URL Input Field */}
                    <input 
                      type="text" 
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 bg-white rounded px-2 py-1 text-xs text-gray-700 outline-none"
                      placeholder="Enter r1-r6..."
                    />
                    {/* Go Button */}
                    <button 
                      onClick={handleGoClick}
                      className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600 cursor-pointer"
                    >
                      Go
                    </button>
                  </div>
                {/* Client Browser Label */}
                <div className="absolute top-16 left-2 text-xs text-gray-300">Response</div>
                                  {/* Response Area */}
                  <div className="absolute top-20 left-2 right-2 bottom-2 bg-white rounded">
                    <div className="absolute top-2 left-2 text-xs font-bold text-gray-700">Response</div>
                    <div className="absolute inset-2 bg-gray-100 rounded flex flex-col items-center justify-center">
                      {showResponse ? getResponseContent(selectedRBox) : (
                        <>
                          <div className="w-8 h-8 bg-blue-500 rounded-full mb-2"></div>
                          <div className="text-xs text-gray-500 text-center">
                            <div>Enter r1-r6 and click "Go" to see the response</div>
                            <div>Your web client is ready to browse!</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
              </div>
            )}
          </div>
          {/* Bottom Label */}
          <div className={`absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 ${showLabels ? 'opacity-100' : 'opacity-0'}`}>Client</div>
        </div>
        {/* Small Box in Gap */}
        <div className="relative flex flex-col items-center">
          {/* Box */}
          <div className={`w-16 h-32 sm:w-18 sm:h-20 md:w-24 md:h-48 lg:w-18 lg:h-20 border-4 border-black rounded-lg shadow-lg transition-opacity duration-700 relative ${showBoxes ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-medium text-black">Internet</span>
            </div>
          </div>
        </div>
        {/* Right Box */}
        <div className="relative flex flex-col items-center">
          {/* Top Label */}
          <div className={`absolute -top-6 sm:-top-12 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 text-center ${showLabels ? 'opacity-100' : 'opacity-0'}`}>Web Server<br/>(9090:Tomcat)</div>
          {/* Box */}
          <div className={`w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] border-4 border-black rounded-lg shadow-lg transition-opacity duration-700 relative ${showBoxes ? 'opacity-100' : 'opacity-0'}`}>
            {/* Web Container Box */}
            <div className={`absolute inset-x-8 inset-y-10 border-4 border-black rounded-lg transition-opacity duration-700 bg-white z-10 ${showInnerBox ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute -top-7 left-4 text-xs sm:text-sm font-medium text-black bg-white px-1">Web Container</div>
              {/* Web App Box */}
              <div className={`absolute inset-x-8 inset-y-10 border-4 border-black rounded-lg transition-opacity duration-700 bg-white z-20 ${showWebApp ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute -top-6 left-4 text-xs sm:text-sm font-medium text-black bg-white px-1">Web App</div>
                {/* R1-R6 Boxes Grid */}
                <div className={`absolute inset-x-4 inset-y-8 grid grid-cols-3 gap-2 transition-opacity duration-700 ${showRBoxes ? 'opacity-100' : 'opacity-0'}`}>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div 
                      key={num} 
                      className={`border-2 border-black rounded flex items-center justify-center text-xs font-medium transition-all duration-500 ${
                        selectedRBox === num && showAnimation 
                          ? 'bg-yellow-300 border-yellow-500 shadow-lg scale-110' 
                          : 'bg-white'
                      }`}
                    >
                      R{num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Label */}
          <div className={`absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 ${showLabels ? 'opacity-100' : 'opacity-0'}`}>Server(192.168.0.20)</div>
        </div>
      </div>
    </div>
  );
}
