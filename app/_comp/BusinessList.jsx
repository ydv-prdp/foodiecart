import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import BusinessItem from "./BusinessItem";
import BusinessItemSkeleton from "./BusinessItemSkeleton";


const BusinessList = () => {
  const params=useSearchParams();
  const [category,setCategory]=useState('all');
  const [businessList, setBusinessList]=useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    params&&setCategory(params.get('category'))
    params&&getBusinesssList(params.get('category'))
  },[params])
  const getBusinesssList=(category_)=>{
    setLoading(true)
    GlobalApi.GetBusinessList(category_).then(resp=>{
        setBusinessList(resp?.restaurants)
        setLoading(false)
    })
  }
  return (
    <div>
      <h2 className="font-bold text-2xl">Popular {category} restaurants</h2>
      <h2 className="font-bold text-primary">{businessList?.length} Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3">
        {!loading? businessList.map((restaurant,index)=>(
          <BusinessItem
            key={index}
            business={restaurant}
          />
        )):
        [1,2,3,4,5,6,7,8].map((item,index)=>(
          <BusinessItemSkeleton key={index}/>
        ))
        
        }
      </div>
    </div>
  )
}

export default BusinessList