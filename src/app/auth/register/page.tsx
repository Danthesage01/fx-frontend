"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormField from "@/components/common/formFields/FormFields";
import { useRegisterMutation } from "@/lib/apiServices/authApi"; // Fixed import path
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // RTK Query hook - onQueryStarted handles Redux state automatically
  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterMutation();

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is being edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Submit handler - simplified since Redux state is handled automatically
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = formData;

    // Basic validation
    if (!email || !password || !name) {
      toast.error("Please fill all fields");
      return;
    }

    // Additional validation
    if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    try {
      // RTK Query handles the Redux state automatically via onQueryStarted
      await registerUser({ name, email, password }).unwrap();

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (error: any) {
      // Error handling is automatic via toast in authApi
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <a
          className="text-red-700 italic text-[14px] hover:underline hover:underline-offset-4"
          href={`${process.env.NEXT_PUBLIC_API_URL}/health`}
          target="__blank"
        >
          Is backend server up?
        </a>
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center py-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FX</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Converter
              </span>
            </div>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name field */}
          <FormField
            id="name"
            name="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isRegisterLoading}
            error={errors.name}
          />

          {/* Email field */}
          <FormField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isRegisterLoading}
            error={errors.email}
          />

          {/* Password field */}
          <FormField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isRegisterLoading}
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors"
            disabled={isRegisterLoading}
          >
            {isRegisterLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already registered?
            <Link
              href="/auth/login"
              className="text-blue-600 px-2 hover:underline"
            >
              Log in instead
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
