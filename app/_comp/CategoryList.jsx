'use client'
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CategoryList = () => {
    const listRef=useRef(null)
    const [categoryList,setCategoryList]  = useState([]);
    const [selectedCategory,setSelectedCategory]  = useState('all');
    const params = useSearchParams();
    useEffect(()=>{
        setSelectedCategory(params.get('category'));
    },[params])
    useEffect(()=>{
        getCategoryList()
      },[])
      const getCategoryList=()=>{
        GlobalApi.GetCategory().then(resp=>{
            setCategoryList(resp.categories)
        })
      }
      const scrollRightHandler=()=>{
        if(listRef.current){
            listRef.current.scrollBy({
                left:200,
                behavior:'smooth'
            })
        }
      }
  return (
    <div className='mt-10 relative'>
        <div className='flex gap-4 overflow-hidden' ref={listRef}>
            {categoryList && categoryList.map((category,index)=>(
                <Link  href={'?category='+category.slug} 
                    key={index}
                    className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-orange-50 cursor-pointer group
                    ${selectedCategory==category.slug && 'text-primary border-primary bg-orange-50'}
                    `}
                >
                    <Image src={category.icon?.url} alt={category.name} width={40} height={40}
                        className='group-hover:scale-125 transition-all duration-200'
                    />
                    <h2 className='text-sm font-bold group-hover:text-primary'>{category.name}</h2>
                </Link>
            ))}
        </div>
        <ArrowRightCircle className='md:hidden absolute -right-10 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer'
            onClick={()=>scrollRightHandler()}
        />
    </div>
  )
}

export default CategoryList