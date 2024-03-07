type Props = {
    color:string,
    message:string,
    x:number,
    y:number
}

function Cursor({
    color,x,y,message
}:Props) {
  return (
    <div>Cursor</div>
  )
}

export default Cursor