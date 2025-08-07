import React from 'react'
import { Link } from 'react-router-dom'
import ElectronicsPhoto from '../assets/HomePage/electronic-cat.png'
import Groceries from '../assets/HomePage/Groceries-Bannerjpeg.jpeg'
import Fashion_category from '../assets/HomePage/fashion.png'
import Car_care from '../assets/HomePage/car-care.jpg'
import Sport_cat from '../assets/HomePage/sport.png'
import Home_Appliance from '../assets/HomePage/HomeAppliance.png'
import Toys from '../assets/HomePage/Toys.png'
import Books from '../assets/HomePage/Books.png'
import PS5 from '../assets/Products/Products Images/Ps5.webp'
import S25Ultra from '../assets/Products/Products Images/galaxy s25ultra .webp'
import MacBookPro from '../assets/Products/Products Images/Apple MacBook pro.jpeg'
import SonyHeadset from '../assets/Products/Products Images/Sony WH-1000XM4.avif'
import xbox_series_x from '../assets/Products/Products Images/xbox-series-x.webp'
import dell_xps from '../assets/Products/Products Images/dell xps.avif'


function Products() {

        const Categories = [
        {
        id : 1 ,
        name : "Electronics",
        image : ElectronicsPhoto,
        link : '/electronic'
        },
        
        {id : 2 , 
        name : "Greceries",
        image : Groceries,
        link : "/greceries"
        },
    
        {
        id : 3 , 
        name : "Fashion",
        image : Fashion_category,
        path : "/FashionPage"
        },
    
        {
        id : 4, 
        name : "carcare", 
        image : Car_care,
        path : "/CarCarePage"
        },
        {
            id : 5,
            name : "Home Appliances",
            image : Home_Appliance,
            path : "/HomeAppliancesPage"
        },
        {
            id : 6,
            name : "Sports",
            image : Sport_cat,
            path : "/SportsPage"
        },
        {
            id : 7,
            name : "Books",
            image : Books,
            path : "/BooksPage"
        },
        {
            id : 8,
            name : "Toys",
            image : Toys, 
            path : "/ToysPage"
        }
    ]

    const Products = [
    {id : 1 , 
        name : "PlayStation 5",
        image : PS5,
        rating :4.5,
        reviews : 1200,
        description : "Next-gen gaming console with stunning graphics and fast load times.",
        price : 499.99
    },
    {id : 2 ,
        name : "Samsung Galaxy S25",
        image : S25Ultra,
        price : 799.99
    },
    {
        id : 3 ,
        name : "Apple MacBook Pro",
        image : MacBookPro,
        price : 1299.99
    },
    {
        id : 4 ,
        name : "Sony WH-1000XM4 Headphones",
        image : SonyHeadset,
        price : 349.99
    },
    {
        id : 5 ,
        name : "xbox Series X",
        image : xbox_series_x,
        price : 499.99
    },
    {
        id : 6 ,
        name : "Dell XPS 13",
        image : dell_xps,
        price : 999.99
    }
]

return (
<div className='mt-30'>  
        {/* categories */}
            <div >
            <h1 className='text-3xl md:text-5xl font-bold text-center mt-10'>categories</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-10 cursor-pointer '>
            {Categories.map(category => (
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
            {Products.map(products => (
            <Link to={Products.path} key={products.id}>
            <div key={products.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                <img src={products.image} alt={products.name} className=' h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{products.name}</h2>
                <p className='text-lg font-bold'>${products.price}</p>
            </div>
            </Link>
            ) )}
            </div>
        </div>
</div>
)
}

export default Products