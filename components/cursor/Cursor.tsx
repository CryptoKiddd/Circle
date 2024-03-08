import CursorSVG from "@/public/assets/CursorSVG"

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
    <div className="pointer-events-none absolute " style={{ top:`${y}px`, left:`${x}px`}}>
      <CursorSVG color={color} />
    </div>
  )
}

export default Cursor