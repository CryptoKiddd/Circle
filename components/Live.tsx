import {useCallback, useEffect, useState} from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import CursorChat from './cursor/CursorChat'
import { CursorMode, CursorState } from '@/types/type'

function Live() {
    const others = useOthers()
    const [{cursor}, updateMyPresence] = useMyPresence() as any
   const [cursorState, setCursorState] = useState<CursorState>({
    mode:CursorMode.Hidden
   })

  const handlePointerMove = useCallback(
     (event:React.PointerEvent) => {
        event.preventDefault()

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y
        updateMyPresence({
            cursor:{x,y}
        })
       
     },
     [],
   )

   const handlePointerLeave = useCallback(
     (event:React.PointerEvent) => {
        setCursorState({mode:CursorMode.Hidden})
        updateMyPresence({
            cursor:null,
            message:null
        })
       
     },
     [],
   )
   const handlePointerDown= useCallback(
    (event:React.PointerEvent) => {
       

       const x = event.clientX - event.currentTarget.getBoundingClientRect().x
       const y = event.clientY - event.currentTarget.getBoundingClientRect().y
       updateMyPresence({
           cursor:{x,y}
       })
      
    },
    [],
  )
   useEffect(()=>{
    const onKeyUp=(e:KeyboardEvent):void=>{
      if(e.key === '/'){
        setCursorState({
          mode:CursorMode.Chat,
          message:'',
          previousMessage:null
        })
      }else if(e.key === 'Escape'){
        updateMyPresence({message:''})
        setCursorState({mode:CursorMode.Hidden})
      }

    }


    const onKeyDown=(e:KeyboardEvent):void=>{
      if(e.key === '/'){
        e.preventDefault()
      }
    }

    window.addEventListener('keyup',onKeyUp)
    window.addEventListener('keydown',onKeyDown)
    return()=>{
      window.removeEventListener('keyup',onKeyUp)
      window.removeEventListener('keydown',onKeyDown)
    }


   },[updateMyPresence])

  return (
    <div
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}
    onPointerDown={handlePointerDown}
    className="h-[100vh] border-2 border-green-500 text-center w-full flex justify-center items-center relative" 


>
<h1 className="font-xl text-white">works</h1>

        {cursor && (
          <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}          />
        )}
        <LiveCursors others={others} />
    </div>
  )
}

export default Live