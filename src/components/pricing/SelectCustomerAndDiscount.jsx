import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCustomers } from "../../hooks/useCustomers";
import { useToast } from "../../hooks/toast";

const CustomerDiscount = () => {
  const dispatch = useDispatch();
  const { customers } = useCustomers();
  const { showToast } = useToast();
  const quotes = useSelector((state) => state.quotesStore.quotes); // Access the quotes state
  const [selectedCustomer, setSelectedCustomer] = useState(
    quotes.customer?.id || null
  );

  useEffect(() => {
    console.log("quotes", quotes);
  }, [quotes]);

  const [discount, setDiscountValue] = useState(quotes.discount || "");

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const customer = customers.find((c) => c.id.toString() === customerId);

    if (customer) {
      setSelectedCustomer(customerId);
      console.log("Selected customer:", customer);
    }
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setDiscountValue(value);
    } else if (e.target.value === "") {
      setDiscountValue("");
    }
  };

  const handleSave = () => {
    if (selectedCustomer) {
      const customer = customers.find(
        (c) => c.id.toString() === selectedCustomer
      );
      if (customer) {
        // Dispatch the customer and optional discount to the Redux store
        dispatch.quotesStore.saveDiscountAndCustomer({
          customer,
          discount: discount ? Number(discount) : null, // Discount is optional
        });
        showToast("success", "Success", "Customer saved successfully!");
      }
    } else {
      showToast("danger", "Failed", "Please select a customer to proceed.");
    }
  };

  return (
    <div className="p-6 mt-4 space-y-4 border rounded shadow-lg">
      <h2 className="text-lg font-bold">Assign Discount to Customer</h2>

      {/* Customer Dropdown */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="customer-select" className="font-semibold">
          Select Customer:
        </label>
        <select
          id="customer-select"
          value={selectedCustomer || ""}
          onChange={handleCustomerChange}
          className="border px-4 py-2 rounded"
        >
          <option value="" disabled>
            -- Select a customer --
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Discount Input */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="discount" className="font-semibold">
          Discount Percentage (Optional):
        </label>
        <input
          id="discount"
          type="number"
          min="0"
          max="100"
          value={discount}
          onChange={handleDiscountChange}
          placeholder="Enter discount percentage"
          className="border px-4 py-2 rounded"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save
      </button>
    </div>
  );
};

export default CustomerDiscount;
