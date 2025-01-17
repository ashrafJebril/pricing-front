import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "../../hooks/toast";
import { useNavigate } from "react-router-dom";

const CheckQuote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // ... (keeping all the existing functions the same)
  const quotesData = useSelector((state) => state.quotesStore.quotes);
  const handlePrint = () => {
    window.print();
  };
  const paddedProducts = [...quotesData.products];
  while (paddedProducts.length < 14) {
    paddedProducts.push({
      catalogNumber: "-",
      description: "-",
      uom: "-",
      productGroup: "-",
      quantityBreak: "-",
      usListPrice2025: 0,
    });
  }

  const loading = useSelector((state) => state.quotesStore.loading);

  const handleSaveAsDraft = async () => {
    showToast(
      "success",
      "Success",
      "Quote generated and saved as draft successfully"
    );
    await dispatch.quotesStore.saveQuote({
      customerId: quotesData.customer.id,
      quote: quotesData.products,

      status: "DRAFT",
    });
    navigate("/quotes/list");
  };

  const handleSendToCustomer = async () => {
    showToast("success", "Success", "Quote generated and sent to the customer");

    await dispatch.quotesStore.saveQuote({
      customerId: quotesData.customer.id,
      quote: quotesData.products,

      status: "SENT",
    });
    navigate("/quotes/list");
  };
  const subtotal = () => {
    return quotesData.products.reduce(
      (total, product) => total + product.usListPrice2025 * 0.71,
      0
    );
  };
  const taxable = () => {
    return subtotal() * 0.15;
  };
  const total = () => {
    const discountAmount =
      quotesData.discount > 0 ? (subtotal() * quotesData.discount) / 100 : 0;
    return subtotal() + taxable() - discountAmount;
  };
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const validUntilDate = new Date();
  validUntilDate.setMonth(validUntilDate.getMonth() + 1);
  const formattedValidUntilDate = validUntilDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleDownload = async () => {
    const printableElement = document.querySelector(".printable");

    if (printableElement) {
      const canvas = await html2canvas(printableElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: 1,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("quote.pdf");
    }
  };

  return (
    <div className="flex flex-col gap-x-4">
      <div className="flex gap-x-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white rounded px-4 py-2 mb-4 print:hidden"
        >
          Print
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 rounded text-white px-4 py-2 mb-4 print:hidden"
        >
          Download
        </button>
        <button
          onClick={handleSendToCustomer}
          className="bg-green-600 rounded text-white px-4 py-2 mb-4 print:hidden"
        >
          Send to customer
        </button>
        <button
          onClick={handleSaveAsDraft}
          className="bg-yellow-600 rounded text-white px-4 py-2 mb-4 print:hidden"
        >
          Save as draft
        </button>
      </div>

      <div className="flex justify-center mt-4 printable">
        <div className="w-[49.625rem] h-[70.188rem] shadow-xl bg-white p-4 text-sm">
          {/* Header section remains the same */}
          <div className="flex justify-between">
            {/* ... existing header content ... */}
            <div>
              <div className="flex gap-x-2 items-center">
                <img src="/images/logo.jpeg" className="w-12 h-12" alt="Logo" />
                <div>MSE</div>
              </div>
              <div>Street Address</div>
              <div>City, St Zip</div>
              <div>Phone: 07985548796</div>
              <div>Fax: 07985548796</div>
              <div>
                Prepared by:{" "}
                <span>
                  {localStorage.getItem("user")
                    ? JSON.parse(
                        localStorage.getItem("user") || "{}"
                      ).fullName?.replace(/^./, (char) => char.toUpperCase())
                    : ""}
                </span>
              </div>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="px-2">DATE</td>
                    <td className="border border-black px-6 text-center">
                      {today}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2">QUOTE#</td>
                    <td className="border border-black px-6 text-center">
                      1246559
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2">CUSTOMER ID</td>
                    <td className="border border-black px-6 text-center">
                      {quotesData.customer?.id || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2">VALID UNTIL</td>
                    <td className="border border-black px-6 text-center">
                      {formattedValidUntilDate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer section with updated title styling */}
          <div>
            <div className="w-1/3 mt-3">
              <div className="bg-[#384f87] border border-black">
                <h2 className="text-white text-xl py-2 text-center font-bold">
                  CUSTOMER
                </h2>
              </div>
            </div>
            <div>Name: {quotesData.customer?.fullName || "-"}</div>
            <div>Company: {quotesData.customer?.companyName || "-"}</div>
            <div>Street Address: {quotesData.customer?.address || "-"}</div>
            <div>City: {quotesData.customer?.city || "-"}</div>
            <div>Phone: {quotesData.customer?.phoneNumber || "-"}</div>
          </div>

          {/* Products table with updated header styling */}
          <div className="text-sm">
            <table className="w-full border mt-3 border-black">
              <thead>
                <tr>
                  <th className="bg-[#384f87] text-white border border-black p-2 font-bold">
                    Catalog Number
                  </th>
                  <th className="bg-[#384f87] text-white border border-black p-2 font-bold">
                    Description
                  </th>
                  <th className="bg-[#384f87] text-white border border-black p-2 font-bold">
                    UOM
                  </th>
                  <th className="bg-[#384f87] text-white border border-black p-2 font-bold">
                    Product Group
                  </th>
                  <th className="bg-[#384f87] text-white border border-black p-2 font-bold">
                    Quantity Break
                  </th>
                  <th className="bg-[#384f87] text-white border border-black p-2 font-bold">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {paddedProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                  >
                    <td className="border border-black text-center p-1">
                      {product.catalogNumber}
                    </td>
                    <td className="border border-black p-1">
                      {product.description}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {product.uom}
                    </td>
                    <td className="border border-black text-center p-1">
                      {product.productGroup}
                    </td>
                    <td className="border border-black text-center p-1">
                      {product.quantityBreak}
                    </td>
                    <td className="border border-black text-center p-1">
                      {(product.usListPrice2025 * 0.71).toFixed(2)} JD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Terms and totals section with updated title styling */}
            <div className="flex gap-x-4">
              <div className="mt-5 w-3/4">
                <div className="bg-[#384f87] border border-black">
                  <h2 className="text-white text-xl py-2 text-center font-bold">
                    TERMS AND CONDITIONS
                  </h2>
                </div>
                <div className="border border-black p-2">
                  <ol>
                    <li>
                      1. This quote is valid for 30 days from the date of issue.
                    </li>
                    <li>
                      2. Subject to change based on additional requirements.
                    </li>
                    <li>
                      3. Payment is due within 14 days of invoice issuance.
                    </li>
                  </ol>
                </div>
              </div>
              <div className="flex flex-col items-end w-1/3 mt-1">
                <table className="w-[80%] text-right">
                  <tbody>
                    <tr>
                      <td className="text-left p-1">Subtotal</td>
                      <td className="p-1">{subtotal().toFixed(2)} JD</td>
                    </tr>
                    <tr>
                      <td className="text-left p-1">Taxable</td>
                      <td className="p-1">{taxable().toFixed(2)} JD</td>
                    </tr>
                    <tr>
                      <td className="text-left p-1">Tax rate</td>
                      <td className="border border-black p-1 text-center">
                        15%
                      </td>
                    </tr>
                    {quotesData.discount > 0 && (
                      <tr>
                        <td className="text-left p-1">Discount</td>
                        <td className="border border-black p-1 text-center">
                          {quotesData.discount}%
                        </td>
                      </tr>
                    )}
                    <tr className="text-lg font-bold">
                      <td className="text-left p-1">Total</td>
                      <td className="bg-blue-50 p-1">
                        {total().toFixed(2)} JD
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between w-full">
                <div className="w-[45%]">
                  <div className="border-b border-black pt-8"></div>
                  <div className="mt-2">
                    <div className="font-bold">Signature</div>
                    <div className="text-gray-600 text-sm mt-1">
                      <span>
                        {localStorage.getItem("user")
                          ? JSON.parse(
                              localStorage.getItem("user") || "{}"
                            ).fullName?.replace(/^./, (char) =>
                              char.toUpperCase()
                            )
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: Add any terms related to signatures */}
            <div className="mt-4 text-xs text-gray-600 text-center">
              By signing above, both parties agree to the terms and conditions
              outlined in this quotation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckQuote;
