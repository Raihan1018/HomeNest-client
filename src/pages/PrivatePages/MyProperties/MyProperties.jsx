import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const categories = ["Rent", "Sale", "Commercial", "Land"];

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const navigate = useNavigate();

  // Fetch user properties
  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3000/properties?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err));
  }, [user]);

  // Delete property
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/properties/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            setProperties(properties.filter((p) => p._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  // Update property
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/properties/${editingProperty._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProperty),
        })
          .then((res) => res.json())
          .then(() => {
            setProperties(
              properties.map((p) =>
                p._id === editingProperty._id ? editingProperty : p
              )
            );
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Property updated successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            setEditingProperty(null); // close modal
          })
          .catch((err) => console.error(err));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Update canceled",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-5">My Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={property.imageURL}
              alt={property.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-bold">{property.name}</h3>
            <p className="text-gray-600">{property.category}</p>
            <p className="text-gray-800 font-semibold">
              Price: {property.price}
            </p>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-500 text-sm">
              Posted: {new Date(property.postedDate).toLocaleDateString()}
            </p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => navigate(`/property/${property._id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                <FaEye />
              </button>
              <button
                onClick={() => setEditingProperty(property)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
            <h2 className="text-2xl font-semibold mb-4">Update Property</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Property Name"
                className="w-full px-4 py-2 border rounded"
                value={editingProperty.name}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    name: e.target.value,
                  })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border rounded"
                value={editingProperty.description}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    description: e.target.value,
                  })
                }
                required
              />
              <select
                className="w-full px-4 py-2 border rounded"
                value={editingProperty.category}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    category: e.target.value,
                  })
                }
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Price"
                className="w-full px-4 py-2 border rounded"
                value={editingProperty.price}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    price: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-2 border rounded"
                value={editingProperty.location}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    location: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full px-4 py-2 border rounded"
                value={editingProperty.imageURL}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    imageURL: e.target.value,
                  })
                }
                required
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setEditingProperty(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProperties;
