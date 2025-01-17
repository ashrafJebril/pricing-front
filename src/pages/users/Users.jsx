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
  const { users, pagination, loading, totalItems } = useSelector(
    (state) => state.usersStore
  );

  // Fetch products on component mount

  useEffect(() => {
    dispatch.usersStore.fetchUsers({ page: 1, rows: 10 });
  }, [dispatch]);

  const changePage = (payload) => {
    console.log(payload);
    dispatch.usersStore.fetchUsers({
      page: payload.page + 1,
      rows: payload.rows,
    });
  };

  const link = "add-user";

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
      dispatch.usersStore.fetchProducts({ page: 1, rows: 10 });
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
    {
      field: "email",
      header: "Email",
      style: { width: "15%" },
    },
    { field: "fullName", header: "Full name", style: { width: "35%" } },

    {
      field: "phoneNumber",
      header: "Mobile",
      style: { width: "10%" },
    },
    {
      field: "role",
      header: "Role",
      style: { width: "10%" },
      body: (rowData) =>
        rowData.role === "ADMIN" ? (
          <span className="bg-green-200 rounded-lg px-6 p-1 text-green-600">
            Admin
          </span>
        ) : (
          <span className="bg-yellow-200 rounded-lg px-6 p-1 text-yellow-600">
            User
          </span>
        ),
    },

    {
      field: "isActive",
      header: "Status",
      style: { width: "10%" },
      body: (rowData) =>
        rowData.isActive ? (
          <span className="text-green-600">Active</span>
        ) : (
          <span className="text-red-600">Inactive</span>
        ),
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
        data={users}
        changePage={changePage} // Pass the page change handler
        link={link}
      />
    </div>
  );
};

export default Users;
