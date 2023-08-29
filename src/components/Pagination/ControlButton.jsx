import style from './Pagination.module.css'


const ControlButton = ( { 
  text,
  onClickButton  
}) => {
  return (
    <button className={style.btn} onClick={onClickButton}>{text}</button>
  )
}

export default ControlButton;