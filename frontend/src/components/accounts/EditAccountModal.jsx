import { useState } from "react";
import { Wallet, PiggyBank, DollarSign, Home, Briefcase, ShoppingBag } from "lucide-react";

const iconMap = { Wallet, PiggyBank, DollarSign, Home, Briefcase, ShoppingBag };

const EditAccountModal = ({ isOpen, onClose, account, onSave }) => {
  const [name, setName] = useState(account?.name || "");
  const [value, setValue] = useState(account?.balance || 0);
  const [icon, setIcon] = useState(account?.icon || "Wallet"); // Store as string

  const icons = Object.keys(iconMap); // ["Wallet", "PiggyBank", ...]

  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Saving Account:", { name, value, icon });
    onSave({ ...account, name, balance: value, icon }); // Save string name
    onClose();
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
          className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4"
        />

        {/* Balance Input */}
        <label className="block text-sm text-gray-400 mb-2">Balance</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4"
        />

        {/* Icon Selector */}
        <label className="block text-sm text-gray-400 mb-2">Select Icon</label>
        <div className="flex space-x-4 overflow-x-auto py-2 px-1 border border-gray-600 rounded mb-4">
          {icons.map((iconKey) => {
            const IconComponent = iconMap[iconKey];
            return (
              <button
                key={iconKey}
                onClick={() => setIcon(iconKey)}
                className={`p-2 rounded-full border-2 ${
                  icon === iconKey ? "border-indigo-500" : "border-transparent"
                } hover:border-indigo-500`}
              >
                <IconComponent size={24} className="text-white" />
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountModal;
