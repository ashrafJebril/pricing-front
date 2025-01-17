import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/toast";
function AddUserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);
    await dispatch.usersStore.createNewUser(data);
    showToast("success", "Success", "User added successfully");
    navigate("/users");
    };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Add User
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="relative mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            className={`mt-1 px-1 block h-8 w-full rounded-md border px-1${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register("fullName", { required: "Name is required" })}
          />
          {errors.fullName && (
            <p className="absolute -bottom-5 left-0 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            className={`mt-1 block h-8 w-full rounded-md border px-1
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-0 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            className={`mt-1 block h-8 w-full rounded-md border px-1
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="absolute -bottom-5 left-0 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        {/* Name Field */}
        <div className="relative mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Phone:
          </label>
          <input
            id="phoneNumber:"
            type="tel"
            className={`mt-1 px-1 block h-8 w-full rounded-md border px-1${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register("phoneNumber", { required: "Name is required" })}
          />
          {errors.phoneNumber && (
            <p className="absolute -bottom-5 left-0 text-sm text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Role Dropdown */}
        <div className="relative mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role:
          </label>
          <select
            id="role"
            className={`mt-1 block h-8 w-full rounded-md border              errors.role ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register("role", { required: "Role is required" })}
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
          {errors.role && (
            <p className="absolute -bottom-5 left-0 text-sm text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
