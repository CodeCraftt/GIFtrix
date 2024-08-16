import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
    <div id="hero" className="pt-5 px-4 md:px-20 lg:flex items-center">
  <div className="px-5 sm:px-10 md:px-10 md:flex lg:block lg:w-1/2 lg:max-w-3xl lg:mr-8 lg:px-20">
    <div className="md:w-1/2 md:mr-10 lg:w-full lg:mr-0">
      <h1 className="text-3xl xl:text-4xl font-black md:leading-none xl:leading-tight">
      We're thrilled to have you here! 
      </h1>
      <p className="mt-6 xl:mt-4 text-[1.2rem]">
      We've got some awesome GIFs tailored just for you.
      </p>
    </div>

     <Link to={"/search"}><button class="mt-8 btn btn-info text-white" >Explore</button></Link>
  </div>
  <div className="mt-6 w-full flex-1 lg:mt-0">
    <div></div>
    <img
      className=" rounded-md shadow-2xl "
      src="https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=85"
      alt="Designer"
    />
  </div>
</div>

</>
  );
};

export default HomePage;
