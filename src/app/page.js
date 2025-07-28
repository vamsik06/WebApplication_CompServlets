"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useDarkMode } from "./context/DarkModeContext"

// Sun and Moon Icons
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

// Helper function to get coordinates for R-boxes
const getRBoxCoords = (rNumber) => {
  // These coordinates are relative to the SVG's 0-100 viewBox
  // They approximate the center of each R-box within the grid
  switch (rNumber) {
    case 1:
      return { x: 70, y: 40 } // Adjusted for visual alignment
    case 2:
      return { x: 80, y: 40 }
    case 3:
      return { x: 90, y: 40 }
    case 4:
      return { x: 70, y: 60 }
    case 5:
      return { x: 80, y: 60 }
    case 6:
      return { x: 90, y: 60 }
    default:
      return { x: 0, y: 0 } // Fallback
  }
}

export default function Home() {
  const [showBoxes, setShowBoxes] = useState(false)
  const [showLabels, setShowLabels] = useState(false)
  const [showInnerBox, setShowInnerBox] = useState(false)
  const [showWebApp, setShowWebApp] = useState(false)
  const [showRBoxes, setShowRBoxes] = useState(false)
  const [showBrowserBox, setShowBrowserBox] = useState(false)
  const [urlInput, setUrlInput] = useState("https://www./192.168.0.20:9090/")
  const [showAnimation, setShowAnimation] = useState(false)
  const [selectedRBox, setSelectedRBox] = useState(null)
  const [showResponse, setShowResponse] = useState(false)
  const [responseData, setResponseData] = useState("")
  const [animationStep, setAnimationStep] = useState(0) // 0: none, 1: path1, 2: path2, 3: path3, 4: path4
  const [showRequestLabel, setShowRequestLabel] = useState(false)
  const [showResponseLabel, setShowResponseLabel] = useState(false)
  const [typedUrl, setTypedUrl] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showResetMessage, setShowResetMessage] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  // Refs for SVG paths to get their lengths
  const path1Ref = useRef(null)
  const path2Ref = useRef(null)
  const path3Ref = useRef(null)
  const path4Ref = useRef(null)

  // State to store path lengths for stroke-dasharray animation
  const [pathLengths, setPathLengths] = useState({ p1: 0, p2: 0, p3: 0, p4: 0 })

  // Define fixed R3 coordinates for the animation path
  const r3Coords = getRBoxCoords(3)

  // Calculate path lengths once components are mounted or dependencies change
  useEffect(() => {
    if (path1Ref.current && path2Ref.current && path3Ref.current && path4Ref.current) {
      setPathLengths({
        p1: path1Ref.current.getTotalLength(),
        p2: path2Ref.current.getTotalLength(),
        p3: path3Ref.current.getTotalLength(),
        p4: path4Ref.current.getTotalLength(),
      })
    }
  }, [showAnimation, selectedRBox]) // Recalculate if animation starts or RBox changes

  // Typing animation effect
  useEffect(() => {
    if (showBrowserBox && !isTyping) {
      setIsTyping(true)
      setTypedUrl("")
      let currentIndex = 0
      const fullUrl = "https://www./192.168.0.20:9090/"
      
      const typeInterval = setInterval(() => {
        if (currentIndex < fullUrl.length) {
          setTypedUrl(fullUrl.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
        }
      }, 100) // Type each character every 100ms
      
      return () => clearInterval(typeInterval)
    }
  }, [showBrowserBox])

  // Auto-scroll to end of URL input when typing
  useEffect(() => {
    if (isTyping && typedUrl) {
      const urlInput = document.querySelector('input[type="text"]')
      if (urlInput) {
        urlInput.scrollLeft = urlInput.scrollWidth
      }
    }
  }, [typedUrl, isTyping])

  const handleStart = () => {
    setShowResetMessage(false)
    setShowBoxes(true)
    setShowLabels(false)
    setShowInnerBox(false)
    setShowWebApp(false)
    setShowRBoxes(false)
    setShowBrowserBox(false)
    setTimeout(() => setShowLabels(true), 800) // Delay for label fade-in
    setTimeout(() => setShowInnerBox(true), 1600) // Delay for Web Container box fade-in
    setTimeout(() => setShowWebApp(true), 2400) // Delay for Web App box fade-in
    setTimeout(() => setShowRBoxes(true), 3200) // Delay for R boxes fade-in
    setTimeout(() => setShowBrowserBox(true), 4000) // Delay for browser box fade-in
  }

  const handleGoClick = () => {
    const rMatch = urlInput.match(/r([1-6])(?:\D|$)/i)
    if (rMatch && rMatch[1] >= 1 && rMatch[1] <= 6) {
      const rNumber = Number.parseInt(rMatch[1])
      setSelectedRBox(rNumber) // Still highlight the actual R-box
      setShowAnimation(true) // Keep SVG container visible for the whole sequence
      setShowResponse(false)
      setAnimationStep(0) // Reset animation step

      const stepDuration = 750 // Duration for each step's drawing animation

      // Step 1: Go Button to Internet (Request)
      setTimeout(() => {
        setAnimationStep(1)
      }, 100)

      // Step 2: Internet to R-box (Request)
      setTimeout(() => {
        setAnimationStep(2)
      }, 100 + stepDuration)

      // Step 3: R-box back to Internet (Response)
      setTimeout(
        () => {
          setAnimationStep(3)
        },
        100 + 2 * stepDuration,
      )

      // Step 4: Internet to Response Box (Final Response) - Show response after line completes
      setTimeout(
        () => {
          setAnimationStep(4)
          // Show response immediately after the line reaches the response box
          setTimeout(() => {
            setShowResponse(true)
            setResponseData(`Success! Response from R${rNumber}: Data received successfully.`)
          }, 700) // Wait for the line animation to complete
        },
        100 + 3 * stepDuration,
      )

      // Final step: Reset animation states but keep response visible
      setTimeout(
        () => {
          setAnimationStep(0) // Hide all paths by resetting dashoffset
          setShowAnimation(false) // Hide SVG container
          // Keep selectedRBox highlighted and response visible
        },
        100 + 4 * stepDuration + 700, // Wait for line animation + response display
      )
    } else {
      // Show error message for invalid input
      setShowResponse(true)
      setResponseData("Please enter from r1 to r6")
      setSelectedRBox(null)
      setShowAnimation(false)
    }
  }

  const getResponseContent = (rNumber) => {
    const textColor = isDarkMode ? 'text-white' : 'text-gray-700'
    const labelColor = isDarkMode ? 'text-white' : 'text-gray-700'
    const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300'
    const inputBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white'
    const inputTextColor = isDarkMode ? 'text-white' : 'text-gray-700'
    switch (rNumber) {
      case 1:
        return (
          <div className={`text-xs ${textColor} w-full px-2`}>
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{responseData}</div>
            </div>
            <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} pt-3`}>
              <div className="mb-2">
                <label className={`block text-xs font-medium mb-1 ${labelColor}`}>Username:</label>
                <input
                  type="text"
                  className={`w-full px-2 py-1 text-xs border rounded ${borderColor} ${inputBgColor} ${inputTextColor}`}
                  placeholder="Enter username"
                />
              </div>
              <div className="mb-3">
                <label className={`block text-xs font-medium mb-1 ${labelColor}`}>Password:</label>
                <input
                  type="password"
                  className={`w-full px-2 py-1 text-xs border rounded ${borderColor} ${inputBgColor} ${inputTextColor}`}
                  placeholder="Enter password"
                />
              </div>
              <button className="w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600">Submit</button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className={`text-xs ${textColor} w-full px-2`}>
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{responseData}</div>
            </div>
            <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} pt-3`}>
              <div className="mb-2">
                <label className={`block text-xs font-medium mb-1 ${labelColor}`}>Full Name:</label>
                <input
                  type="text"
                  className={`w-full px-2 py-1 text-xs border rounded ${borderColor} ${inputBgColor} ${inputTextColor}`}
                  placeholder="Enter full name"
                />
              </div>
              <div className="mb-2">
                <label className={`block text-xs font-medium mb-1 ${labelColor}`}>Email:</label>
                <input
                  type="email"
                  className={`w-full px-2 py-1 text-xs border rounded ${borderColor} ${inputBgColor} ${inputTextColor}`}
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-2">
                <label className={`block text-xs font-medium mb-1 ${labelColor}`}>Password:</label>
                <input
                  type="password"
                  className={`w-full px-2 py-1 text-xs border rounded ${borderColor} ${inputBgColor} ${inputTextColor}`}
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-3">
                <label className={`block text-xs font-medium mb-1 ${labelColor}`}>Confirm Password:</label>
                <input
                  type="password"
                  className={`w-full px-2 py-1 text-xs border rounded ${borderColor} ${inputBgColor} ${inputTextColor}`}
                  placeholder="Confirm password"
                />
              </div>
              <button className="w-full bg-green-500 text-white text-xs py-1 rounded hover:bg-green-600">
                Register
              </button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className={`text-xs ${textColor} w-full px-2`}>
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{responseData}</div>
            </div>
            <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} pt-3`}>
              <div className="text-center">
                <div className={`w-16 h-16 rounded mx-auto mb-2 flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Image</span>
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Sample Image Display</div>
                <button className="bg-purple-500 text-white text-xs py-1 px-3 rounded hover:bg-purple-600">
                  View Full Size
                </button>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className={`text-xs ${textColor} w-full px-2`}>
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{responseData}</div>
            </div>
            <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} pt-3`}>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-600 text-xs">📊</span>
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Data Analytics Dashboard</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Charts and metrics</div>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className={`text-xs ${textColor} w-full px-2`}>
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{responseData}</div>
            </div>
            <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} pt-3`}>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-yellow-600 text-xs">⚙️</span>
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Settings Panel</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Configuration options</div>
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className={`text-xs ${textColor} w-full px-2`}>
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto"></div>
              <div className="font-medium mb-1">Success!</div>
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{responseData}</div>
            </div>
            <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} pt-3`}>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-yellow-800 text-xs">🛒</span>
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Flipkart Store</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Online Shopping</div>
                <div className="mt-2">
                  <button className="bg-yellow-500 text-white text-xs py-1 px-3 rounded hover:bg-yellow-600">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleReset = () => {
    setShowBoxes(false)
    setShowLabels(false)
    setShowInnerBox(false)
    setShowWebApp(false)
    setShowRBoxes(false)
    setShowBrowserBox(false)
    setUrlInput("https://www./192.168.0.20:9090/")
    setShowAnimation(false)
    setSelectedRBox(null)
    setShowResponse(false)
    setResponseData("")
    setAnimationStep(0) // Reset animation step on reset
    setShowResetMessage(true)
    // setShowRequestLabel(false)
    // setShowResponseLabel(false)
  }



  return (
    <div className={`max-h-[700px] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 border-4 rounded-xl shadow-lg mx-4 sm:mx-6 md:mx-8 gap-2 transition-colors duration-300 ${
      isDarkMode 
        ? 'border-white' 
        : 'border-black'
    }`}>
      {/* Buttons at the top */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 w-full">
        <Button onClick={handleStart} className="text-sm sm:text-base">
          Start
        </Button>
        <Button onClick={handleReset} variant="secondary" className="text-sm sm:text-base">
          Reset
        </Button>
        <Button 
          onClick={toggleDarkMode} 
          variant="outline" 
          className="text-sm sm:text-base"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* Reset Message */}
      {showResetMessage && (
        <div className={`text-center mb-4 px-4 py-2 rounded-lg transition-opacity duration-500 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
        }`}>
          <div className="text-sm font-medium">Click "Start" to begin the animation</div>
        </div>
      )}

      {/* Animated Boxes Section - Always Side by Side */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 mt-4 sm:mt-6 md:mt-8 w-full max-w-6xl relative">
        {/* Animated Flow Lines */}
        {showAnimation && (
          <svg
            className={`absolute inset-0 pointer-events-none w-full h-full ${isDarkMode ? 'text-white' : 'text-black'}`}
            viewBox="0 0 100 100"
            style={{ zIndex: 50 }}
          >
            {/* Step 1: Go Button to Internet (Request) */}
            <path
              ref={path1Ref}
              d="M 20 15 C 35 25, 40 35, 45 45" // Smoother curve to Internet
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              style={{
                strokeDasharray: pathLengths.p1,
                strokeDashoffset: animationStep >= 1 ? 0 : pathLengths.p1,
                transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {/* Step 2: Internet to Web App (Request) */}
            <path
              ref={path2Ref}
              d={`M 45 45 C 55 45, 65 45, ${r3Coords.x} ${r3Coords.y}`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              style={{
                strokeDasharray: pathLengths.p2,
                strokeDashoffset: animationStep >= 2 ? 0 : pathLengths.p2,
                transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {/* Step 3: Web App to Internet (Response) */}
            <path
              ref={path3Ref}
              d={`M ${r3Coords.x} ${r3Coords.y} C 70 50, 60 50, 50 50`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              style={{
                strokeDasharray: pathLengths.p3,
                strokeDashoffset: animationStep >= 3 ? 0 : pathLengths.p3,
                transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {/* Step 4: Internet to Web Client (Response) */}
            <path
              ref={path4Ref}
              d="M 50 50 C 45 47, 40 45, 20 45" // Curve from Internet to Web Client
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              style={{
                strokeDasharray: pathLengths.p4,
                strokeDashoffset: animationStep >= 4 ? 0 : pathLengths.p4,
                transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />

            {/* Request Label */}
            {/* {showRequestLabel && (
              <text x="42" y="30" fontSize="3" fill="#3B82F6" textAnchor="middle" className="font-bold">
                Request
              </text>
            )} */}
            {/* Response Label */}
            {/* {showResponseLabel && (
              <text x="42" y="30" fontSize="3" fill="#10B981" textAnchor="middle" className="font-bold">
                Response
              </text>
            )} */}
          </svg>
        )}

        {/* Left Box */}
        <div className="relative flex flex-col items-center">
          {/* Top Label */}
          <div
            className={`absolute -top-6 sm:-top-12 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 ${showLabels ? "opacity-100" : "opacity-0"}`}
          >
            web Client
          </div>
          {/* Box */}
          <div
            className={`w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] border-4 rounded-lg shadow-lg transition-opacity duration-700 relative ${
              showBoxes ? "opacity-100" : "opacity-0"
            } ${
              isDarkMode ? 'border-white bg-black' : 'border-black bg-white'
            }`}
          >
            {/* Browser Box as nested container */}
            {showBrowserBox && (
              <div className="absolute inset-2 sm:inset-4 bg-gray-800 rounded-lg">
                {/* Window Controls */}
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                {/* Window Title */}
                <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 text-xs font-medium text-white truncate max-w-[80%]">
                  web Client browser
                </div>
                {/* Navigation Bar */}
                <div className="absolute top-6 sm:top-8 left-1 sm:left-2 right-1 sm:right-2 h-5 sm:h-6 bg-gray-700 rounded flex items-center px-1 sm:px-2 gap-1">
                  {/* URL Input Field */}
                  <input
                    type="text"
                    value={isTyping ? typedUrl : urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 bg-white rounded px-1 sm:px-2 py-0.5 sm:py-1 text-xs text-gray-700 outline-none min-w-0"
                    placeholder="Enter r1-r6..."
                    style={{ 
                      textAlign: 'left',
                      overflow: 'auto',
                      whiteSpace: 'nowrap'
                    }}
                    readOnly={isTyping}
                  />
                  {/* Go Button */}
                  <button
                    onClick={handleGoClick}
                    className="ml-1 sm:ml-2 bg-green-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-green-600 cursor-pointer"
                  >
                    Go
                  </button>
                </div>
                {/* Client Browser Label */}
                <div className="absolute top-12 sm:top-16 left-1 sm:left-2 text-xs text-gray-300">Response</div>
                {/* Response Area */}
                <div className={`absolute top-16 sm:top-20 left-1 sm:left-2 right-1 sm:right-2 bottom-1 sm:bottom-2 rounded ${
                  isDarkMode ? 'bg-black' : 'bg-white'
                }`}>
                  <div className={`absolute top-1 sm:top-2 left-1 sm:left-2 text-xs font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>Response</div>
                  <div className={`absolute inset-1 sm:inset-2 rounded flex flex-col items-center justify-center overflow-y-auto ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                  }`}>
                    {showResponse ? (
                      selectedRBox ? (
                        <div className="w-full h-full overflow-y-auto">
                          {getResponseContent(selectedRBox)}
                        </div>
                      ) : (
                        <div className={`text-xs w-full px-1 sm:px-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <div className="text-center mb-2 sm:mb-3">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full mb-1 sm:mb-2 mx-auto"></div>
                            <div className="font-medium mb-1 text-red-600">Error!</div>
                            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{responseData}</div>
                          </div>
                        </div>
                      )
                    ) : (
                      <>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full mb-1 sm:mb-2"></div>
                        <div className={`text-xs text-center ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <div>Enter r1-r6 and click &quot;Go&quot; to see the response</div>
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
          <div
            className={`absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 ${showLabels ? "opacity-100" : "opacity-0"}`}
          >
            Client
          </div>
        </div>

        {/* Small Box in Gap */}
        <div className="relative flex flex-col items-center">
          {/* Box */}
          <div
            className={`w-16 h-32 sm:w-18 sm:h-20 md:w-24 md:h-48 lg:w-18 lg:h-20 border-4 rounded-lg shadow-lg transition-opacity duration-700 relative ${
              showBoxes ? "opacity-100" : "opacity-0"
            } ${
              isDarkMode ? 'border-white bg-black' : 'border-black bg-white'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>Internet</span>
            </div>
          </div>
        </div>

        {/* Computer Box with Web Server inside */}
        <div className="relative flex flex-col items-center">
          {/* Top Label */}
          <div
            className={`absolute -top-6 sm:-top-12 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 text-center ${showLabels ? "opacity-100" : "opacity-0"}`}
          >
            Computer
            
          </div>
          {/* Computer Box */}
          <div
            className={`w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] border-4 rounded-lg shadow-lg transition-opacity duration-700 relative ${
              showBoxes ? "opacity-100" : "opacity-0"
            } ${
              isDarkMode ? 'border-white bg-black' : 'border-black bg-white'
            }`}
          >
            {/* Web Server Box inside Computer */}
            <div className="absolute inset-4 flex flex-col items-center justify-center">
              {/* Web Server Label */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 text-xs font-medium  rounded whitespace-nowrap ${
                isDarkMode ? 'text-white bg-black' : 'text-black bg-white'
              }`}>
                Web Server (9090:Tomcat)
              </div>
              {/* Web Server Box */}
              <div
                className={`w-40 h-56 sm:w-48 sm:h-64 md:w-64 md:h-80 lg:w-80 lg:h-96 border-4 rounded-lg shadow-lg transition-opacity duration-700 relative ${
                  showBoxes ? "opacity-100" : "opacity-0"
                } ${
                  isDarkMode ? 'border-white bg-black' : 'border-black bg-white'
                }`}
              >
                {/* Web Container Box */}
                <div
                  className={`absolute inset-x-4 inset-y-6 border-4 rounded-lg transition-opacity duration-700 z-10 ${showInnerBox ? "opacity-100" : "opacity-0"} ${
                    isDarkMode ? 'border-white bg-black' : 'border-black bg-white'
                  }`}
                >
                  <div className={`absolute -top-5 left-2 text-xs font-medium px-1 ${
                    isDarkMode ? 'text-white bg-black' : 'text-black bg-white'
                  }`}>
                    Web Container
                  </div>
                  {/* Web App Box */}
                  <div
                    className={`absolute inset-x-4 inset-y-6 border-4 rounded-lg transition-opacity duration-700 z-20 ${showWebApp ? "opacity-100" : "opacity-0"} ${
                      isDarkMode ? 'border-white bg-black' : 'border-black bg-white'
                    }`}
                  >
                    <div className={`absolute -top-5 left-2 text-xs font-medium px-1 ${
                      isDarkMode ? 'text-white bg-black' : 'text-black bg-white'
                    }`}>
                      Web App
                    </div>
                    {/* R1-R6 Boxes Grid */}
                    <div className={`absolute inset-x-2 inset-y-6 grid grid-cols-3 gap-1 transition-all duration-500`}>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div
                          key={num}
                          className={`border-2 rounded flex items-center justify-center text-xs font-medium transition-all duration-500 ${
                            selectedRBox === num && animationStep >= 2 && animationStep <= 3 
                              ? "bg-yellow-300 border-yellow-500 shadow-lg scale-110" 
                              : isDarkMode ? 'border-white bg-black text-white' : 'border-black bg-white text-black'
                          }`}
                        >
                          R{num}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Label */}
          <div
            className={`absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base font-semibold transition-opacity duration-700 whitespace-nowrap ${showLabels ? "opacity-100" : "opacity-0"}`}
          >
            Server (192.168.0.20)
          </div>
        </div>
      </div>
    </div>
  )
}
