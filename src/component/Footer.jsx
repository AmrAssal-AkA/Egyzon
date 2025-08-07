import React , {useState} from 'react'
import Logo from '../assets/EgyzonLogo.svg'
import { Link } from 'react-router-dom'

function Footer() {
  const [search, setSearch] = useState('');
  const Links = [
    {name : 'Home' , link : '/'},
    {name : 'Products' , link : '/products'},
    {name : 'Partners' , link : '/partners'},
  ];
  return (
    <footer className='bg-yellow-300 text-gray-800 py-6 mt-10'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4'>
        {/* logo and slogan */}
        <div className='flex flex-col items-start'>
          <Link to="/">
          <img src={Logo} alt='Logo' className='w-28 mb-1' />
          </Link>
          <span className='text-lg text-black'>Experience shopping<br />like never before!</span>
        </div>
        {/* search bar */}
        <div>
          <form className="flex w-full max-w-xs" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-grow px-3 py-1 rounded-l-full border bg-white outline-none"
            />
            <button type="submit" className="bg-yellow-400 text-white px-3 py-1 rounded-r-full">
              <ion-icon name="search"></ion-icon>
            </button>
          </form>
        {/* navigation links */}
        <div className="flex flex-col font-bold text-black text-sm">
          {Links.map(link => (
            <Link key={link.name} to={link.link} className="hover:text-green-900 mb-1 last:mb-0">{link.name}</Link>
          ))}
        </div>
      </div>
      </div>
            <hr className="border-gray-400" />
      <div className="text-center py-2 text-lg text-black">
        © 2025 copyright reserved, created by AmrAssal
      </div>
      </footer>
  )
}

export default Footer