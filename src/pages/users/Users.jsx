import Table from "../../components/shared/Table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast";

const Users = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const handleSuccess = () => {
    showToast("error", "Error", "An error occurred during the operation.");
    showToast("success", "Success", "The operation was successful!");
  };
  const link = "add-user";
  const onEdit = (row) => {
    console.log("Edit row:", row);
    navigate(`/users/edit-user`);
    // navigate(`/app/company/company-edit/${row.uuid}`);
  };

  const onCopy = (row) => {
    console.log("Copy row:", row);
    // navigate(`/app/company/company-copy/${row.uuid}`);
  };

  const onDelete = (row) => {
    handleSuccess();
    console.log("Delete row:", row);
    // dispatch(toggleDeleteConfirmation(true));
    // dispatch(setSelectedCompany(row.uuid));
  };

  const ActionColumn = ({ row }) => (
    <div className="flex justify-end text-lg">
      <span
        className="cursor-pointer p-2 hover:text-emerald-500"
        onClick={() => onEdit(row)}
      >
        <i className="pi pi-pencil" /> {/* Edit */}
      </span>
      <span
        className="cursor-pointer p-2 hover:text-amber-500"
        onClick={() => onCopy(row)}
      >
        <i className="pi pi-copy" /> {/* Copy */}
      </span>
      <span
        className="cursor-pointer p-2 hover:text-red-500"
        onClick={() => onDelete(row)}
      >
        <i className="pi pi-trash" /> {/* Delete */}
      </span>
    </div>
  );

  const columns = [
    { field: "name", header: "Name", style: { width: "25%" } },
    { field: "country.name", header: "Country", style: { width: "25%" } },
    { field: "company", header: "Company", style: { width: "25%" } },
    {
      field: "representative.name",
      header: "Representative",
      style: { width: "25%" },
    },
    {
      style: { width: "25%" },
      header: "",
      headerStyle: { textAlign: "right" }, // Center the header
      body: (rowData) => <ActionColumn row={rowData} />,
    },
  ];

  const data = [
    {
      name: "John Doe",
      country: { name: "USA" },
      company: "Tech Corp",
      representative: { name: "Jane Smith" },
    },
    {
      name: "Alice Johnson",
      country: { name: "UK" },
      company: "Innovate Ltd",
      representative: { name: "Robert Brown" },
    },
    {
      name: "Bob Lee",
      country: { name: "Australia" },
      company: "BuildWorks",
      representative: { name: "Emily Davis" },
    },
  ];

  return (
    <div>
      <Table columns={columns} data={data} link={link} />
    </div>
  );
};

export default Users;
