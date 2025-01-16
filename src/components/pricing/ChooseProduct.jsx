import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

const Pricing = () => {
  const dispatch = useDispatch();
  const { quotes } = useSelector((state) => state.quotesStore);
  const [searchTerm, setSearchTerm] = useState("");
  const { products, pagination, loading, totalItems } = useSelector(
    (state) => state.productsStore
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSlide, setShowSlide] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      dispatch.productsStore.fetchProducts({ page: 1, rows: 10 });
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    console.log("quotes", quotes);
  }, [quotes]);

  const ActionColumn = ({ row }) => {
    const navigate = useNavigate();

    const onEdit = () => {
      navigate(`/app/warehouses/warehouse-edit/${row.uuid}`);
    };

    const onCopy = () => {
      navigate(`/app/warehouses/warehouse-copy/${row.uuid}`);
    };

    const onDelete = () => {};

    return (
      <div className="flex justify-end text-lg">
        <span
          className="cursor-pointer p-2 hover:text-emerald-500"
          onClick={onEdit}
        >
          <i className="pi pi-pencil" />
        </span>
        <span
          className="cursor-pointer p-2 hover:text-amber-500"
          onClick={onCopy}
        >
          <i className="pi pi-copy" />
        </span>
        <span
          className="cursor-pointer p-2 hover:text-red-500"
          onClick={onDelete}
        >
          <i className="pi pi-trash" />
        </span>
      </div>
    );
  };

  const columns = [
    {
      header: "Description",
      field: "description",
      id: "description",
      sortable: true,
      checked: true,
      body: (rowData) => rowData.description,
    },
    {
      header: "Catalog Number",
      field: "catalogNumber",
      id: "catalogNumber",
      sortable: true,
      checked: true,
      body: (rowData) => rowData.catalogNumber,
    },
    {
      header: "Uom",
      field: "uom",
      id: "uom",
      sortable: true,
      checked: true,
      body: (rowData) => rowData.uom,
    },
    {
      header: "Product Group",
      field: "productGroup",
      id: "productGroup",
      sortable: true,
      checked: true,
      body: (rowData) => rowData.productGroup,
    },
    {
      header: "Quantity Break",
      field: "quantityBreak",
      id: "quantityBreak",
      sortable: true,
      checked: true,
      body: (rowData) => rowData.quantityBreak,
    },
    {
      header: "Us List Price2025",
      field: "usListPrice2025",
      id: "usListPrice2025",
      sortable: true,
      checked: true,
      body: (rowData) => rowData.usListPrice2025,
    },
  ];

  const selectRows = (e) => {
    // Log the selected rows (e.value)
    console.log(e.value);

    // Update local state with the selected rows
    setSelectedRows(e.value);
    console.log("updatedSelectedRows", selectedRows);
    // Dispatch the action to update the Redux store with the selected rows
    dispatch.quotesStore.saveQuotes({ products: selectedRows });
  };

  const handleRemoveProduct = (product) => {
    // Remove the product from the local selected rows state
    const updatedSelectedRows = selectedRows.filter(
      (item) => item.id !== product.id
    );

    setSelectedRows(updatedSelectedRows); // Update the local state

    // Dispatch the action to update the store with the removed product
    dispatch.quotesStore.saveQuotes({
      products: updatedSelectedRows, // Update store with the new selected rows
    });
  };

  return (
    <div className="p-6 space-y-6 mx-auto relative">
      <DataTable
        value={products}
        selection={selectedRows}
        onSelectionChange={(e) => selectRows(e)}
        dataKey="id"
        paginator
        rows={pagination.pageSize}
        totalRecords={totalItems}
        loading={loading}
        className="p-datatable-gridlines"
      >
        <Column
          selectionMode="multiple"
          header="Select"
          style={{ width: "3em" }}
        />
        {columns.map((col) => (
          <Column
            key={col.id}
            header={col.header}
            field={col.field}
            sortable={col.sortable}
            body={col.body}
          />
        ))}
        <Column body={(row) => <ActionColumn row={row} />} />
      </DataTable>

      {!loading && products.length === 0 && (
        <p className="text-gray-500 text-center">
          No products found for the search term.
        </p>
      )}

      {/* Slide-In Menu with Selected Products */}
      {selectedRows.length > 0 && (
        <div className="fixed top-0 right-0 h-full flex items-start">
          <div
            className={`h-12 flex items-center cursor-pointer absolute right-0 transition-transform duration-300 bg-white shadow-md rounded-l-lg ${
              showSlide ? "translate-x-full" : "translate-x-0"
            }`}
            onClick={() => setShowSlide(true)}
          >
            <Button
              icon="pi pi-arrow-left"
              className="p-button-rounded p-button-text text-gray-600 hover:text-gray-800"
            />
          </div>

          <div
            className={`w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ${
              showSlide ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Selected Products
                </h3>
                <Button
                  icon="pi pi-arrow-right"
                  className="p-button-rounded p-button-text"
                  onClick={() => setShowSlide(false)}
                />
              </div>

              <div className="space-y-3">
                {selectedRows.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                  >
                    <Tag
                      value={product.description}
                      className="mr-2 bg-blue-50 text-blue-600 border-blue-100"
                    />
                    <Tag
                      value={product.usListPrice2025 + "$"}
                      className="mr-2 bg-blue-50 text-blue-600 border-blue-100"
                    />
                    <Button
                      icon="pi pi-times"
                      className="p-button-rounded p-button-danger p-button-text"
                      onClick={() => handleRemoveProduct(product)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
