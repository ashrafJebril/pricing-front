import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";

export default function PaginatorBasicDemo({
  columns,
  data,
  changePage,
  totalRecords,
}) {
  const [currentPage, setCurrentPage] = useState(0); // Use zero-based index
  const [rows, setRows] = useState(10);

  // useEffect(() => {
  //   console.log("Total Records:", totalRecords);
  // }, [totalRecords]);

  const handlePageChange = (event) => {
    console.log("event", event);
    setCurrentPage(event.page);
    setRows(event.rows);

    // Call changePage with the correct new page and rows
    changePage({ page: event.page + 1, rows: event.rows });
  };

  return (
    <div>
      <DataTable
        value={data}
        paginator={false}
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.body ? col.body : col.field}
            header={col.header}
            style={col.style}
          />
        ))}
      </DataTable>
      <Paginator
        first={currentPage * rows} // Correct starting index
        rows={rows}
        totalRecords={Math.floor(totalRecords?.totalPages * 10) || 0} // Use totalItems for pagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
