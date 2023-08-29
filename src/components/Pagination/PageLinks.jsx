import PageNums from './PageNums';
import { useMovieSearchContext } from '../../context/MovieSearchContext';
import style from './Pagination.module.css';


const PageLinks = () => {
  const { 
    currPageNum,
    currBucket,
    lastBucket,
    numOfPages,
    numOfResults, 
    handlePrevClick,
    handleNextClick
  } = useMovieSearchContext();

  if (numOfResults === null) {
    return null;
  }

  return (
    <>
      <div className={style['page-numbers']}>
        {currBucket !== 0 && <span onClick={() => { handlePrevClick(-10) }}> prev... </span>}
        <PageNums />
        {currBucket !== lastBucket && <span onClick={ () => { handleNextClick(10) }}> next ...</span>}

      </div>
      <div className={style['page-location']}> { currPageNum } / {numOfPages} pages </div>
    </>
  )
}

export default PageLinks;
