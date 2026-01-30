import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../../features/auth/context/UserContext";

const MobileSignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(0); // 0: enter mobile, 1: enter OTP
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------------- Setup reCAPTCHA -------------------
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified:", response);
          },
          "expired-callback": () => {
            window.recaptchaVerifier.reset();
          },
        },
        auth,
      );
    }
  };

  // ------------------- Send OTP -------------------
  const sendOtp = async () => {
    if (!mobile) {
      setError("Please enter your mobile number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Enable testing mode in dev (optional)
      if (process.env.NODE_ENV === "development") {
        auth.settings.appVerificationDisabledForTesting = true;
      }

      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedNumber = `+91${mobile}`; // adjust country code

      const result = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        appVerifier,
      );
      setConfirmationResult(result);
      setStep(1); // move to OTP step
      console.log("OTP sent");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Verify OTP -------------------
  const verifyOtp = async () => {
    if (!otp || !confirmationResult) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const userCredential = await confirmationResult.confirm(otp);
      const firebaseUser = userCredential.user;

      // Create Firestore user document
      const userDoc = {
        uid: firebaseUser.uid,
        role: "user",
        provider: "phone",
        isBlocked: false,
        name: userInfo.name || "",
        phone: mobile,
        email: "", // phone signup does not have email
        emailVerified: true,
        defaultAddressId: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userDoc);

      // Login in AuthContext
      login(firebaseUser.uid, userDoc);

      navigate("/"); // redirect to home/dashboard
    } catch (err) {
      console.error(err);
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white md:rounded-2xl md:shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">
          Mobile Signup
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm text-center rounded-lg">
            {error}
          </div>
        )}

        {step === 0 && (
          <>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Enter your name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold bg-pink-600 hover:opacity-90 disabled:opacity-70">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold bg-pink-600 hover:opacity-90 disabled:opacity-70">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default MobileSignupPage;
