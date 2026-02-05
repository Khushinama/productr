import { ChevronDown, LogOut, Upload } from "lucide-react";
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
    formData.append("profile", e.target.files[0]);

    const res = await uploadProfilePic(formData);
    setUser((prev) => ({
      ...prev,
      profilePic: res.profilePic,
    }));
    setOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-orange-50 border-b px-4 sm:px-6 py-3 flex items-center justify-between relative z-40">

      {/* LEFT EMPTY */}
      <div className="hidden sm:block w-40" />

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hidden sm:block w-56 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        {/* PROFILE */}
        <div className="relative z-50">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {user?.profilePic ? (
              <img
                src={`http://localhost:5000/${user.profilePic}`}
                className="w-8 h-8 rounded-full object-cover"
              />
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

              {/* UPLOAD */}
              <label className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
                <Upload className="w-4 h-4" />
                Upload Photo
                <input
                  type="file"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>

              {/* LOGOUT */}
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
