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
  const { customers, pagination, loading, totalItems } = useSelector(
    (state) => state.customersStore
  );

  // Fetch products on component mount

  useEffect(() => {
    dispatch.customersStore.fetchCustomers({ page: 1, rows: 10 });
  }, [dispatch]);

  const changePage = (payload) => {
    console.log(payload);
    dispatch.customersStore.fetchCustomers({
      page: payload.page + 1,
      rows: payload.rows,
    });
  };

  const link = "add-customer";

  const onEdit = (row) => {
    navigate(`/users/edit-user`);
  };

  const onCopy = (row) => {
    console.log("Copy row:", row);
  };

  const onDelete = async (row) => {
    3;
    const response = await apiDeleteProduct(row.id); // Pass the product ID to delete
    dispatch.customersStore.fetchProducts({
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
      field: "address",
      header: "address",
      style: { width: "15%" },
    },
    { field: "city", header: "city", style: { width: "35%" } },

    { field: "companyName", header: "companyName", style: { width: "10%" } },
    {
      field: "email",
      header: "email",
      style: { width: "10%" },
    },
    {
      field: "fullName",
      header: "fullName",
      style: { width: "10%" },
    },
    {
      field: "phoneNumber",
      header: "phoneNumber",
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
        data={customers}
        changePage={changePage} // Pass the page change handler
        link={link}
      />
    </div>
  );
};

export default Users;
