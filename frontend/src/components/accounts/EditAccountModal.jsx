import { useState } from "react";
import { Wallet, PiggyBank, DollarSign, Home, Briefcase, ShoppingBag } from "lucide-react";

const EditAccountModal = ({ isOpen, onClose, account, onSave }) => {
  const [name, setName] = useState(account?.name || "");
  const [value, setValue] = useState(account?.value.replace(/[^0-9.]/g, "") || "0"); // Ensure only numbers
  const [icon, setIcon] = useState(account?.icon || Wallet);

  const icons = [Wallet, PiggyBank, DollarSign, Home, Briefcase, ShoppingBag];

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...account, name, value: `Ksh. ${value}`, icon });
    onClose();
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers and decimals
    setValue(newValue);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold text-white mb-4">Edit Account</h2>

        {/* Account Name Input */}
        <label className="block text-sm text-gray-400 mb-2">Account Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4 focus:outline-none"
        />

        {/* Balance Input */}
        <label className="block text-sm text-gray-400 mb-2">Balance</label>
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4 focus:outline-none"
          inputMode="decimal" // Mobile-friendly numeric keypad
          pattern="[0-9]*" // Ensures only numbers
        />

        {/* Icon Selector */}
        <label className="block text-sm text-gray-400 mb-2">Select Icon</label>
        <div className="flex space-x-4 overflow-x-auto py-2 px-1 border border-gray-600 rounded mb-4">
          {icons.map((Icon, index) => (
            <button
              key={index}
              onClick={() => setIcon(Icon)}
              className={`p-2 rounded-full border-2 ${icon === Icon ? "border-indigo-500" : "border-transparent"} hover:border-indigo-500`}
            >
              <Icon size={24} className="text-white" />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountModal;
