import { useMovieSearchContext } from '../../context/MovieSearchContext';
import  ControlButton from './ControlButton';
import PageLinks from './PageLinks';
import style from './Pagination.module.css';


const Pagination = () => {
  const {
    movies,
    currPageNum,
    numOfPages,
    handlePrevBtnClick,
    handleNextBtnClick,
  } = useMovieSearchContext();

  if (movies.length === 0) {
    return null;
  }

  return (
    <>
      <PageLinks />
      <div className={style['nav-btns']}>
        {currPageNum > 1 && <ControlButton onClickButton={ handlePrevBtnClick } text='Prev Page'/>}
        {currPageNum < numOfPages && <ControlButton onClickButton={ handleNextBtnClick } text='Next Page'/>}
      </div>
    </>
  )
}

export default Pagination