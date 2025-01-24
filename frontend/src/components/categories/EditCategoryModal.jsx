import React from "react";

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [newName, setNewName] = React.useState(category?.name || "");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(newName);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold text-white mb-4">Edit Category</h2>
        <label htmlFor="categoryName" className="block text-sm text-gray-400 mb-2">
          Category Name
        </label>
        <input
          id="categoryName"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4 focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
