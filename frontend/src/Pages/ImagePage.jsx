import React from 'react'

function ImagePage() {
  const { id } = useParams();
  return (
    <div className='w-full h-full bg-cover'>
        <img src={`${id}`} alt="" srcset="" />
    </div>
  )
}

export default ImagePage