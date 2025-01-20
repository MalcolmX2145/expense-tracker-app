import Header from "../components/Header";

const Categories = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col space-y-6">
      <Header title="Categories" />

      {/* Income Categories Section */}
      <div className="px-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">Income Categories</h1>
        <hr className="border-t border-gray-600 mb-6" />
        {/* Add content for Income Categories here */}
      </div>

      {/* Expense Categories Section */}
      <div className="px-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">Expense Categories</h1>
        <hr className="border-t border-gray-600 mb-6" />
        {/* Add content for Expense Categories here */}
      </div>
    </div>
  );
};

export default Categories;
