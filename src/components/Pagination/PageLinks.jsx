import NavLink from './NavLink';
import { useMovieSearchContext } from '../../context/MovieSearchContext';
import style from './Pagination.module.css';


const PageLinks = () => {
  const { 
    currPageNum,
    currBucket,
    lastBucket,
    PAGE_PER_BUCKET,
    numOfPages,
    numOfResults, 
    handlePageNumClick
  } = useMovieSearchContext();

  if (numOfResults === null) {
    return null;
  }

  const startPageNum = currBucket * PAGE_PER_BUCKET + 1;
  const endPageNum = (currBucket + 1) * PAGE_PER_BUCKET > numOfPages ? numOfPages : (currBucket + 1) * PAGE_PER_BUCKET;
  const prevBucketPageNum = startPageNum - PAGE_PER_BUCKET < 0 ? 0 : startPageNum - PAGE_PER_BUCKET;
  const nextBucketPageNum = endPageNum + 1 > numOfPages ? numOfPages : endPageNum + 1

  const PageNums = () => {
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
    <>
      <div className={style['page-numbers']}>
        {currBucket !== 0 && 
        <NavLink text='prev' onNavLinkClick={() => {handlePageNumClick(prevBucketPageNum)}} />
        }

        <PageNums />

        {currBucket !== lastBucket && 
        <NavLink text='next' onNavLinkClick={() => {handlePageNumClick(nextBucketPageNum)}} />
        }
      </div>
      <div className={style['page-location']}> {currPageNum} / {numOfPages} pages </div>
    </>
  )
}

export default PageLinks;
