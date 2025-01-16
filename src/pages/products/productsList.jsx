import React, { useEffect } from "react";
import Table from "../../components/shared/Table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast";
import { useSelector, useDispatch } from "react-redux";
import ToolsHeader from "../../components/shared/ToolsHeader";
import { apiDeleteProduct } from "../../services/products.service";
const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Select data from the Redux store
  const { products, pagination, loading, totalItems } = useSelector(
    (state) => state.productsStore
  );

  // Fetch products on component mount

  useEffect(() => {
    dispatch.productsStore.fetchProducts({ page: 1, rows: 10 });
  }, [dispatch]);

  const changePage = (payload) => {
    console.log(payload);
    dispatch.productsStore.fetchProducts({
      page: payload.page + 1,
      rows: payload.rows,
    });
  };

  const link = "add-product";

  const onEdit = (row) => {
    navigate(`/users/edit-user`);
  };

  const onCopy = (row) => {
    console.log("Copy row:", row);
  };

  const onDelete = async (row) => {
    3;
    const response = await apiDeleteProduct(row.id); // Pass the product ID to delete
    dispatch.productsStore.fetchProducts({
      page: pagination.currentPage,
      rows: 10,
    });
    showToast("success", "Deleted", "Row deleted successfully.");
  };

  const ActionColumn = ({ row }) => (
    <div className="flex justify-end text-lg">
      <span
        className="cursor-pointer p-2 hover:text-emerald-500"
        onClick={() => onEdit(row)}
      >
        <i className="pi pi-pencil" />
      </span>
      <span
        className="cursor-pointer p-2 hover:text-amber-500"
        onClick={() => onCopy(row)}
      >
        <i className="pi pi-copy" />
      </span>
      <span
        className="cursor-pointer p-2 hover:text-red-500"
        onClick={() => onDelete(row)}
      >
        <i className="pi pi-trash" />
      </span>
    </div>
  );

  const columns = [
    {
      field: "catalogNumber",
      header: "Catalog Number",
      style: { width: "15%" },
    },
    { field: "description", header: "Description", style: { width: "35%" } },
    { field: "uom", header: "UOM", style: { width: "10%" } },
    { field: "productGroup", header: "Product Group", style: { width: "10%" } },
    {
      field: "quantityBreak",
      header: "Quantity Break",
      style: { width: "10%" },
    },
    {
      field: "usListPrice2025",
      header: "Price (2025)",
      style: { width: "10%" },
    },
    {
      style: { width: "10%" },
      header: "",
      headerStyle: { textAlign: "right" },
      body: (rowData) => <ActionColumn row={rowData} />,
    },
  ];

  return (
    <div>
      <ToolsHeader link={link} />

      <Table
        columns={columns}
        totalRecords={pagination}
        data={products}
        changePage={changePage} // Pass the page change handler
        link={link}
      />
    </div>
  );
};

export default Users;
