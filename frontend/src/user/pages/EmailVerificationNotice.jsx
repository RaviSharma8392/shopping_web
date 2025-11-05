import { Link } from "react-router-dom";
import { COLORS } from "../../style/theme";
import { IMAGES } from "../../assets/images";

const EmailVerificationNotice = () => {
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2">
        <img
          src={IMAGES.signupBanner}
          alt="Email Verification Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT MESSAGE */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md text-center">
          <h2
            className="text-3xl font-[lora] mb-3"
            style={{ color: COLORS.primary }}>
            Check Your Email
          </h2>

          <p className="text-sm mb-6" style={{ color: COLORS.text }}>
            We’ve sent a verification link to your email address.
            <br />
            Please open the link to verify your account.
          </p>

          <div className="mt-6">
            <Link
              to="/account/login"
              className="text-sm font-semibold underline"
              style={{ color: COLORS.primary }}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;
