import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiAddCustomers } from "../../services/customers.service";
import { useToast } from "../../hooks/toast";
const UserForm = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const handleFormSubmit = async (data) => {
    try {
      const response = await apiAddCustomers(data);
      console.log("Response:", response);

      if (response.status === 201) {
        console.log("User added successfully:", response.data);
        showToast("success", "Success", "User added successfully");
        navigate("/customers");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <div className="text-xl mb-8">Add User</div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="p-4 max-w-lg bg-white shadow rounded"
      >
        <div className="mb-6">
          <label htmlFor="fullName" className="block font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName", {
              required: "Full name is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-medium">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-medium">
            Address
          </label>
          <input
            id="address"
            type="text"
            {...register("address", {
              required: "Address is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block font-medium">
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("city", {
              required: "City is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="block font-medium">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            {...register("companyName", {
              required: "Company name is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
