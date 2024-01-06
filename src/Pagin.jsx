import PropTypes from "prop-types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

function Pagin({ dispatch, metaData }) {
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        {metaData.page > 1 && (
          <>
            <PaginationItem onClick={() => dispatch({ type: "prevPage" })}>
              <PaginationPrevious />
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink href="#">
            {metaData.page}-{metaData.totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem></PaginationItem>
        {metaData.page < metaData.totalPages && (
          <>
            <PaginationItem onClick={() => dispatch({ type: "nextPage" })}>
              <PaginationNext />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}

Pagin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  metaData: PropTypes.object.isRequired,
};

export default Pagin;
