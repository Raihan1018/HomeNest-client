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
    <div className="max-w-md mx-auto p-6 bg-base-300 rounded-lg shadow-md mt-10 text-center">
      <title>Profile</title>
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      <p className=" mb-4 text-purple-500">Now you can see all games details</p>
      <div className="flex flex-col items-center gap-4">
        <img
          src={photoURL || <FaUserAlt />}
          className="w-24 h-24 rounded-full"
        />
        {editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
            />
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="btn bg-green-500 text-black w-full"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong>{" "}
              <span className="text-green-500">{name}</span>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span className="text-green-500">{user?.email}</span>
            </p>
            <button
              onClick={() => setEditing(true)}
              className="btn btn-outline w-full  hover:bg-purple-500"
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
