import React, { useEffect, useState } from 'react'

const Paginacion = ({ totalItems, itemsPerPage, currentPage, page }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [disabledNext, setDisabledNext] = useState(false)
    const [disabledPrev, setDisabledPrev] = useState(false)

    useEffect(() => {
        setDisabledNext(page === totalPages);
        setDisabledPrev(page === 1);
      }, [page, totalPages]);

    const handlePageChange = (newPage) => {
        currentPage(newPage);
    };


    const handleNextOrPreviusPage = (accion) => {
        if(accion === "siguiente"){
            currentPage(page + 1)

        }else if(accion === "anterior"){
            currentPage(page - 1)
        }
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <div>
                    <div style={{ background: "white", padding: "3px 10px", borderRadius: "5px" }}
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
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                <button disabled={disabledPrev} onClick={() => handleNextOrPreviusPage("anterior")}>Anterior</button>
                {renderPageNumbers()}
                <button disabled={disabledNext} onClick={() => handleNextOrPreviusPage("siguiente")}>Siguiente</button>
            </div>
        </div>
    );
};

export default Paginacion