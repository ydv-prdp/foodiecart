'use client'
import Image from "next/image";
import CategoryList from "./_comp/CategoryList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect } from "react";
import BusinessList from "./_comp/BusinessList";

export default function Home() {
 
  return (
    <div>
      <CategoryList/>
      <BusinessList/>
    </div>
  );
}
