import { useState } from "react";
import { SquarePen } from 'lucide-react';

export default function FormEditProfile({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData.name,
    email: initialData.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const togglePasswordFields = () => setShowPasswordFields(!showPasswordFields);

  return (
    <form onSubmit={handleSubmit} className="w-full mt-10">
      <div className="p-4 sm:p-6 border-2 border-gray-300 rounded-xl w-full max-w-6xl mx-auto hover:border-[#A27B5C] transition-all duration-300">
        <div className="grid place-content-center pt-5 pb-8">
          <div className="flex gap-3 items-center">
            <SquarePen className="w-8 h-8 text-gray-600" />
            <span className="text-gray-600 text-2xl">Edit Profile</span>
          </div>
        </div>

        <div className="space-y-4 mb-6 ml-10">
          <div>
            <label className="block text-gray-500 text-base font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-b-2 px-2 w-full border-gray-300 text-2xl font-medium focus:outline-none focus:border-[#A27B5C] transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 text-base font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-2 px-2 w-full border-gray-300 text-2xl font-medium focus:outline-none focus:border-[#A27B5C] transition-all duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-base font-medium mb-1">
              Password
            </label>
            <div className="flex justify-between items-center">
             
              <button
                type="button"
                onClick={togglePasswordFields}
                className="text-sm text-[#A27B5C] hover:underline focus:outline-none"
              >
                Change password
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              showPasswordFields 
                ? "opacity-100 h-auto mt-4" 
                : "opacity-0 h-0 overflow-hidden"
            }`}
          >
            <div className="p-4 space-y-4">
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current password"
                className="border-b-2 w-full border-gray-300 text-2xl p-2 focus:outline-none focus:border-[#A27B5C] bg-transparent transition-all duration-300"
              />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New password"
                className="border-b-2 w-full border-gray-300 text-2xl p-2 focus:outline-none focus:border-[#A27B5C] bg-transparent transition-all duration-300"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="border-b-2 w-full border-gray-300 text-2xl p-2 focus:outline-none focus:border-[#A27B5C] bg-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        

        <div className="flex justify-between items-center mt-6">
          {/* <button
            type="button"
            onClick={() => confirmLogout()}
            className="px-4 py-2 text-gray-800 hover:text-[#A27B5C]"
          >
            Log out
          </button> */}

          <div className="space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-[#A27B5C] text-sm border border-[#A27B5C] rounded-full hover:bg-[#A27B5C] hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#A27B5C] text-sm text-white rounded-full hover:bg-[#3F4E4F] transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}