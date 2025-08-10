import React from 'react'
import { Link , useParams} from 'react-router-dom'
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


import electronics from '../assets/HomePage/electronic-cat.png';
import Groceries from '../assets/HomePage/Groceries-Bannerjpeg.jpeg';
import Fashion from '../assets/HomePage/fashion.png'
import Books from '../assets/HomePage/Books.png'
import CarCare from '../assets/HomePage/car-care.jpg'
import Toys from '../assets/HomePage/Toys.png'
import sports from '../assets/HomePage/sport.png'
import HomeAppliance from '../assets/HomePage/HomeAppliance.png'

    export const Products = [
                {
                        id : 1,
                        name : "Ps5",
                        image : PS5,
                        price : 30000,
                    link : '/product/1'
                    },
                    {
                        id : 2,
                        name : "Samsung Galaxy S25 ultra",
                        image : S25Ultra,
                        price : 20000,
                        link : '/product/2'
                    },
                    {
                        id : 3,
                        image : MacBookPro,
                        name : "MacBook Pro M4",
                        price : 150000,
                        link : '/product/3'
                    },
                    {
                        id : 4,
                        name : "Sony Headset",
                        image : SonyHeadset,
                        price : 1500,
                        link : '/product/4'
                    },
                    {
                        id : 5,
                        name : 'Xbox Series X',
                        image : Xbox_series_x,
                        price : 25000,
                        link : '/product/5'
                    },
                    {
                        id : 6,
                        name : "dell xps Laptop",
                        image : dell_xps,
                        price : 15000,
                        link : '/product/6'
                    },
                    {
                        id : 7,
                        name : "Ninitinto Switch Oled",
                        image : Nitnatio,
                        price : 25000,
                        link : '/product/7'
                    },
                    {
                        id : 8, 
                        name  : "microsoft surface Laptop",
                        image : microsoft_laptop,
                        price : 20000,
                        link : '/product/8'
                    },
                    {
                        id : 9,
                        name : "Razor Blade Laptop ",
                        image : Razor_Blade,
                        price : 25000,
                        link : '/product/9'
                    },
                    {
                        id : 10 , 
                        name : "Apple Airpods pro",
                        image : Airbods_pro,
                        price  : 15500,
                        link : '/product/10'
                    },
                    {
                        id : 11,
                        name : "galaxy Tab S8",
                        image : Galaxy_tab_S8,
                        price : 440000,
                        link : '/product/11'
                    }
    ]

function ProductsPage() {
    const ProductCategory = [
            {
                id : 1 , name : "elecetronics" , image : electronics , link : "/electronic"
            },
              {
                id : 2 , name : "Groceries" , image :Groceries , link : "/groceries"
              },
              {
                id : 3 , name : "Fashion" , image : Fashion , link : "/" 
              },
                {
                id : 4 , name : "Books" , image : Books , link : "/"
              },
              {
                id : 5 , name : "CarCare" , image : CarCare , link : "/"
              },
              {
                id : 6 , name : "Home Appliance" , image : HomeAppliance , link : "/"
              },
              {
                id : 7 , name : "Toys" , image : Toys , link : "/"
              },
              {
                id : 8 , name : "Sports" , image : sports , link : "/"
              },
    ]
return (
<div className='mt-30'>  
        {/* categories */}
            <div >
            <h1 className='text-3xl md:text-5xl font-bold text-center mt-10'>categories</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-10 cursor-pointer '>
            {ProductCategory.map(category => (
            <Link to={category.link} key={category.id}>
            <div key={category.id} className='flex flex-col items-center p-4 border rounded-5xl shadow hover:shadow-xl transition-shadow'>
                <img src={category.image} alt={category.name} className='h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{category.name}</h2>
            </div>
            </Link>
            ))}
            </div>
        </div>

         {/* Products section */}    
        <div className='mt-10'>
            <h1 className='text-3xl md:text-5xl font-bold text-center'>Some Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10'>
            {Products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
            <div key={product.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                <img src={product.image} alt={product.name} className=' h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{product.name}</h2>
                <p className='text-lg font-bold'>{product.price} EGP </p>
            </div>
            </Link>
            ) )}
            </div>
        </div>
</div>
)
}

export default ProductsPage