import styles from "./Pagination.module.css";

export interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (n: number) => void;
}

const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav className={styles.pagination}>
      <ul className={styles.list}>
        <li>
          <a className={styles.pageNum} onClick={prevPage}>
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className={
                currentPage == pgNumber ? styles.pageNumActive : styles.pageNum
              }
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li>
          <a onClick={nextPage} className={styles.pageNum}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
