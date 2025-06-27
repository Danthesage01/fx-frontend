// components/OtpInput.tsx
"use client";

import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  ClipboardEvent,
} from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  inputClassName?: string;
  containerClassName?: string;
}

interface OtpInputRef {
  clear: () => void;
  getValue: () => string;
}

declare global {
  interface Window {
    otpInputComponent?: OtpInputRef;
  }
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onComplete,
  autoFocus = true,
  disabled = false,
  inputClassName = "",
  containerClassName = "",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Set focus on the first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  // Call onComplete callback when all digits are filled
  useEffect(() => {
    if (otp.every((digit) => digit !== "") && onComplete) {
      onComplete(otp.join(""));
    }
  }, [otp, onComplete]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    // Update the OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move focus to previous input when backspace is pressed on empty input
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index] !== "") {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Handle left arrow key
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle right arrow key
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (disabled) return;

    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, length);

    if (digits.length) {
      // Fill as many inputs as we have digits
      const newOtp = [...otp];

      digits.forEach((digit, idx) => {
        if (idx < length) {
          newOtp[idx] = digit;
        }
      });

      setOtp(newOtp);

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex((v) => v === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[length - 1]?.focus();
      }
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    // Select the text on focus
    e.target.select();
  };

  // Clear all inputs
  const clear = () => {
    setOtp(Array(length).fill(""));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  // Expose the clear method and current value
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.otpInputComponent = {
        clear,
        getValue: () => otp.join(""),
      };
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.otpInputComponent;
      }
    };
  }, [otp]);

  return (
    <div className={`flex justify-center space-x-2 ${containerClassName}`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement | null) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={otp[index]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(index, e)
          }
          onFocus={handleFocus}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className={`w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-godlies-500 
                      dark:bg-gray-700 dark:text-white dark:border-gray-600
                      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                      ${inputClassName}`}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
