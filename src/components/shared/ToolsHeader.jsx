import { useLocation, useNavigate } from "react-router-dom";

const ToolsHeader = ({ link = "" }) => {
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
    <div className="flex justify-between relative">
      <div className="text-indigo-800 font-bold text-xl mb-16">
        {headerName}
      </div>
      <div className="absolute w-full flex justify-end mt-[3.7rem]">
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
