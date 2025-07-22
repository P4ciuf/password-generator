import { useState } from "react";
import { Shield, Key, CheckCircle, XCircle } from "lucide-react";

interface FormData {
  password: string;
}

interface PasswordVerification {
  score: number;
  level: string;
  strengths: string[];
  weaknesses: string[];
  message: string;
}

function Form() {
  const [formData, setFormData] = useState<FormData>({
    password: "",
  });

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [verification, setVerification] = useState<PasswordVerification | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (verification) setVerification(null);
    if (result && !result.includes("Generated")) setResult("");
  };

  const generatePassword = (): void => {
    if (formData.password.length !== 0) {
      setFormData({ password: "" });
      setResult("Please click Generate again with empty field.");
      return;
    }

    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ password });
    setResult(`Generated: ${password}`);
    setVerification(null);
  };

  const verifyPassword = (password: string): PasswordVerification => {
    if (!password) {
      return {
        score: 0,
        level: "Very Weak",
        strengths: [],
        weaknesses: ["No password entered"],
        message: "Please enter a password to verify.",
      };
    }

    let score = 0;
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (password.length >= 12) {
      score += 3;
      strengths.push("Good length (12+ characters)");
    } else if (password.length >= 8) {
      score += 2;
      strengths.push("Adequate length (8+ characters)");
    } else {
      weaknesses.push("Too short (less than 8 characters)");
    }

    if (/[a-z]/.test(password)) {
      score += 1;
      strengths.push("Contains lowercase letters");
    } else {
      weaknesses.push("Missing lowercase letters");
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
      strengths.push("Contains uppercase letters");
    } else {
      weaknesses.push("Missing uppercase letters");
    }

    if (/\d/.test(password)) {
      score += 1;
      strengths.push("Contains numbers");
    } else {
      weaknesses.push("Missing numbers");
    }

    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
      score += 2;
      strengths.push("Contains special characters");
    } else {
      weaknesses.push("Missing special characters");
    }

    if (!/(.)\1{2,}/.test(password)) {
      score += 1;
      strengths.push("No repeated character sequences");
    } else {
      weaknesses.push("Contains repeated character sequences");
    }

    if (!/123|abc|password|qwerty/i.test(password)) {
      score += 1;
      strengths.push("No common patterns detected");
    } else {
      weaknesses.push("Contains common patterns");
    }

    const normalizedScore = Math.min(10, Math.max(1, score));

    let level = "Very Weak";
    if (normalizedScore >= 8) level = "Very Strong";
    else if (normalizedScore >= 6) level = "Strong";
    else if (normalizedScore >= 4) level = "Moderate";
    else if (normalizedScore >= 2) level = "Weak";

    return {
      score: normalizedScore,
      level,
      strengths: strengths.slice(0, 5),
      weaknesses,
      message: `Password strength: ${normalizedScore}/10 (${level})`,
    };
  };

  const handleButtonClick = async (
    action: "generate" | "verify",
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (action === "generate") {
        generatePassword();
      } else if (action === "verify") {
        const verificationResult = verifyPassword(formData.password);
        setVerification(verificationResult);
        setResult("");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <label
              htmlFor="password"
              className="text-xl font-semibold text-black mb-6 uppercase tracking-wide"
            >
              Enter or Generate Password
            </label>

            <div className="relative w-full max-w-md mb-8">
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 pr-12 border-2 border-black text-2xl focus:bg-gray-50 transition-colors outline-none font-mono bg-white text-black font-bold"
                placeholder="Type or generate password"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                type="button"
                disabled={loading}
                className="px-8 py-4 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                onClick={(e) => handleButtonClick("generate", e)}
              >
                <Key className="w-5 h-5" />
                {loading ? "Generating..." : "Generate"}
              </button>

              <button
                type="button"
                disabled={loading}
                className="px-8 py-4 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                onClick={(e) => handleButtonClick("verify", e)}
              >
                <Shield className="w-5 h-5" />
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </div>

        {(result || verification) && (
          <div className="border-t-2 border-black bg-gray-50 p-8">
            {result && !verification && (
              <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2 uppercase">
                  <Key className="w-5 h-5" />
                  Generated Password
                </h3>
                <div className="bg-black text-white p-4 font-mono text-lg break-all border-2 border-black">
                  {result.replace("Generated: ", "")}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click to select and copy
                </p>
              </div>
            )}

            {verification && (
              <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-black flex items-center gap-2 uppercase">
                    <Shield className="w-6 h-6" />
                    Password Analysis
                  </h3>
                  <div className="px-4 py-2 border-2 border-black bg-black text-white font-bold uppercase tracking-wide">
                    {verification.score}/10 - {verification.level}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="w-full h-6 border-2 border-black bg-white">
                    <div
                      className="h-full bg-black transition-all duration-1000 flex items-center justify-end pr-2"
                      style={{ width: `${(verification.score / 10) * 100}%` }}
                    >
                      <span className="text-white text-xs font-bold">
                        {verification.score > 3
                          ? `${verification.score}/10`
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {verification.strengths.length > 0 && (
                    <div>
                      <h4 className="font-bold text-black mb-3 flex items-center gap-2 uppercase">
                        <CheckCircle className="w-5 h-5" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {verification.strengths.map((strength, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <div className="w-3 h-3 bg-black mt-1 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              {strength}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {verification.weaknesses.length > 0 && (
                    <div>
                      <h4 className="font-bold text-black mb-3 flex items-center gap-2 uppercase">
                        <XCircle className="w-5 h-5" />
                        Weaknesses
                      </h4>
                      <ul className="space-y-2">
                        {verification.weaknesses.map((weakness, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <div className="w-3 h-3 bg-black mt-1 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              {weakness}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Form;