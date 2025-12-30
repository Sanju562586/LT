// StarRating.js
import React from 'react';

const StarRating = ({ count }) => {
    return (
        <span className="star-rating">
            {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={i <= count ? "filled" : "empty"}>
                    {i <= count ? "⭐" : "☆"}
                </span>
            ))}
        </span>
    );
};

export default StarRating;
