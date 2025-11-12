import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const AddProperty = () => {
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    location: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = {
      ...property,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-email": user?.email,
        },
        body: JSON.stringify(propertyData),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Property Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setProperty({
          name: "",
          description: "",
          category: "",
          price: "",
          location: "",
          imageURL: "",
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to add property",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" shadow-xl rounded-2xl w-full max-w-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-emerald-600 text-center mb-6">
          Add a New Property
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1  font-medium ">Property Name</label>
            <input
              type="text"
              name="name"
              value={property.name}
              onChange={handleChange}
              placeholder="Enter property name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1  font-medium">Description</label>
            <textarea
              name="description"
              value={property.description}
              onChange={handleChange}
              placeholder="Write a brief description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block mb-1  font-medium">Category</label>
            <select
              name="category"
              value={property.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={property.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1  font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={property.location}
              onChange={handleChange}
              placeholder="City, area, or address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1  font-medium">Image Link</label>
            <input
              type="text"
              name="imageURL"
              value={property.imageURL}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1  font-medium">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-lg cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1  font-medium">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-lg  cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700  py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Add Property
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProperty;
