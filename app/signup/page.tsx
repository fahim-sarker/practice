"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
}

interface SignupResponse {
  success: boolean;
  message: string;
  userId?: string;
}

const SignupPage: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = async data => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      }

      const response: AxiosResponse<SignupResponse> = await axios.post(
        "/api/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("Signup successful: " + response.data.message);
      } else {
        alert("Signup failed: " + response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(
          "Signup failed: " +
            (error.response?.data as SignupResponse)?.message || error.message
        );
      } else {
        alert("Signup failed: " + String(error));
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          encType="multipart/form-data"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Avatar</label>
            <input
              type="file"
              accept="image/*"
              {...register("avatar")}
              onChange={handleAvatarChange}
            />
            {preview && (
              <Image
                src={preview}
                alt="Avatar Preview"
                height={500}
                width={500}
                className="w-24 h-24 object-cover rounded-full mt-2"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
