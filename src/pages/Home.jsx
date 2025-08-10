import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import BannerOfPage from '../assets/HomePage/PageBanner.png'
import PS5 from '../assets/Products/Products Images/Ps5.webp'
import S25Ultra from '../assets/Products/Products Images/galaxy s25ultra .webp'
import MacBookPro from '../assets/Products/Products Images/Apple MacBook pro.jpeg'
import SonyHeadset from '../assets/Products/Products Images/Sony WH-1000XM4.avif'
import dell_xps from '../assets/Products/Products Images/dell xps.avif'
import Xbox_series_x from '../assets/Products/Products Images/xbox-series-x.webp'

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
                    }
    ]

    

function Home() {
  const productCategory = [
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
            {productCategory.map(category => (
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
            {Products.map(product => (
              <Link to={product.link} key={product.id} > 
              <div key={product.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                <img src={product.image} alt={product.name} className=' h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{product.name}</h2>
                <p className='text-lg font-bold'>{product.price} EGP</p>
              </div>
              </Link>
            ) )}
            </div>
          </div>
          {/* Best Product Sellers */}
            <div className="border p-4 flex flex-wrap md:flex-nowrap gap-4 items-center">
      {/* Title Box */}
      <div className="border p-4 flex items-center justify-center text-center font-bold text-lg md:w-1/5 w-full">
        Best <br /> product <br /> Sellers
      </div>

      {/* Products */}
      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
        {Products.map((product) => (
          <div key={product.id} className="flex flex-col items-center w-28">
            <img src={product.image} alt={product.name} className=' h-32 object-cover mb-2 rounded'/>
            <p className="text-sm mt-1">{product.name}</p>
          </div>
        ))}
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