import { useMovieSearchContext } from '../../context/MovieSearchContext';
import  PaginationButton from './PaginationButton';
import PageLinks from './PageLinks';
import style from './Pagination.module.css';


const Pagination = () => {
  const {
    movies,
    currPageNum,
    numOfPages,
    handlePrevClick,
    handleNextClick
  } = useMovieSearchContext();

  if (movies.length === 0) {
    return null;
  }

  return (
    <>
      <PageLinks />
      <div className={style['nav-btns']}>
        <PaginationButton
          onClickButton={ currPageNum === 1 ? null : () => { handlePrevClick(-1) }} 
          text='Prev Page'/>

        <PaginationButton
          onClickButton={ currPageNum === numOfPages ? null : () => { handleNextClick(1)}} 
          text='Next Page'/>
      </div>
    </>
  )
}

export default Pagination