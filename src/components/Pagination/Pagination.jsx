import { useMovieSearchContext } from '../../context/MovieSearchContext';
import  ControlButton from './ControlButton';
import PageLinks from './PageLinks';
import style from './Pagination.module.css';


const Pagination = () => {
  const {
    movies,
    currPageNum,
    numOfPages,
    handleButtonClick
  } = useMovieSearchContext();

  if (movies.length === 0) {
    return null;
  }

  return (
    <>
      <PageLinks />
      <div className={style['nav-btns']}>
        {currPageNum > 1 && 
          <ControlButton
            text='Prev Page' 
            onClickButton={() => { handleButtonClick(-1, 0) }} 
          />
        }
        {currPageNum < numOfPages && 
          <ControlButton
            text='Next Page' 
            onClickButton={() => { handleButtonClick(1, numOfPages) }} 
          />}
      </div>
    </>
  )
}

export default Pagination