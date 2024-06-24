import Image from "next/image"
import {Rating as ReactRating} from '@smastrom/react-rating'
import moment from "moment"


const ReviewList = ({reviewList}) => {
  return (
    <div className="flex flex-col gap-5">
        {reviewList ? reviewList.map((review,index)=>(
            <div key={index} className="flex gap-5 items-center border rounded-lg p-5">
                <Image src={review?.profileImage} width={50} height={50} alt="Profile Image"
                    className="rounded-full"
                />
                <div>
                    <h2 className="text-sm capitalize">{review.reviewText}</h2>
                    <div className="w-[15%]">
                        <ReactRating value={review.star} 
                            isDisabled={true}
                        />
                    </div>
                   
                    <h2 className="text-sm">
                        <span className="font-bold capitalize">{review.userName}</span> at {moment(review.publishedAt).format('DD-MM-yyyy')}</h2>
                </div>
            </div>
        ))
        :[1,2,3,4].map((item,index)=>(
            <div className="h-[100px] w-full bg-slate-200 animate-pulse rounded-lg">

            </div>
        ))
        }
    </div>
  )
}

export default ReviewList