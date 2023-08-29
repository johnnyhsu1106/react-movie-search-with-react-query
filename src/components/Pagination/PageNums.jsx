import { useMemo, useState } from 'react';
import { useMovieSearchContext } from '../../context/MovieSearchContext';
import style from './Pagination.module.css';

const PAGE_PER_BUCKET = 10;


const PageNums = () => {
  const { 
    currPageNum,
    currBucket,
    numOfPages,
    handlePageNumClick 
  } = useMovieSearchContext();


  const {startPageNum, endPageNum} = useMemo(() => {
    const startPageNum = currBucket * PAGE_PER_BUCKET + 1;
    const endPageNum = (currBucket + 1) * PAGE_PER_BUCKET > numOfPages ? numOfPages : (currBucket + 1) * PAGE_PER_BUCKET;
  
    return {startPageNum, endPageNum}
    
  }, [currBucket, numOfPages]);

    
  const PageNumsComponent = () => {
    const PageNums = [];
    for (let pageNum = startPageNum; pageNum <= endPageNum; pageNum++) {
      const activePage = pageNum === currPageNum ? style.active : '';
  
      PageNums.push(
        <span
          className={`${style['page-number']} ${activePage}`}
          key={pageNum}
          onClick={() => { handlePageNumClick(pageNum) }}
        >
          {pageNum}
        </span>
      );
    }
    return PageNums;
  }

  return ( 
    <PageNumsComponent />    
  )
}

export default PageNums
