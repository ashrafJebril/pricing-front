import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSelector } from "react-redux"; // Assuming you're using Redux to fetch user data

function EditUserForm() {
  const user = useSelector((state) => state.user); // Replace with the actual state path for user data

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Pre-fill form values using `setValue`
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("password", ""); // Password should be empty for security
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    console.log("Updated User Data Submitted:", data);
    alert("User updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Edit User
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
            className={`mt-1 block h-8 w-full rounded-md border px-1 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="absolute -bottom-5 left-0 text-sm text-red-500">
              {errors.name.message}
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
            className={`mt-1 block h-8 w-full rounded-md border px-1 ${
              errors.email ? "border-red-500" : "border-gray-300"
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
            className={`mt-1 block h-8 w-full rounded-md border px-1${
              errors.password ? "border-red-500" : "border-gray-300"
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
            className={`mt-1 block h-8 w-full rounded-md border ${
              errors.role ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            {...register("role", { required: "Role is required" })}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
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
          Update User
        </button>
      </form>
    </div>
  );
}

export default EditUserForm;
