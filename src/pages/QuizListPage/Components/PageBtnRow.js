import PageButton from "./PageButton";
import React from "react";


const Pagination = ({startPage, setStartPage, currentPage, setCurrentPage, totalPages, onPageChange}) => {
    let pageNumbers = []; // pageNumbers를 let으로 변경

    const maxVisibleButtons = 5;

    const renderPageNumbers = () => {
        pageNumbers = []; // 페이지 렌더링 전에 배열을 초기화
        for (let i = startPage; i <= Math.min(startPage + maxVisibleButtons - 1, totalPages); i++) {
            pageNumbers.push(
                <PageButton
                    key={i}
                    pageNumber={i}
                    isActive={i === currentPage}
                    onClick={onPageChange}
                />
            );
        }
        return pageNumbers;
    };

    const handleNext = () => {
        if (startPage + maxVisibleButtons <= totalPages) {
            const nextTemp = startPage + maxVisibleButtons
            setStartPage(nextTemp);
            setCurrentPage(nextTemp);
        }
    };

    const handlePrev = () => {
        if (startPage > 1) {
            // setStartPage(startPage - 1);
            const nextTemp = startPage - maxVisibleButtons
            setStartPage(nextTemp);
            setCurrentPage(nextTemp);
        }
    };

    return (
        <div className="flex mt-4 items-center">
            {startPage > 1 && (
                <button className="px-2 py-1 mx-4 bg-gray-700 text-sm text-white rounded-md"
                        onClick={handlePrev}>
                    이전
                </button>
            )}
            {renderPageNumbers()}
            {startPage + maxVisibleButtons - 1 < totalPages && (
                <button className="px-2 py-1 mx-4 bg-gray-700 text-sm text-white rounded-md"
                        onClick={handleNext}>
                    다음
                </button>
            )}
        </div>
    );
};

const PageBtnRow = (props) => {

    return (
        <div className={props.style}>
            <Pagination
                startPage={props.startPage}
                setStartPage={props.setStartPage}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
                totalPages={props.totalPages}
                onPageChange={props.onPageChange}
            />
        </div>
    );
}

export default PageBtnRow;