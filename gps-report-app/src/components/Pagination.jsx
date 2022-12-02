export default function Pagination({ page, setPage, totalPage }) {
  const nextPage = (e) => {
    e.preventDefault();
    if (page + 1 > totalPage) return;
    setPage(page + 1);
  };

  const prevPage = (e) => {
    e.preventDefault();
    if (page === 1) return;
    setPage(page - 1);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link bg-dark btn-outline-primary font-montserrat"
                  onClick={prevPage}
                >
                  Previous
                </button>
              </li>
              {(() => {
                let td = [];
                for (let i = 1; i <= totalPage; i++) {
                  td.push(
                    <li className="page-item" key={i}>
                      <button
                        className="page-link bg-dark btn-outline-primary font-montserrat"
                        onClick={(e) => {
                          setPage(i);
                        }}
                      >
                        {i}
                      </button>
                    </li>
                  );
                }
                return td;
              })()}
              <li className="page-item">
                <button
                  className="page-link bg-dark btn-outline-primary font-montserrat"
                  onClick={nextPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
