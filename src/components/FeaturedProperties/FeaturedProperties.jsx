import React, { useEffect, useState } from "react";
import { FaDollarSign, FaMapMarkerAlt, FaTags, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceSort, setPriceSort] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch properties sorted by newest first
    fetch("https://home-nest-server-seven.vercel.app/properties?sort=newest")
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

  // Price sorting
  if (priceSort === "lowToHigh") {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (priceSort === "highToLow") {
    filteredProperties.sort((a, b) => b.price - a.price);
  }

  // Show only first 6 properties
  const featured = filteredProperties.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto py-12 flex flex-col">
      <h2 className="text-3xl font-bold mb-8  text-center">
        Featured Real Estate
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-base-200  p-5 rounded-lg shadow-sm items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 "
          />
          <FaSearch className="absolute left-3 top-3" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered  w-full md:w-1/4"
        >
          {categories.map((cat, idx) => (
            <option key={idx}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-3 w-full md:w-1/3">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input input-bordered w-1/2 "
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered w-1/2 "
          />
        </div>

        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="select select-bordered   w-full md:w-1/4"
        >
          <option value="default">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Properties Grid */}
      {featured.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <div
              key={property._id}
              className="  rounded-xl  shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform"
            >
              <div className="h-56 overflow-hidden rounded-t-xl">
                <img
                  src={property.imageURL}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold  mb-1">{property.name}</h3>
                <p className=" line-clamp-2">{property.description}</p>

                <div className="flex flex-wrap gap-2 mt-2 ">
                  <span className="flex items-center gap-1  px-2 py-1 rounded-md text-sm">
                    <FaTags className="text-emerald-500" /> {property.category}
                  </span>
                  <span className="flex items-center gap-1  px-2 py-1 rounded-md text-sm">
                    <FaDollarSign className="text-emerald-500" />{" "}
                    {property.price}
                  </span>
                  <span className="flex items-center gap-1  px-2 py-1 rounded-md text-sm">
                    <FaMapMarkerAlt className="text-emerald-500" />{" "}
                    {property.location}
                  </span>
                </div>

                <p className="text-sm  mt-2">Posted by: {property.userName}</p>

                <div className="mt-auto">
                  <Link
                    to={`/property/${property._id}`}
                    className="mt-3 inline-block w-full text-center bg-emerald-600 hover:bg-emerald-700  py-2 px-4 rounded-md font-medium transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center  mt-10">
          No properties found matching your filters.
        </p>
      )}

      {/* Load More */}
      {filteredProperties.length > 6 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/all-properties")}
            className=" py-2 px-6 rounded-md font-medium transition hover:scale-110 duration-200 hover:underline"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProperties;
