import ReflectiveCard from "../components/ui/Card";
import Stepper, { Step } from "../components/Stepper/Stepper";
import LetterGlitch from "../components/background/LetterGlitch";

import LoginStep from "./auth/LoginStep";
import SignupBasicStep from "./auth/SignupStep";


export default function AuthPage() {
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <LetterGlitch />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
          <Stepper>
            <Step><LoginStep /></Step>
            <Step><SignupBasicStep /></Step>
          
          </Stepper>
      </div>
    </div>
  );
}
