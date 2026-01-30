import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, googleSignup } from "../../auth/services/authService";
import { useAuth } from "../../auth/context/UserContext";
import StepSelectMethod from "../components/steps/StepSelectMethod";
import StepEmailForm from "../components/steps/StepEmailForm";
import StepDetailsForm from "../components/steps/StepDetailsForm";
import StepSuccess from "../components/steps/StepSuccess";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(0);
  const [signupMethod, setSignupMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- GOOGLE SIGNUP ----------------
  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      setSignupMethod("google");
      const userData = await googleSignup();
      login(userData.uid, userData); // update AuthContext
      setStep(3); // show success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EMAIL SIGNUP FINAL SUBMIT ----------------
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      setSignupMethod("email");

      const newUser = await signupUser({
        email,
        password: userInfo.password,
        name: userInfo.name,
        phone: mobile,
      });

      login(newUser.uid, newUser); // update AuthContext
      setStep(3); // success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins bg-white md:bg-gray-50 p-4">
      <div className="bg-white md:rounded-2xl md:shadow-2xl w-full max-w-md p-6 md:p-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm text-center rounded-lg">
            {error}
          </div>
        )}

        {/* Signup Steps */}
        {step === 0 && (
          <StepSelectMethod
            setStep={setStep}
            setEmail={setEmail}
            email={email}
            setError={setError}
            onGoogleSignup={handleGoogleSignup}
            loading={loading}
          />
        )}

        {step === 1 && (
          <StepEmailForm
            email={email}
            setEmail={setEmail}
            mobile={mobile}
            setMobile={setMobile}
            setStep={setStep}
            setError={setError}
          />
        )}

        {step === 2 && (
          <StepDetailsForm
            setStep={setStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loading={loading}
            onSubmit={handleFinalSubmit}
          />
        )}

        {step === 3 && <StepSuccess signupMethod={signupMethod} />}
      </div>
    </div>
  );
};

export default SignupPage;
