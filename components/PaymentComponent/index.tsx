import React from 'react'
import { InputComponent } from '../InputComponent'
import Image, { StaticImageData } from 'next/image'
import { CreditCard,PayPal,Stripe,MasterCard,GooglePay,Pay } from '@/image'

// import {InputComponent} from '@/components'
type ImageType={
  id:number,
  name:string,
  url:StaticImageData
}
const ImageObject:ImageType[]=[
  {
    id:1,
    name:"Visa",
    url:CreditCard
  },
  {
    id:2,
    name:"Visa",
    url:Stripe
  },
  {
    id:3,
    name:"Visa",
    url:PayPal
  },
  {
    id:4,
    name:"Visa",
    url:MasterCard
  },
  {
    id:5,
    name:"Visa",
    url:GooglePay
  }
]

function PaymentComponent() {
  return (
    <section className='w-[80%] flex items-center justify-center mt-10 py-20 bg-white rounded-lg'>
        <div className='w-[40%] hidden  sm:flex items-center justify-center'>
          <Image
          src={Pay}
          alt=''
          width={244}
          height={346}
          />
        </div>
        <div className='w-[90%] lg:w-[60%]'>
            
            <div className='w-[90%] mx-auto'>
            <h3 className='text-2xl lg:text-3xl font-semibold leading-8'>Complete registration page</h3>
            <p className='text-xl font-bold leading-10'>Personal details</p>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 mx-auto'>
                <InputComponent label="Persoal Details" placeholder="Address Line"  />
                <InputComponent label="Persoal Details" placeholder="Address Line1"  />
            </div>

            <div>
            <p className='text-xl font-bold leading-10 '>Card details</p>
            <div className='flex gap-5 '>
            {ImageObject.map((item:ImageType)=>(
              <div key={item.id}>
                <Image
                src={item.url}
                alt={item.name}
                width={70}
                height={48}
                />
                </div>
              ))}
            </div>
              
            </div>

            <p className='text-xl font-bold leading-10 '>Card details</p>
            <div className='grid grid-cols-1 gap-3 mx-auto'>
                <InputComponent label="Persoal Details" placeholder="Address Line"  />
                <InputComponent label="Persoal Details" placeholder="Address Line1"  />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto my-3'>
                <InputComponent label="Persoal Details" placeholder="Address Line"  />
                <InputComponent label="Persoal Details" placeholder="Address Line1"  />
            </div>
            <button className='w-full flex justify-center py-4 bg-[#12372A] rounded-lg mt-5 text-white'>Next</button>
            </div>

            

        </div>
    </section>
  )
}

export default PaymentComponent