'use client'
import GlobalApi from "@/app/_utils/GlobalApi"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import {Rating as ReactRating} from '@smastrom/react-rating'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ReviewList from "./ReviewList"


const ReviewSection = ({restroInfo}) => {
    const [rating,setRating] = useState(0)
    const [reviewText,setReviewText] = useState();
    const [reviewList,setReviewList]=useState([])
    const {user}=useUser();
    useEffect(()=>{
        restroInfo&&getReviewList();
    },[restroInfo])
    const handleSubmit=()=>{
        const data={
            email:user?.primaryEmailAddress?.emailAddress,
            profileImage:user?.imageUrl,
            userName:user?.fullName,
            star:rating,
            reviewText:reviewText,
            slug:restroInfo?.slug
        }
        GlobalApi.AddNewReviews(data).then(res=>{
            toast('Review Added')
            res&&getReviewList();
        })  
    }
    const getReviewList=()=>{
        GlobalApi.getRestaurantReviews(restroInfo?.slug).then(res=>{
            setReviewList(res?.reviews)
        })
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
        <div className="flex flex-col gap-2 p-5 border rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">
                Add your reviews
            </h2>
            <div className="w-[180px]">
                <ReactRating value={rating} onChange={setRating}/>
            </div>
            <Textarea onChange={(e)=>setReviewText(e.target.value)}/>
            <Button disabled={rating===0 || !reviewText} onClick={()=>handleSubmit()}>Submit</Button>
        </div>
        <div className="col-span-2">
            <ReviewList reviewList={reviewList}/>
        </div>
    </div>
  )
}

export default ReviewSection