'use client'
const CardHr = ({ top, bottom}) => {
  return (
      <>
        <div style={{ height: top }}></div>
        <hr/>
        <div style={{ height: bottom }}></div>
      </>
  )
}
export default CardHr