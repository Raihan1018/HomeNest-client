import React, { useEffect, useState } from "react";
import { FaDollarSign, FaMapMarkerAlt, FaTags, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceSort, setPriceSort] = useState("default"); // New state for price sort
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err));
  }, []);

  const categories = ["All", ...new Set(properties.map((p) => p.category))];

  // Filtering logic
  let filteredProperties = properties.filter((property) => {
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

  // Sorting logic
  if (priceSort === "lowToHigh") {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (priceSort === "highToLow") {
    filteredProperties.sort((a, b) => b.price - a.price);
  }

  // Show only first 6 after filter & sort
  const featured = filteredProperties.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col">
      <h2 className="text-3xl font-bold mb-8 dark:text-gray-100 text-center">
        Featured Real Estate
      </h2>

      {/*  Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-base-200 dark:bg-gray-800 p-5 rounded-lg shadow-sm items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full md:w-1/4"
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
            className="input input-bordered w-1/2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered w-1/2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Price Sort */}
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="select select-bordered bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full md:w-1/4"
        >
          <option value="default">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Property Grid */}
      {featured.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <div
              key={property._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform"
            >
              <div className="h-56 overflow-hidden rounded-t-xl">
                <img
                  src={property.imageURL}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold dark:text-gray-100 mb-1">
                  {property.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2 text-gray-700 dark:text-gray-200">
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
                    <FaTags className="text-emerald-500" /> {property.category}
                  </span>
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
                    <FaDollarSign className="text-emerald-500" />{" "}
                    {property.price}
                  </span>
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
                    <FaMapMarkerAlt className="text-emerald-500" />{" "}
                    {property.location}
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Posted by: {property.userName}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/property/${property._id}`}
                    className="mt-3 inline-block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md font-medium transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No properties found matching your filters.
        </p>
      )}

      {/* Load More Button */}
      {filteredProperties.length > 6 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/all-properties")}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-6 rounded-md font-medium transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProperties;
