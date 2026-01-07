import React from 'react';

const Loading = ({ size = "base" }) => {
  const styles = {
    // Responsive: fills parent, icon is 50% of container width
    base: "w-full h-full flex items-center justify-center p-4",
    // Stands in place of a button
    small: "inline-flex items-center justify-center py-2 px-6",
  };

  const loaderSize = size === "base" ? "w-1/2 h-1/2" : "w-6 h-5";

  return (
    <div className={styles[size]}>
      <svg
        className={`${loaderSize} animate-spin`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)">
            {/* The dots are colored in varying shades of gray to match your image */}
            <circle cx="5" cy="12" r="2" fill="#9CA3AF" /> {/* Light Gray */}
            <circle cx="7.05" cy="7.05" r="2" fill="#6B7280" /> {/* Medium Gray */}
            <circle cx="12" cy="5" r="2" fill="#4B5563" /> {/* Dark Gray */}
            <circle cx="16.95" cy="7.05" r="2" fill="#374151" /> {/* Very Dark Gray */}
            <circle cx="19" cy="12" r="2" fill="#1F2937" /> {/* Near Black */}
            <circle cx="16.95" cy="16.95" r="2" fill="#111827" /> {/* Black */}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loading;