import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaUser,
  FaTags,
  FaSearch,
} from "react-icons/fa";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  // Fetch all properties
  useEffect(() => {
    fetch("https://homenest-server-api.vercel.app/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err));
  }, []);

  // Extract unique categories dynamically
  const categories = ["All", ...new Set(properties.map((p) => p.category))];

  // Filtering logic
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || property.category === selectedCategory;

    const matchesPrice =
      (!minPrice || property.price >= Number(minPrice)) &&
      (!maxPrice || property.price <= Number(maxPrice));

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <title>All Properties</title>
      <h2 className="text-3xl font-semibold mb-6 text-center dark:text-gray-100 text-gray-800">
        All Properties
      </h2>

      {/* 🔍 Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-sm items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 w-full md:w-1/4"
        >
          {categories.map((cat, idx) => (
            <option key={idx}>{cat}</option>
          ))}
        </select>

        {/* Price Filter */}
        <div className="flex gap-3 w-full md:w-1/3">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input input-bordered w-1/2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered w-1/2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          />
        </div>
      </div>

      {/* ✅ Show Filtered Properties */}
      {filteredProperties.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No properties found matching your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col border border-gray-100 dark:border-gray-800"
            >
              <img
                src={property.imageURL}
                alt={property.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                {property.name}
              </h3>

              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FaTags className="text-emerald-500" /> {property.category}
              </p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FaDollarSign className="text-emerald-500" /> {property.price}
              </p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FaMapMarkerAlt className="text-emerald-500" />{" "}
                {property.location}
              </p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                <FaUser className="text-emerald-500" /> {property.userName}
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
      )}
    </div>
  );
};

export default AllProperties;
