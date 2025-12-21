'use client';
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  const validate = (): boolean => {
    let newErrors: FormErrors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Incorrect email format';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long and include uppercase, lowercase letters, and a special character';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    if (!validate()) {
      return;
    }
    // Add your authentication logic here
    // e.g., send data to an API:
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Sign In</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@app.com"
              className={`w-full border bg-gray-800 ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-white focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="mt-1 text-xs text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label className="text-sm text-gray-400" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full border bg-gray-800 ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-white focus:ring-1 focus:ring-blue-500 focus:outline-none`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="mt-1 text-xs text-red-500">{errors.password}</span>
            )}
          </div>
          <button
            className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500 active:scale-[0.98]"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
