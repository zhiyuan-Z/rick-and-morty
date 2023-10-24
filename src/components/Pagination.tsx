import styles from "@/styles/Pagination.module.css";

type PaginationProps = {
  currentPage: number | undefined;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

type PaginationNumberProps = {
  number: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
};

function PaginationButton({
  number,
  onPageChange,
  currentPage,
}: PaginationNumberProps) {
  return (
    <button
      className={`${styles.button} ${
        number === currentPage ? styles.active : ""
      }`}
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (currentPage)
    return (
      <div className={styles.container}>
        <button
          className={styles.button}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
        <PaginationButton
          number={1}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
        {currentPage > 3 && (
          <span key="ellipsis-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </span>
        )}
        {currentPage > 3 && (
          <>
            <PaginationButton
              number={currentPage - 2}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
            <PaginationButton
              number={currentPage - 1}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
          </>
        )}
        {currentPage !== 1 && currentPage !== totalPages && (
          <PaginationButton
            number={currentPage}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        )}
        {currentPage < totalPages - 2 && (
          <>
            <PaginationButton
              number={currentPage + 1}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
            <PaginationButton
              number={currentPage + 2}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
          </>
        )}
        {currentPage < totalPages - 3 && (
          <span key="ellipsis-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </span>
        )}
        <PaginationButton
          number={totalPages}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
        <button
          className={styles.button}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    );
}
