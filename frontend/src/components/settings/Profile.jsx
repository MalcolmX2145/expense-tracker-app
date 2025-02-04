import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
  const { user } = useAuth(); // Access the logged-in user from the AuthContext

  if (!user) {
    return (
      <SettingSection icon={User} title={"Profile"}>
        <p className="text-gray-400">Loading...</p>
      </SettingSection>
    );
  }

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={user?.avatar_url || "/default-avatar.png"} // Use user avatar or fallback to a default image
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-100">{user?.name || "No Name"}</h3>
          <p className="text-gray-400">{user?.email || "No Email"}</p>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};

export default Profile;
