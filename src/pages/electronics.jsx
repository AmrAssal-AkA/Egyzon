import React from 'react'
import PS5 from '../assets/Products/Products Images/Ps5.webp'
import S25Ultra from '../assets/Products/Products Images/galaxy s25ultra .webp'
import MacBookPro from '../assets/Products/Products Images/Apple MacBook pro.jpeg'
import SonyHeadset from '../assets/Products/Products Images/Sony WH-1000XM4.avif'
import dell_xps from '../assets/Products/Products Images/dell xps.avif'
import Xbox_series_x from '../assets/Products/Products Images/xbox-series-x.webp'
import Nitnatio from '../assets/Products/Products Images/Nintianto.avif'
import microsoft_laptop from '../assets/Products/Products Images/microsoft surface pro 8.avif'
import Razor_Blade from '../assets/Products/Products Images/Razer blade 15.jpg'
import Airbods_pro from '../assets/Products/Products Images/Apple AirPods pro.jpg'
import Galaxy_tab_S8 from '../assets/Products/Products Images/Galaxy tap s8 ultra.jpeg'

    export const Electronics = [
        {
                id : 1,
                name : "Ps5",
                image : PS5,
                price : 30000
            },
            {
                id : 2,
                name : "Samsung Galaxy S25 ultra",
                image : S25Ultra,
                price : 20000
            },
            {
                id : 3,
                image : MacBookPro,
                name : "MacBook Pro M4",
                price : 150000
            },
            {
                id : 4,
                name : "Sony Headset",
                image : SonyHeadset,
                price : 1500
            },
            {
                id : 5,
                name : 'Xbox Series X',
                image : Xbox_series_x,
                price : 25000
            },
            {
                id : 6,
                name : "dell xps Laptop",
                image : dell_xps,
                price : 15000
            },
            {
                id : 7,
                name : "Ninitinto Switch Oled",
                image : Nitnatio,
                price : 25000
            },
            {
                id : 8, 
                name  : "microsoft surface Laptop",
                image : microsoft_laptop,
                price : 20000
            },
            {
                id : 9,
                name : "Razor Blade Laptop ",
                image : Razor_Blade,
                price : 25000
            },
            {
                id : 10 , 
                name : "Apple Airpods pro",
                image : Airbods_pro,
                price  : 15500
            },
            {
                id : 11,
                name : "galaxy Tab S8",
                image : Galaxy_tab_S8,
                price : 440000
            }
    ]


function electronics() {

return (
    <div className='mt-30'>
            <h1 className='text-3xl md:text-5xl font-bold text-center'>electronics section</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10'>
            {Electronics.map(electronic => (
            <div key={electronic.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                <img src={electronic.image} alt={electronic.name} className=' h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{electronic.name}</h2>
                <p className='text-lg font-bold'>{electronic.price} EGP</p>
                <div>
                <span>Rating: {electronic.rating} ⭐</span>
                <span>({electronic.reviews} reviews)</span>
                </div>
            </div>
        ) )}
            </div>
    </div>
)
}

export default electronics