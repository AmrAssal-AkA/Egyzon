import React , {use, useState} from 'react'
import Logo from '../assets/EgyzonLogo.svg'
import { Link } from 'react-router-dom'

function Header() {

  const Links = [
    {name : 'Home' , link : '/'},
    {name : 'Products' , link : '/products'},
    {name : 'Partners' , link : '/partners'},
    {name : 'About' , link : ""}
  ];

    let [open,setOpen] =useState(false);
    let [search, setSearch] = useState();

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-10 bg-yellow-300'>
        <div className='md:flex items-center justify-between py-4 px-10 '>
          <div className='font-bold text-2xl  flex items-center font-stretch-normal text-gray-900  cursor-pointer'>
              <Link to="/">
                <img src={Logo} alt="Logo" className='w-20' />
                </Link>
            </div>
          <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
            <ul className= {`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all deration-500 ease-in ${open ? 'top-20  opecity-100' : 'top-[-459px]'} md:opecity-100 opecity-0 bg-yellow-300`}> 
                {
                  Links.map(Links => (
                    <li key={Links.name} className='md:ml-8 text-xl md:my-0 my-7 active:text-green-800 md:mr-15'>
                      <Link to={Links.link} className='text-gray-800 hover:border-transparent-2 duration-500'>{Links.name}</Link>
                    </li>
                    
                  ))
                }
                <form className='flex flex-1 mx-6 mx-w-xl' >
                  <div className='flex items-center w-full'>
                    <input type='text' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} className='w-full py-1 px-3 border border-gray-300 rounded-l-md bg-white ' />
                    <button type='submit' className='bg-yellow-400 text-white px-3 py-1 rounded-r-full'>
                    <ion-icon name="search"></ion-icon>
                    </button>
                    </div>
                </form>

                <Link to="/cart" className='md:ml-8 text-xl md:my-0 my-7 active:text-green-800'>
                  <ion-icon name="cart-outline"></ion-icon>
                </Link>
                <Link to= '' className='md:ml-8 text-xl md:my-0 my-7 active:text-green-800'>
                  <ion-icon name="person-circle-outline"></ion-icon>
                </Link>
            </ul>
            </div>
    </div>
  )
}

export default Header