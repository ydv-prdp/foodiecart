'use client'
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";


const Checkout = () => {
    const params = useSearchParams();
    const [userName, setUserName]=useState('')
    const [email, setEmail]=useState('')
    const [zip, setZip]=useState('')
    const [phone, setPhone]=useState('')
    const [address, setAddress]=useState('')
    const {user} = useUser();
    const [cart,setCart]=useState([]);
    const {updateCart,setUpdateCart} = useContext(CartUpdateContext)
    const [subTotal,setSubTotal]=useState(0);
    const [deliveryAmount,setDeliveryAmount]=useState(100)
    const [taxAmount, setTaxAmount]=useState(0)
    const [totalAmount,setTotalAmount]=useState(0)
    const [loading, setLoading]=useState(false)

    useEffect(()=>{
        console.log(params.get('restaurant'))
        user&&GetUserCart();
    },[user || updateCart])
    const GetUserCart=()=>{
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(res=>{
          setCart(res?.userCarts)
          calculateTotalAmount(res?.userCarts)
        })
      }
    const calculateTotalAmount=(cart_)=>{
        let total=0;
        cart_.forEach((item)=>{
            total=total+item.price;
        })
        setSubTotal(total)
        setTaxAmount(total*0.09)
        setTotalAmount(total+total*0.09+deliveryAmount)
    }
    const addToOrder=()=>{
        setLoading(true)
        const data={
            email:user?.primaryEmailAddress?.emailAddress,
            orderAmount: totalAmount, 
            restaurantName: params.get('restaurant'), 
            userName:user.fullName, 
            phone: phone, 
            zipcode: zip, 
            address: address
        }
        GlobalApi.CreateNewOrder(data).then(res=>{
            const resultId= res?.createOrder?.id;
            if(resultId){
              cart.forEach((item)=>{
                GlobalApi.updateOrderToAddOrderItem(item.productName,item.price, resultId,user?.primaryEmailAddress?.emailAddress)
                .then(res=>{
                    setLoading(false)
                    toast('Order Created Successfully')
                    setUpdateCart(!updateCart)
                },(error)=>{
                    setLoading(false)
                })
              })  
            }
        },(error)=>{
            setLoading(false)
        })
    }
  return (
    <div>
        <h2 className="font-bold text-2xl my-5">Checkout</h2>
        <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
            <div className="md:col-span-2 mx-20">
                <h2 className="font-bold text-3xl">Billing Details</h2>
                <div className="grid grid-cols-2 gap-10 mt-3">
                    <Input placeholder='Name' onChange={(e)=>setUserName(e.target.value)}/>
                    <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="grid grid-cols-2 gap-10 mt-3">
                    <Input placeholder='Phone' onChange={(e)=>setPhone(e.target.value)}/>
                    <Input placeholder='Zip' onChange={(e)=>setZip(e.target.value)}/>
                </div>  
                <div className="mt-3">
                    <Input placeholder='Address' onChange={(e)=>setAddress(e.target.value)}/>
                </div>
            </div>
            <div  className="mx-10 border">
                <h2 className="p-3 bg-gray-300 font-bold text-center">Total Cart ({cart?.length})</h2>
                <div className="p-4 flex flex-col gap-4">
                    <h2 className="font-bold flex justify-between">Subtotal : <span>{subTotal.toFixed(2)}</span></h2>
                    <hr></hr>
                    <h2 className="font-bold flex justify-between">Delivery : <span>{deliveryAmount.toFixed(2)}</span></h2>
                    <h2 className="font-bold flex justify-between">Tax (9%) : <span>{taxAmount.toFixed(2)}</span></h2>
                    <hr></hr>
                    <h2 className="font-bold flex justify-between">Total : <span>Rs. {totalAmount.toFixed(2)}</span></h2>
                    <Button onClick={()=>addToOrder()}>
                        {loading?<Loader className="animate-spin"/>:'Make Payment'}
                    </Button>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Checkout