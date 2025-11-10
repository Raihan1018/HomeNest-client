import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateUserProfile({ displayName: name, photoURL });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-200 dark:bg-gray-800 rounded-lg shadow-lg mt-10 text-center transition-all duration-300">
      <title>Profile</title>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Your Profile
      </h2>
      <p className="mb-4 text-purple-600 dark:text-purple-400">
        Now you can see all games details
      </p>
      <div className="flex flex-col items-center gap-4">
        {photoURL ? (
          <img
            src={photoURL}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-purple-500 dark:border-purple-400 shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <FaUserAlt size={40} />
          </div>
        )}

        {editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="btn w-full bg-green-500 hover:bg-green-600 text-white border-none"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Name:</strong>{" "}
              <span className="text-green-600 dark:text-green-400">{name}</span>
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Email:</strong>{" "}
              <span className="text-green-600 dark:text-green-400">
                {user?.email}
              </span>
            </p>
            <button
              onClick={() => setEditing(true)}
              className="btn btn-outline w-full border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white dark:border-purple-400 dark:text-purple-300 dark:hover:bg-purple-500 dark:hover:text-white"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
