import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Stepper.css";

/* ============================= */
/* MAIN STEPPER COMPONENT */
/* ============================= */

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);

  const steps = Children.toArray(children);
  const totalSteps = steps.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = step => {
    setCurrentStep(step);
    if (step > totalSteps) onFinalStepCompleted();
    else onStepChange(step);
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="outer-container">
      <div className="step-circle-container">

        {/* STEP INDICATORS */}
        {!disableStepIndicators && (
          <div className="step-indicator-row">
            {steps.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;

              return (
                <React.Fragment key={stepNumber}>
                  <StepIndicator
                    step={stepNumber}
                    currentStep={currentStep}
                    onClickStep={clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                  {isNotLastStep && (
                    <StepConnector isComplete={currentStep > stepNumber} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* STEP CONTENT */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
        >
          {steps[currentStep - 1]}
        </StepContentWrapper>

        {/* FOOTER */}
     
      </div>
    </div>
  );
}

/* ============================= */
/* STEP CONTENT WRAPPER */
/* ============================= */

function StepContentWrapper({ children, currentStep, direction, isCompleted }) {
  const [height, setHeight] = useState(0);

  return (
    <motion.div
      className="step-content"
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : height }}
      transition={{ duration: 0.35 }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={h => setHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================= */
/* SLIDE TRANSITION */
/* ============================= */

function SlideTransition({ children, direction, onHeightReady }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) onHeightReady(ref.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35 }}
      style={{ position: "absolute", width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

const slideVariants = {
  enter: dir => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: dir => ({
    x: dir > 0 ? "-50%" : "50%",
    opacity: 0
  })
};

/* ============================= */
/* STEP INDICATOR */
/* ============================= */

function StepIndicator({ step, currentStep, onClickStep }) {
  const status =
    currentStep === step
      ? "active"
      : currentStep > step
      ? "complete"
      : "inactive";

  return (
    <motion.div
      className={`step-indicator ${status}`}
      onClick={() => onClickStep(step)}
    >
      {status === "complete" ? "1" : step}
    </motion.div>
  );
}

/* ============================= */
/* STEP CONNECTOR */
/* ============================= */

function StepConnector({ isComplete }) {
  return (
    <div className="step-connector">
      <motion.div
        className="step-connector-inner"
        initial={{ width: 0 }}
        animate={{ width: isComplete ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/* ============================= */
/* STEP EXPORT */
/* ============================= */

export function Step({ children }) {
  return <div className="step">{children}</div>;
}
