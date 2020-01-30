import React from 'react';

const Pagination = (props) => {
  const {trains, count, limit, currentPage, setCurrentPage} = props;
  const pages = new Array(Math.ceil(count / limit)).fill('');
  

  const handleClick = event => {
    if (!event.target.classList.contains('page')) {
      return;
    }

    if (event.target.classList.contains('page-previous') && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (event.target.classList.contains('page-next') && currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    } else if ((currentPage === 1 || currentPage === pages.length) && (event.target.classList.contains('page-previous') || event.target.classList.contains('page-next'))) {
      return;
    } else {
      setCurrentPage(+event.target.textContent)
    }

    const beginning = document.querySelector('.col-right').offsetTop;
    window.scrollTo({
      top: beginning,
      behavior: 'smooth'
    })
  }
  
  return count > 0 && trains.length > 0 ? (
    <div className="pagination" onClick={handleClick}>
      {count > 1 && <i className="fas fa-chevron-left page page-previous"></i>}
      <ul>
        {pages.map((p, i) => <li key={i} className={currentPage === i + 1 ? "page page-current" : "page"}>{i + 1}</li>)}
      </ul>
      {count > 1 && <i className="fas fa-chevron-right page page-next"></i>}
    </div>
  ) : null;
}

export {Pagination}