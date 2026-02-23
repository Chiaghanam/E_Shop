// StarRating.jsx
import React from 'react';

const StarRating = ({ rating, maxStars = 5, size = 20, color = '#ffc107', showRating = false }) => {
    // Ensure rating is between 0 and maxStars
    const normalizedRating = Math.max(0, Math.min(rating, maxStars));

    return (
        <div className="d-flex align-items-center gap-1">
            <div className="d-flex align-items-center" style={{ gap: '2px' }}>
                {[...Array(maxStars)].map((_, index) => {
                    const fillPercentage = Math.max(0, Math.min(1, normalizedRating - index)) * 100;

                    return (
                        <div key={index} className="position-relative d-inline-block" style={{ lineHeight: 0 }}>
                            {/* Empty star (background) */}
                            <svg
                                width={size}
                                height={size}
                                viewBox="0 0 24 24"
                                fill="#e0e0e0"
                                style={{ display: 'block' }}
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>

                            {/* Filled star (overlay) */}
                            <svg
                                width={size}
                                height={size}
                                viewBox="0 0 24 24"
                                fill={color}
                                className="position-absolute top-0 start-0"
                                style={{
                                    clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                                    display: 'block'
                                }}
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    );
                })}
            </div>
            {showRating && (
                <small className="text-muted ms-2">
                    {normalizedRating.toFixed(1)} / {maxStars}
                </small>
            )}
        </div>
    );
};

export default StarRating;