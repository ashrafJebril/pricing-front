import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiAddProduct } from "../../services/products.service";
import { useNavigate } from "react-router-dom";
const ProductForm = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();
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
      // Ensure usListPrice2025 is a number
      const productData = {
        ...data,
        usListPrice2025: Number(data.usListPrice2025), // Ensure it's converted to a number
      };

      const response = await apiAddProduct(productData);
      console.log("asfgas", response);
      if (response.status === 201) {
        navigate("products/");
      }
      console.log("Product added successfully:", response);
      //   onSubmit(response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <div className="text-xl mb-8">Add Product</div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="p-4 max-w-lg bg-white shadow rounded"
      >
        <div className="mb-6">
          <label htmlFor="catalogNumber" className="block font-medium">
            Catalog Number
          </label>
          <input
            id="catalogNumber"
            type="text"
            {...register("catalogNumber", {
              required: "Catalog number is required",
            })}
            className="w-full p-2 border rounded"
          />
          <div className="absolute">
            {errors.catalogNumber && (
              <p className="text-red-500 text-sm">
                {errors.catalogNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="productGroup" className="block font-medium">
            Product Group
          </label>
          <input
            id="productGroup"
            type="text"
            {...register("productGroup", {
              required: "Product group is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.productGroup && (
            <p className="text-red-500 text-sm">
              {errors.productGroup.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="quantityBreak" className="block font-medium">
            Quantity Break
          </label>
          <input
            id="quantityBreak"
            type="text"
            {...register("quantityBreak", {
              required: "Quantity break is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.quantityBreak && (
            <p className="text-red-500 text-sm">
              {errors.quantityBreak.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="uom" className="block font-medium">
            UOM
          </label>
          <input
            id="uom"
            type="text"
            {...register("uom", {
              required: "Unit of measure is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.uom && (
            <p className="text-red-500 text-sm">{errors.uom.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="usListPrice2025" className="block font-medium">
            US List Price 2025
          </label>
          <input
            id="usListPrice2025"
            type="number"
            {...register("usListPrice2025", {
              required: "US list price is required",
              valueAsNumber: true, // Automatically convert to number
              min: { value: 0, message: "Price cannot be negative" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.usListPrice2025 && (
            <p className="text-red-500 text-sm">
              {errors.usListPrice2025.message}
            </p>
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

export default ProductForm;
