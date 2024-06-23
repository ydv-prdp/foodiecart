'use client'
import GlobalApi from "@/app/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Intro from "../_comp/Intro";
import Tabs from "../_comp/TabsItem";

const RestaurantDetails = () => {
    const param = usePathname();
    const [restaurantDetails, setRestaurantDetails]=useState([])
    useEffect(()=>{
        GetRestaurantDetails(param.split("/")[2])
    },[])
    const GetRestaurantDetails=(restroSlug)=>{
        GlobalApi.GetBusinessDetails(restroSlug).then(resp=>{
            setRestaurantDetails(resp.restaurant)
        })
    }
  return (
    <div>
        <Intro restroInfo={restaurantDetails}/>
        <Tabs restroInfo={restaurantDetails}/>
    </div>
  )
}

export default RestaurantDetails