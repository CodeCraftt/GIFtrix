import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div class="shadow-xl mb-6 navbar bg-base-100 md:px-20 px-4">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to={"/upload"}>   Upload </Link></li>
        <li> <Link to={"/search"}> Search  </Link></li>
      </ul>
    </div>
    <Link to={"/"} class="btn btn-ghost text-xl">GIFtrix</Link>
  </div>
  <div class="navbar-end hidden lg:flex">
    <ul class="menu menu-horizontal px-1 gap-3">
      <li><Link to={"/upload"}>   Upload </Link></li>
     <li> <Link to={"/search"}> Search  </Link></li>
    </ul>
  </div>
  
</div>
</>
  )
}

export default Navbar