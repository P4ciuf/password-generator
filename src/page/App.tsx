import { Lock, AlertTriangle, Github } from "lucide-react";
import Form from "./components/Form";

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-white">
      <header className="border-b-2 sticky top-0 z-40 transition-colors duration-300 border-black bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-8 h-8 text-black" />
              <div>
                <h1 className="text-2xl font-bold text-black">
                  SecurePass
                </h1>
                <p className="text-xs text-gray-500">
                  Password Generator
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-black">
              <a
                href="https://github.com/P4ciuf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-gray-600 hover:text-black"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="home" className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-black">
            PASSWORD
            <br />
            GENERATOR
          </h2>
          <p className="text-xl mb-8 text-gray-500">
            Generate secure passwords or verify existing ones
          </p>
        </div>
        
        <div className="p-8 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-16 transition-colors duration-300 bg-white border-black">
          <p className="text-center text-gray-600">
            <Form />
          </p>
        </div>
        
        <div className="p-6 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-16 transition-colors duration-300 bg-black text-white border-black">
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