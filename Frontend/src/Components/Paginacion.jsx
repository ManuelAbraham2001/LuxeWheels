import React, { useEffect, useState } from 'react'

const Paginacion = ({ totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        onPageChange(currentPage);
    }, [currentPage, onPageChange]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <div>
                    <div style={{background: "white", padding: "3px 10px", borderRadius: "5px"}}
                        key={i}
                        className={i === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </div>
                </div>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination">
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
            {renderPageNumbers()}   
            </div>
        </div>
    );
};

export default Paginacion