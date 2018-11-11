import React from 'react'
import { CSSTransition } from 'react-transition-group';
import { Pagination } from 'semantic-ui-react'

const PaginationMenu = ({ activePage, books, handleChange }) => (
  <CSSTransition
    classNames='pagination'
    timeout={1000}
  >
    <Pagination
      activePage={activePage}
      onPageChange={books.length > 6 ? handleChange : null}
      totalPages={Math.ceil(books.length/5)}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      prevItem={null}
      nextItem={null}
    />
  </CSSTransition>
)

export default PaginationMenu;