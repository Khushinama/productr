import { ChevronDown, LogOut, Upload, Menu } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { logoutUser, uploadProfilePic } from "../../api/authApi";

export default function Navbar({ onMenuClick, searchTerm = "", setSearchTerm }) {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  const firstChar =
    user?.name && user.name.length > 0 ? user.name[0].toUpperCase() : "?";

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    window.location.href = "/";
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]); // ⚠️ must match backend

    const res = await uploadProfilePic(formData);
    setUser((prev) => ({
      ...prev,
      profilePic: res.profilePic,
    }));
    setOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-orange-50 border-b px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">

      {/* LEFT: MOBILE MENU */}
      <button
        onClick={onMenuClick}
        className="sm:hidden p-2 rounded-md hover:bg-gray-200"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-40 sm:w-56 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        {/* PROFILE */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {user?.profilePic ? (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/${user.profilePic}`}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-semibold">
                {firstChar}
              </div>
            )}
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md border z-[999]">
              <label className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
                <Upload className="w-4 h-4" />
                Upload Photo
                <input type="file" hidden onChange={handleImageUpload} />
              </label>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
