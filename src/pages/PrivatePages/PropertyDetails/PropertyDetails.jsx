import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaTags,
  FaUser,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    // Fetch property
    fetch(`http://localhost:3000/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error(err));

    // Fetch reviews
    fetch(`http://localhost:3000/reviews?propertyId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviewsList(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!property)
    return (
      <p className="p-6 text-center text-gray-600 dark:text-gray-300 text-lg">
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
    };

    try {
      const res = await fetch(`http://localhost:3000/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) throw new Error("Failed to add review");
      const savedReview = await res.json();

      Swal.fire({
        icon: "success",
        title: "Review added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setReviewsList([...reviewsList, savedReview]);
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
          <h2 className="text-3xl font-bold dark:text-gray-100">
            {property.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {property.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-gray-800 dark:text-gray-200">
            <p className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaTags className="text-emerald-500" /> {property.category}
            </p>
            <p className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaDollarSign className="text-emerald-500" /> {property.price}
            </p>
            <p className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaMapMarkerAlt className="text-emerald-500" />{" "}
              {property.location}
            </p>
            <p className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaUser className="text-emerald-500" /> {property.userName} (
              {property.userEmail})
            </p>
            <p className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm dark:shadow-md">
              <FaCalendarAlt className="text-emerald-500" />{" "}
              {new Date(property.postedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold dark:text-gray-100">
          Ratings & Reviews
        </h3>

        {/* Add Review Form */}
        <div className="p-6 rounded-xl shadow-md dark:shadow-lg bg-gray-50 dark:bg-gray-800 space-y-4">
          <h4 className="font-medium dark:text-gray-200">Add Your Review</h4>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-500"
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
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          <button
            onClick={handleSubmitReview}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-medium transition"
          >
            Submit Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
          ) : (
            reviewsList.map((rev, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl shadow-sm dark:shadow-md bg-white dark:bg-gray-900 flex flex-col gap-2"
              >
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {rev.reviewerName} ({rev.reviewerEmail})
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`${
                        star <= rev.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{rev.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
