import React from 'react'
import { Spinner } from "@/components/ui/spinner"

function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner />
    </div>
  )
}

export default Loading