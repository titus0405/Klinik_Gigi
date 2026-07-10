import React from 'react';
import './TopBanner.css';

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 7.1-1.01L12 2z" />
  </svg>
);

const CalIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
);

const TopBanner = () => {
  return (
    <div className="top-banner">
      <span className="top-banner__bg-text" aria-hidden="true">
        We Care For You Smile
      </span>
      <div className="top-banner__inner">
        <a className="top-banner__item" href="tel:02112345678">
          <PhoneIcon />
          <span>(021) 1234-5678</span>
        </a>

        <span className="top-banner__item top-banner__emergency">
          <CalIcon />
          <span>Janji Darurat &amp; Hari yang Sama Tersedia</span>
        </span>

        <span className="top-banner__item top-banner__rating">
          <span className="top-banner__stars">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </span>
          <span>Rating 5 Bintang</span>
        </span>
      </div>
    </div>
  );
};

export default TopBanner;
