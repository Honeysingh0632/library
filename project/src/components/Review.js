import React, { useState } from 'react';

const Review = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedReview({ review, rating });
    setReview('');
    setRating(0);
  };

  return (
    <div>
      <h1 className='bold-text '>Post a Review</h1>
      <form onSubmit={handleSubmit} className='mt-3'>
        {/* <label htmlFor="review">Your Review:</label><br/> */}
        <textarea
        className='input-review'
          id="review"
          name="review"
          rows="4"
          cols="40"
         placeholder='your review'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        /><br/><br/>
        
        <label>Your Rating:</label>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? 'on' : 'off'}
                onClick={() => setRating(index)}
                onMouseEnter={() => setRating(index)}
                onMouseLeave={() => setRating(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div><br/>
        
        <input type="submit" className='btn-submit-foot' value="Submit Review"/>
      </form>

      {submittedReview && (
        <div className="submitted-review">
        
          {/* <p><strong>Review:</strong> {submittedReview.review}</p>
          <p><strong>Rating:</strong> {submittedReview.rating} / 5</p> */}
        </div>
      )}
    </div>
  );
};

export default Review;
