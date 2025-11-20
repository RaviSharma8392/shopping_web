import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, googleSignup } from "../firebase/firebaseauth";
import StepSelectMethod from "../code/steps/StepSelectMethod";
import StepEmailForm from "../code/steps/StepEmailForm";
import StepDetailsForm from "../code/steps/StepDetailsForm";
import StepSuccess from "../code/steps/StepSuccess";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(0);
  const [signupMethod, setSignupMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- GOOGLE SIGNUP ----------------
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setSignupMethod("google");
      setError("");

      const user = await googleSignup();
      login(user.uid, { ...user, signupMethod: "google" });

      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EMAIL SIGNUP FINAL SUBMIT ----------------
  const handleFinalSubmit = async () => {
    if (userInfo.password !== userInfo.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setSignupMethod("email");
      setError("");

      await signupUser({
        email,
        password: userInfo.password,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        mobile,
      });

      setStep(3);
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
