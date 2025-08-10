import React from "react";
import {Link} from 'react-router-dom';
import Milk from '../assets/Groceries/Milk.jpg'
import Chicken from '../assets/Groceries/checken.jpg'
import Bread from '../assets/Groceries/Bread.jpg'
import KatchebAndMustard from '../assets/Groceries/Katcheb and mustard.jpg'
import BeefChunk from '../assets/Groceries/Beef chunk.jpg'
import Nutella from '../assets/Groceries/nutella.jpg'
import Spachetti from '../assets/Groceries/spachetti.jpg'

import Animal_Products from '../assets/Groceries/category/Animal-category.png'
import Diary_Products from '../assets/Groceries/category/Diary-category.png'
import MacaroniCategory from '../assets/Groceries/category/Macaroni-category.png' 

  export const Products = [
                {
                id : 1,
                name : "Milk",
                price : 60,
                image : Milk
                },
                {
                id : 2,
                name : "Beef Chunk",
                image : BeefChunk,
                price :400
                },
                {
                id : 3,
                name : "Chicken",
                image : Chicken,
                price : 350
                },
                {
                  id :4, 
                  nama : "Bread",
                  image : Bread,
                  Price : 15
                },
                {
                  id :5, 
                  nama : "Nutella chocolete spread",
                  image : Nutella,
                  Price : 80
                },
                {
                  id : 6,
                  name : "Kutcheab and mistard",
                  iamage : KatchebAndMustard,
                  price : 100
                },
                {
                  id : 7 , 
                  name : "spachetti",
                  image : Spachetti,
                  price : 15
                }
  ]

const Groceries = () => {

  const GroceryCategory = [
    { catalogId : 1 , name : "diary Products" , image : Diary_Products },
    { catalogId : 2 , name : "Animal Products" , image : Animal_Products  },
    { catalogId : 3 , name : "Macronies" , image : MacaroniCategory },
  ]



  return (
    <div className="mt-30">
                    <h1 className='text-3xl md:text-5xl font-bold text-center'>Groceries</h1>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 mt-4'>
                    {Products.map(Grocery => (
                    <div key={Grocery.id} className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                        <img src={Grocery.image} alt={Grocery.name} className=' h-32 object-cover mb-2 rounded' />
                        <h2 className='text-xl font-semibold'>{Grocery.name}</h2>
                        <p className='text-lg font-bold'>${Grocery.price}</p>
                    </div>
                    ) )}
                    </div>


                    {/* Category of grocery */}
                    <h1 className='text-3xl md:text-5xl text-center mt-10'>find by category </h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-4'>
                        {GroceryCategory.map(Grocery_Catalog =>(
                          <Link to={Grocery_Catalog.link} key={Grocery_Catalog.catalogId}>
                          <div key={Grocery_Catalog}  className='flex flex-col items-center p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer'>
                              <img src={Grocery_Catalog.image} alt={Grocery_Catalog.name} className=' h-35 object-cover mb-2 rounded'/>
                              <h2 className='text-xl font-semibold'>{Grocery_Catalog.name}</h2>
                            </div>
                            </Link>
                        ))

                        }
                    </div>
    </div>
  )
}

export default Groceries