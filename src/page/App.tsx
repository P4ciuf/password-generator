import { Lock, AlertTriangle, Github, Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <header className={`border-b-2 sticky top-0 z-40 transition-colors duration-300 ${
        isDark 
          ? 'border-gray-600 bg-gray-800' 
          : 'border-black bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className={`w-8 h-8 ${isDark ? 'text-white' : 'text-black'}`} />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  SecurePass
                </h1>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Password Generator
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-3 ml-4 pl-4 border-l-2 ${
              isDark ? 'border-gray-600' : 'border-black'
            }`}>
              <button
                onClick={toggleTheme}
                className={`
                  w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2 border-2
                  flex items-center justify-center group
                  ${isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-500 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800' 
                    : 'bg-white hover:bg-gray-50 border-black text-gray-700 focus:ring-gray-300 shadow-lg focus:ring-offset-white'
                  }
                `}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                  <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </button>
              <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-black"></div>
              <a
                href="https://github.com/P4ciuf"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="home" className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            PASSWORD
            <br />
            GENERATOR
          </h2>
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Generate secure passwords or verify existing ones
          </p>
        </div>
        
        <div className={`p-8 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-16 transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-white border-black'
        }`}>
          <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <Form />
          </p>
        </div>
        
        <div className={`p-6 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-16 transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800 text-white border-gray-600' 
            : 'bg-black text-white border-black'
        }`}>
          <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-lg">
            <AlertTriangle className="w-5 h-5" />
            Security Best Practices
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li>• Use at least 12 characters minimum</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Add numbers and special characters</li>
            </ul>
            <ul className="space-y-2">
              <li>• Avoid personal information</li>
              <li>• Use unique passwords per account</li>
              <li>• Consider using a password manager</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;