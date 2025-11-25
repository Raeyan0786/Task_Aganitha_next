import React from 'react'

const Footer = () => {
  return (
    <section>
        <div className='w-[80%] pb-10 lg:pt-10 mx-auto flex flex-col lg:flex-row justify-between'>
            <div>
                <p className='text-sm font-semibold leading-6 text-white'>© 2024. All Rights Reserved. Made by Switcher.faiz!</p>
            </div>
            <div>
                <div className='flex flex-col lg:flex-row mt-2 gap-4 lg:gap-10'>
                    <p className='text-sm font-semibold leading-6 text-white'>Instructions</p>
                    <p className='text-sm font-semibold leading-6 text-white'>License</p>
                    <p className='text-sm font-semibold leading-6 text-white'>Terms of Use</p>
                    <p className='text-sm font-semibold leading-6 text-white'>Privacy</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer