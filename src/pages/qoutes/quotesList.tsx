import React, { useEffect } from "react";
import Table from "../../components/shared/Table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast";
import { useSelector, useDispatch } from "react-redux";
import ToolsHeader from "../../components/shared/ToolsHeader";
import { apiDeleteQuotes } from "../../services/quotes.service";
const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Select data from the Redux store
  const { quotesList, pagination, loading, totalItems } = useSelector(
    (state) => state.quotesStore
  );

  // Fetch products on component mount

  useEffect(() => {
    dispatch.quotesStore.fetchQuotes({ page: 1, rows: 10 });
  }, [dispatch]);
  useEffect(() => {
    console.log("qqqq", quotesList);
  }, [quotesList]);

  const changePage = (payload) => {
    console.log(payload);
    dispatch.quotesStore.fetchQuotes({
      page: payload.page + 1,
      rows: payload.rows,
    });
  };

  const onEdit = (row) => {
    navigate(`/users/edit-user`);
  };

  const onCopy = (row) => {
    console.log("Copy row:", row);
  };

  const onDelete = async (row) => {
    3;
    const response = await apiDeleteQuotes(row.id); // Pass the product ID to delete
    dispatch.quotesStore.fetchProducts({
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
      header: "Created By",
      style: { width: "15%" },
      body: (rowData) => <div>{rowData.creator.fullName}</div>,
    },
    {
      field: "customer",
      header: "Customer name",
      style: { width: "15%" },
      body: (rowData) => <div>{rowData.customer.fullName}</div>,
    },

    {
      field: "customer",
      header: "Company",
      style: { width: "15%" },
      body: (rowData) => <div>{rowData.customer.companyName}</div>,
    },

    {
      field: "status",
      header: "Status",
      style: { width: "15%" },
      body: (rowData) => (
        <div
          className={`px-2 py-1 text-center w-fit font-bold rounded ${
            rowData.status === "DRAFT"
              ? "text-white bg-yellow-600"
              : "text-white bg-green-600"
          }`}
        >
          {rowData.status.charAt(0).toUpperCase() +
            rowData.status.slice(1).toLowerCase()}
        </div>
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
      <ToolsHeader />

      <Table
        columns={columns}
        totalRecords={pagination}
        data={quotesList}
        changePage={changePage} // Pass the page change handler
      />
    </div>
  );
};

export default Users;
