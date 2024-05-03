import { useState } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const next = () => "nextPage";
  const prev = () => "prevPage";
  const jump = () => "jump";

  return { next, prev, jump, currentPage };
};

export default usePagination;
