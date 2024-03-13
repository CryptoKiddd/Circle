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
      {message && (
        <div className="absolute left-2 top-5 rounded-3xl px-4 py-2 " style={{background:color}} >
          <p className="text-white whitespace-nowrap text-sm leading-relaxed">{message}</p>
        </div>
      )}
    </div>
  )
}

export default Cursor