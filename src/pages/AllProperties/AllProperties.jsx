import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDollarSign, FaMapMarkerAlt, FaUser, FaTags } from "react-icons/fa";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);

  // Fetch all properties
  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        All Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={property.imageURL}
              alt={property.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-bold mb-1">{property.name}</h3>

            <p className="flex items-center gap-2 text-gray-700 mb-1">
              <FaTags /> {property.category}
            </p>
            <p className="flex items-center gap-2 text-gray-700 mb-1">
              <FaDollarSign /> {property.price}
            </p>
            <p className="flex items-center gap-2 text-gray-700 mb-1">
              <FaMapMarkerAlt /> {property.location}
            </p>
            <p className="flex items-center gap-2 text-gray-700 mb-3">
              <FaUser /> {property.userName}
            </p>

            <Link
              to={`/property/${property._id}`}
              className="mt-auto bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-center transition"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
