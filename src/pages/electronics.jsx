import React from 'react'
import PS5 from '../assets/Products/Products Images/Ps5.webp'
import S25Ultra from '../assets/Products/Products Images/galaxy s25ultra .webp'
import MacBookPro from '../assets/Products/Products Images/Apple MacBook pro.jpeg'
import SonyHeadset from '../assets/Products/Products Images/Sony WH-1000XM4.avif'
import LgoledTv from '../assets/Products/Products Images/Lg Oled tv.webp'
import echo_dot from '../assets/Products/Products Images/eho dot.jpeg' 
import fitCharge_bit from '../assets/Products/Products Images/Fitbit charge 5.jpeg'
import gopro_hero10 from '../assets/Products/Products Images/GoPro hero10.jpeg'
import dell_xps from '../assets/Products/Products Images/dell xps.avif'
import xbox_series_x from '../assets/Products/Products Images/xbox-series-x.webp'
import Nitnatio from '../assets/Products/Products Images/Nintianto.avif'
import microsoft_laptop from '../assets/Products/Products Images/microsoft surface pro 8.avif'
import Razor_Blade from '../assets/Products/Products Images/Razer blade 15.jpg'
import Airbods_pro from '../assets/Products/Products Images/Apple AirPods pro.jpg'
import Galaxy_tab_S8 from '../assets/Products/Products Images/Galaxy tap s8 ultra.jpeg'

function electronics() {
    let electronics =[
        {
            id :1,
            name : "Playstation 5",
            image : PS5,
            price : 499.99,
            description : "Next-gen gaming console with stunning graphics and fast load times.",
            rating : 4.5,
            reviews : 1200
        },
        {
            id : 2, 
            name : "Samsung Galaxy S25 ultra",
            image : S25Ultra,
            price : 799.99,
            description : "Latest flagship smartphone with cutting-edge features and performance.",
            rating : 4.8,
            reviews : 1500 
        },
        {
            id : 3, 
            name : "Apple MacBook Pro",
            image : MacBookPro,
            price : 1299.99,
            description : "Powerful laptop with M1 chip, perfect for professionals and creatives.",
            rating : 4.7,
            reviews : 800
        },
        {
            id : 4,
            name : "Sony WH-1000XM4",
            image : SonyHeadset,
            price : 349.99,
            description : "Industry-leading noise-canceling headphones with exceptional sound quality.",
            rating : 4.6,
            reviews : 600
        },
        {
            id : 5,
            name : "LG OLED TV",
            image : LgoledTv,
            price : 1999.99,
            description : "Stunning 4K OLED TV with vibrant colors and incredible contrast.",
            rating : 4.9,
            reviews : 300   
        },
        {
            id : 6,
            name : "Amazon Echo Dot",
            image : echo_dot,
            price : 49.99,
            description : "Smart speaker with Alexa voice assistant, perfect for controlling your smart home.",
            rating : 4.4,
            reviews : 2000
        },
        {
            id : 7,
            name : "Fitbit Charge 5",
            image : fitCharge_bit,
            price : 149.99,
            description : "Advanced fitness tracker with health monitoring features and GPS.",
            rating : 4.3,
            reviews : 1000
        },
        {
            id : 8,
            name : "GoPro HERO10",
            image : gopro_hero10,
            price : 399.99,
            description : "Action camera with 5.3K video recording and advanced stabilization.",
            rating : 4.5,
            reviews : 700
        },
        {
            id : 9,
            name : "Dell XPS 13",
            image : dell_xps,
            price : 999.99,
            description : "Ultrabook with sleek design, powerful performance, and long battery life.",
            rating : 4.8,
            reviews : 400
        },
        {
            id : 10,
            name : "xbox series x",
            image : xbox_series_x,
            price : 499.99,
            rating : 4.9,
            reviews : 300
        }, 
        {
            id : 11,
            name : "Nintendo Switch",
            image : Nitnatio,
            price : 299.99,
            description : "Hybrid gaming console that can be used at home or on the go.",
            rating : 4.6,
            reviews : 900
        },
        {
            id : 12,
            name : "Microsoft Surface Pro 8",
            image : microsoft_laptop,
            price : 1099.99,
            description : "2-in-1 laptop with touchscreen and detachable keyboard, ideal for productivity.",
            rating : 4.5,
            reviews : 300
        },
        {
            id : 13,
            name : "Razer Blade 15",
            image : Razor_Blade,
            price : 1999.99,
            description : "High-performance gaming laptop with powerful graphics and sleek design.",
            rating : 4.8,
            reviews : 200
        },
        {
            id : 14,
            name : "Apple AirPods Pro",
            image : Airbods_pro,
            price : 249.99,
            description : "Wireless earbuds with active noise cancellation and transparency mode.",
            rating : 4.6,
            reviews : 1500
        },
        {
            id : 15,
            name : "Samsung Galaxy Tab S8",
            image : Galaxy_tab_S8,
            price : 649.99,
            description : "Premium Android tablet with S Pen support and high-resolution display.",
            rating : 4.7,
            reviews : 600
        }


    ]
return (
    <div className='mt-30'>
            <h1 className='text-3xl md:text-5xl font-bold text-center'>electronics section</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10'>
            {electronics.map(electronic => (
            <div key={electronic.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                <img src={electronic.image} alt={electronic.name} className=' h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{electronic.name}</h2>
                <p className='text-lg font-bold'>${electronic.price}</p>
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