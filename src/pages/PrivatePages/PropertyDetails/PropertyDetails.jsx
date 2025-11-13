import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaTags,
  FaUser,
  FaCalendarAlt,
  FaStar,
  FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";

// Helper to calculate "time ago"
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

  return past.toLocaleDateString();
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  // Function to fetch reviews
  const fetchReviews = () => {
    fetch(`https://homenest-server-api.vercel.app/reviews?propertyId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviewsList(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // Fetch property details
    fetch(`https://homenest-server-api.vercel.app/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error(err));

    // Fetch reviews initially
    fetchReviews();
  }, [id]);

  if (!property)
    return (
      <p className=" text-center  text-lg mx-auto min-h-screen flex justify-center items-center">
        Loading...
      </p>
    );

  const handleSubmitReview = async () => {
    if (!rating || !review.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please provide a rating and review",
      });
      return;
    }

    const reviewData = {
      propertyId: id,
      rating,
      review,
      reviewerName: property.userName,
      reviewerEmail: property.userEmail,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        `https://homenest-server-api.vercel.app/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      if (!res.ok) throw new Error("Failed to add review");

      Swal.fire({
        icon: "success",
        title: "Review added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Fetch updated reviews after adding new one
      fetchReviews();

      setRating(0);
      setHoverRating(0);
      setReview("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to add review",
        text: "Please make sure your backend route is working",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <title>Property Details</title>
      {/* Property Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-md dark:shadow-lg">
          <img
            src={property.imageURL}
            alt={property.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between space-y-4">
          <h2 className="text-3xl font-bold ">
            {property.name}
          </h2>
          <p className="">
            {property.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
            <p className="flex items-center gap-2  p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaTags className="text-emerald-500" /> {property.category}
            </p>
            <p className="flex items-center gap-2  p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaDollarSign className="text-emerald-500" /> {property.price}
            </p>
            <p className="flex items-center gap-2  p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaMapMarkerAlt className="text-emerald-500" />{" "}
              {property.location}
            </p>
            <p className="flex items-center gap-2  p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaUser className="text-emerald-500" /> {property.userName} (
              {property.userEmail})
            </p>
            <p className="flex items-center gap-2  p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaCalendarAlt className="text-emerald-500" />{" "}
              {new Date(property.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold ">
          Ratings & Reviews
        </h3>

        {/* Add Review Form */}
        <div className="p-6 rounded-xl shadow-md dark:shadow-lg  space-y-4">
          <h4 className="font-medium ">Add Your Review</h4>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400"
                    : ""
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            placeholder="Write your review..."
            className="w-full px-4 py-3 border rounded-lg "
          />
          <button
            onClick={handleSubmitReview}
            className="bg-emerald-600 hover:bg-emerald-700  py-2 px-6 rounded-lg font-medium transition"
          >
            Submit Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.length === 0 ? (
            <p className="">No reviews yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviewsList.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl shadow-md dark:shadow-lg  transition hover:shadow-xl dark:hover:shadow-emerald-900"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold ">
                      {rev.reviewerName}
                    </p>
                    <span className="flex items-center  text-sm">
                      <FaClock className="mr-1 text-emerald-500" />
                      {timeAgo(rev.createdAt)}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`${
                          star <= rev.rating
                            ? "text-yellow-400"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <p className=" text-sm leading-relaxed">
                    {rev.review}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
