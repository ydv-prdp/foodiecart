import { MapPin } from "lucide-react"
import Image from "next/image"

const Intro = ({restroInfo}) => {
  return (
    <div>
        {restroInfo?.banner?.url? <div>
            <Image src={restroInfo?.banner?.url} width={1000} height={1000} 
                className="w-full h-[300px] object-cover rounded-xl" alt="banner"/>
        </div>:
          <div className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"></div>  
        }
        <h2 className="text-3xl font-bold mt-2">{restroInfo.name}</h2>
        <div className="flex items-center gap-2 mt-2">
            <Image src={'/star.png'} alt="star" width={20} height={20}/>
            <label className="text-gray-500">4.5 (56)</label>
        </div>
        <h2 className="text-gray-500 mt-2 capitalize flex gap-2 items-center">
            <MapPin/>
            {restroInfo?.address}
        </h2>
    </div>
  )
}

export default Intro