import { InputText } from "primereact/inputtext";
import { useLocation, useNavigate } from "react-router-dom";

<<<<<<< HEAD
const ToolsHeader = ({ link = "" }) => {
=======
const ToolsHeader = ({ link, searchFunc }) => {
>>>>>>> df3a81fe79aa14fcbc33b62e186e8642e1af7262
  const location = useLocation();
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Extract the route page name
  const routeName = location.pathname.split("/").pop(); // Get the last part of the path

  // Capitalize the first letter and add "Management" for the header
  const headerName =
    routeName.charAt(0).toUpperCase() + routeName.slice(1) + " Management";

  // Remove the last letter from routeName for the button text
  const buttonName = routeName.slice(0, -1); // Remove the last letter

  // Handle button click to navigate to the provided link
  const handleAddClick = () => {
    navigate(link);
  };

  return (
    <div className="flex justify-between relative pb-5">
      <div className="text-indigo-800 font-bold text-xl mb-16">
        {headerName}
      </div>
      <div className="absolute w-full flex justify-between mt-[3.7rem]">
        <InputText
          className="w-3/4 px-2 outline-none stroke-none"
          onKeyDown={(event) => {
            if (event.key.toLowerCase() == "enter") {
              searchFunc(event.target.value);
            }
          }}
          type="search"
          placeholder="Search..."
        ></InputText>
        <button
          className="bg-indigo-800 rounded w-48 h-8 text-white"
          onClick={handleAddClick} // Attach the navigation function
        >
          Add {buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}
        </button>
      </div>
    </div>
  );
};

export default ToolsHeader;
