import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import BannerOfPage from '../assets/HomePage/PageBanner.png'
import ElectronicsPhoto from '../assets/HomePage/electronic-cat.png'
import Groceries from '../assets/HomePage/Groceries-Bannerjpeg.jpeg'
import Fashion_category from '../assets/HomePage/fashion.png'
import Car_care from '../assets/HomePage/car-care.jpg'
import PS5 from '../assets/Products/Products Images/Ps5.webp'
import S25Ultra from '../assets/Products/Products Images/galaxy s25ultra .webp'
import MacBookPro from '../assets/Products/Products Images/Apple MacBook pro.jpeg'
import SonyHeadset from '../assets/Products/Products Images/Sony WH-1000XM4.avif'
import xbox_series_x from '../assets/Products/Products Images/xbox-series-x.webp'
import dell_xps from '../assets/Products/Products Images/dell xps.avif'

function Home() {
    const categories = [
    {id : 1 ,
    name : "Electronics",
    image : ElectronicsPhoto,
    link : "/electronic"
    },
    
    {id : 2 , 
      name : "Greceries",
      image : Groceries ,
      link : "/groceries"
    },

    {
      id : 3 , 
      name : "Fashion",
      image : Fashion_category
    },

    {
      id : 4, 
      name : "carcare", 
      image : Car_care
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
  const [form, setForm] = useState({ name: '', email: '', feedback: '' });

  const bestSellers = Products.filter(product => [1,2, 3, 5,6].includes(product.id));

  return (
    <div className='w-full mt-24'>
        <div className='relative w-full '>
            <img src={BannerOfPage} alt="Banner" className='w-full h-full object-cover rounded' />
        </div>
          {/* Categories section */}
        <div >
          <h1 className='text-3xl md:text-5xl font-bold text-center mt-10'>Top Categories</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 cursor-pointer'>
            {categories.map(category => (
              <Link to={category.link} key={category.id}>
              <div key={category.id} className='flex flex-col items-center p-4 border rounded-5xl shadow hover:shadow-lg transition-shadow'>
                <img src={category.image} alt={category.name} className='w-full h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{category.name}</h2>
              </div>
              </Link>
            ))}
            </div>
        </div>

        {/* Products section */}
        <div className='mt-10'>
          <h1 className='text-3xl md:text-5xl font-bold text-center'>Some of our Products</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10'>
            {Products.map(products => (
              <div key={products.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                <img src={products.image} alt={products.name} className=' h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{products.name}</h2>
                <p className='text-lg font-bold'>${products.price}</p>
              </div>
            ) )}
            </div>
          </div>
          {/* Best Product Sellers */}
          <div className="w-full border-b pb-4 mt-10">
          <div className="flex items-start gap-6">
    {/* Left box */}
          <div className="border p-4 min-w-[150px] flex items-center justify-center h-[120px]">
          <span className="font-bold text-2xl text-center leading-tight">
            Best<br />Sellers
          </span>
          </div>
    {/* Product placeholders */}
            <div className='flex flex-1 gap-8'>
              {bestSellers.map(product => (
                <div key={product.id} className= "flex flex-col items-center  cursor-pointer">
                  <img src={product.image} alt={product.name} className='w-full h-32 object-cover mb-2 rounded' />
                  <h2 className='text-xl font-semibold'>{product.name}</h2>
                  <p className='text-lg font-bold'>${product.price}</p>
                </div>
              ))}
            </div>
  </div>
</div>
          {/* Feedback Form */}
          <div className='mt-10'>
            <h1 className='text-3xl md:text-5xl font-bold text-center'>Feedback</h1>
            <form className='max-w-md mx-auto mt-6' onSubmit={e => e.preventDefault()}>
              <input
                type='text'
                placeholder='Name'
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className='w-full p-2 mb-4 border rounded'
              />
              <input
                type='email'
                placeholder='Email'
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className='w-full p-2 mb-4 border rounded'
              />
              <textarea
                placeholder='Feedback'
                value={form.feedback}
                onChange={e => setForm({ ...form, feedback: e.target.value })}
                className='w-full p-2 mb-4 border rounded h-32'
              />
              <button type='submit' className='w-full bg-yellow-400 text-white p-2 rounded cursor-pointer'>
                Submit
              </button>
            </form>
          </div>
    </div>
  )
}
export default Home