/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { apiDeleteProduct } from "../../services/products.service";
import { useToast } from "../../hooks/toast";
import { InputText } from "primereact/inputtext";
const Pricing = () => {
  const { showToast } = useToast();

  const dispatch = useDispatch();
  const { quotes } = useSelector((state) => state.quotesStore);
  const { products, pagination, loading, totalItems } = useSelector(
    (state) => state.productsStore
  );


  useEffect(() => {
    dispatch.productsStore.fetchProducts({ page: 1, rows: 10 });
  }, [dispatch]);

  const [showSlide, setShowSlide] = useState(false);

  const ActionColumn = ({ row }) => {
    const navigate = useNavigate();

    const onEdit = (e) => {
      e.stopPropagation();
      navigate(`/app/warehouses/warehouse-edit/${row.uuid}`);
    };

    const onCopy = (e) => {
      e.stopPropagation();
      navigate(`/app/warehouses/warehouse-copy/${row.uuid}`);
    };

    const onDelete = async (e) => {
      e.stopPropagation();
      await apiDeleteProduct(row.id);
      dispatch.productsStore.fetchProducts({ page: 1, rows: 10 });
      showToast("success", "Success", "Product deleted successfuly");
    };

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
    { header: "Description", field: "description", sortable: true },
    { header: "Catalog Number", field: "catalogNumber", sortable: true },
    { header: "Uom", field: "uom", sortable: true },
    { header: "Product Group", field: "productGroup", sortable: true },
    { header: "Quantity Break", field: "quantityBreak", sortable: true },
    { header: "Us List Price2025", field: "usListPrice2025", sortable: true },
  ];

  const selectRows = (e) => {
    const selectedProducts = e.value; // Rows currently selected
    dispatch.quotesStore.updateSelectedProducts(selectedProducts);
  };

  const handleRemoveProduct = (productToRemove) => {
    const updatedProducts = quotes.products.filter(
      (product) => product.id !== productToRemove.id
    );
    dispatch.quotesStore.updateSelectedProducts(updatedProducts);
  };
  const [canClearSearch, setCanClearSearch] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    setCanClearSearch(true);
    dispatch.productsStore.fetchProducts({
      page: 1,
      rows: 10000,
      search,
    });
  };
  return (
    <div className="p-6 space-y-6 mx-auto relative">
      <div className="w-3/4 flex justify-start items-center">
        <InputText
          value={search}
          className="w-3/4 px-2 outline-none stroke-none"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(event) => {
            if (event.key.toLowerCase() == "enter") {
              handleSearch();
            }
          }}
          type="text"
          placeholder="Search..."
        ></InputText>
        {canClearSearch && (
          <i
            className="p-2 pi pi-times text-red-600 cursor-pointer "
            onClick={() => {
              setCanClearSearch(false);
              setSearch("");
              dispatch.productsStore.fetchProducts({
                page: 1,
                rows: 10,
                search: event.target.value,
              });
            }}
          ></i>
        )}
      </div>
      <DataTable
        value={products}
        selection={quotes.products}
        onSelectionChange={selectRows}
        dataKey="id"
        paginator
        rows={pagination.pageSize}
        totalRecords={totalItems}
        loading={loading}
        className="p-datatable-gridlines"
      >
        <Column selectionMode="multiple" header="" style={{ width: "3em" }} />
        {columns.map((col) => (
          <Column
            key={col.field}
            header={col.header}
            field={col.field}
            sortable={col.sortable}
          />
        ))}
        <Column body={(row) => <ActionColumn row={row} />} />
      </DataTable>
      {!loading && products.length === 0 && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
      {quotes.products.length > 0 && (
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
                {quotes.products.map((product) => (
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
