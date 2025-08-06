import React, {useState} from 'react'
import BannerOfPage from '../assets/HomePage/PageBanner.png'
import ElectronicsPhoto from '../assets/HomePage/electronic-cat.svg'

function Home() {
    const categories = [
    {id : 1 ,
    name : "Electronics",
    image : {ElectronicsPhoto}
    },
    
    {id : 2 , 
      name : "Greceries",
      image : "https://example.com/greceries.jpg"
    },

    {
      id : 3 , 
      name : "Fashion",
      image : "https://example.com/fashion.jpg"
    },

    {
      id : 4, 
      name : "carcare", 
      image : "https://example.com/carcare.jpg"
    }
  ]

  const Products = [
    {id : 1 , 
      name : "PlayStation 5",
      image : "https://example.com/ps5.jpg",
      rating :4.5,
      reviews : 1200,
      description : "Next-gen gaming console with stunning graphics and fast load times.",
      price : 499.99
    },
    {id : 2 ,
      name : "Samsung Galaxy S25",
      image : "https://example.com/s21.jpg",
      price : 799.99
    },
    {
      id : 3 ,
      name : "Apple MacBook Pro",
      image : "https://example.com/macbook.jpg",
      price : 1299.99
    },
    {
      id : 4 ,
      name : "Sony WH-1000XM4 Headphones",
      image : "https://example.com/sony-headphones.jpg",
      price : 349.99
    },
    {
      id : 5 ,
      name : "xbox Series X",
      image : "https://example.com/xbox-series-x.jpg",
      price : 499.99
    },
    {
      id : 6 ,
      name : "Dell XPS 13",
      image : "https://example.com/dell-xps-13.jpg",
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
          <h1 className='text-3xl md:text-5xl font-bold text-center mt-10'>categories</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
            {categories.map(category => (
              <div key={category.id} className='flex flex-col items-center p-4 border rounded-5xl shadow hover:shadow-lg transition-shadow'>
                <img src={category.image} alt={category.name} className='w-full h-32 object-cover mb-2 rounded' />
                <h2 className='text-xl font-semibold'>{category.name}</h2>
              </div>
            ))}
            </div>
        </div>

        {/* Products section */}
        <div className='mt-10'>
          <h1 className='text-3xl md:text-5xl font-bold text-center'>Products</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10'>
            {Products.map(products => (
              <div key={products.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow'>
                <img src={products.image} alt={products.name} className='w-full h-32 object-cover mb-2 rounded' />
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
                <div key={product.id} className= "flex flex-col items-center">
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
              <button type='submit' className='w-full bg-yellow-400 text-white p-2 rounded'>
                Submit
              </button>
            </form>
          </div>
    </div>
  )
}
export default Home