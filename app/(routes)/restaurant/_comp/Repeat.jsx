import Image from 'next/image'
import React, { useState } from 'react'

const Repeat = ({reviewLists}) => {
  return (
    <div className="flex flex-col gap-5">
    {reviewLists && reviewLists.map((review,index)=>(
        <div key={index}>
            <Image src={review.profileImage} width={50} height={50} alt="Profile Image"
                className="rounded-full"
            />
            <div>
                <h2>{review.userName}</h2>
                <h2>{review.reviewText}</h2>
            </div>
        </div>
        
    ))}
</div>
  )
}

export default Repeat