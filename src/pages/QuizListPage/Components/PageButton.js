import React from "react";

const PageButton = ({ pageNumber, isActive, onClick }) => {
    const activeStyles = isActive
        ? 'bg-gray-700 text-white'
        : 'bg-white text-gray-700';
    return (
        <button
            className={`px-3 py-1 mx-1 ${activeStyles} text-center border border-gray-700 rounded-md`}
            onClick={() => onClick(pageNumber)}
        >
            {pageNumber}
        </button>
    );
};

export default PageButton;