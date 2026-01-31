import Stepper, { Step } from "../components/Stepper/Stepper";
import LetterGlitch from "../components/background/LetterGlitch";
import LoginStep from "./auth/LoginStep";
import SignupBasicStep from "./auth/SignupStep";
import "./AuthPage.css";

export default function AuthPage() {
  return (
    <div className="auth-page">
      {/* BACKGROUND */}
      <div className="auth-bg">
        <LetterGlitch />
      </div>

      {/* CONTENT */}
      <div className="auth-wrapper">
        <Stepper>
          <Step><LoginStep /></Step>
          <Step><SignupBasicStep /></Step>
        </Stepper>
      </div>
    </div>
  );
}

