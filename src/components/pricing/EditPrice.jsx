import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/toast";
const QuotesBox = () => {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotesStore.quotes.products); // Access products from quotesStore
  const { showToast } = useToast();
  // Local state to handle editable prices
  const [editedQuotes, setEditedQuotes] = useState([...quotes]);

  const handlePriceChange = (index, newPrice) => {
    // Update the specific quote price in local state
    const updatedQuotes = editedQuotes.map((quote, i) =>
      i === index ? { ...quote, usListPrice2025: newPrice } : quote
    );
    setEditedQuotes(updatedQuotes);
  };

  useEffect(() => {
    console.log("useEffect", quotes);
  }, [quotes]);

  const saveUpdatedPrices = () => {
    // Show success toast notification
    showToast("success", "Success", "Price saved successfully");
    // Dispatch the updated quotes to the Redux store
    dispatch.quotesStore.saveQuotes({ products: editedQuotes });
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {editedQuotes.map((quote, index) => (
          <div
            key={quote.catalogNumber}
            className="border rounded shadow p-4 flex flex-col space-y-2"
          >
            <div>
              <strong>Description:</strong> {quote.description}
            </div>
            <div>
              <strong>Catalog Number:</strong> {quote.catalogNumber}
            </div>
            <div>
              <strong>UoM:</strong> {quote.uom || "N/A"}
            </div>
            <div>
              <strong>Product Group:</strong> {quote.productGroup || "N/A"}
            </div>
            <div>
              <label
                htmlFor={`price-${quote.catalogNumber}`}
                className="block font-bold"
              >
                Price:
              </label>
              <input
                id={`price-${quote.catalogNumber}`}
                type="number"
                value={quote.usListPrice2025}
                onChange={(e) =>
                  handlePriceChange(index, parseFloat(e.target.value))
                }
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        {editedQuotes.length > 0 && (
          <button
            onClick={saveUpdatedPrices}
            className="w-36 bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Save Prices
          </button>
        )}
      </div>
    </div>
  );
};

export default QuotesBox;
