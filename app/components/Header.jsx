import React from 'react';
import Image from 'next/image';

function Header() {
  return (
    <div className='p-5   flex justify-center items-center flex-1'>
      <div className='md:mt-10 flex md:flex-row flex-col items-center mx-auto w-full md:w-4/5 '>
        <div className='flex-col order-2 md:order-1'>
          <div className='text-2xl md:text-4xl font-semibold'>
            Hi there, this is
            <span className='text-yellow-400 dark:text-purple-400'> Uzair Khan</span>
          </div>
          <div className='py-3 text-justify md:text-xl text-lg text-gray-500'>
            Welcome to my blog! Here, I delve into a range of topics including technology, social affairs, and more. Join me as we explore thought-provoking subjects and gain insights into the world around us. Let's embark on this journey of discovery together!
          </div>
        </div>

        <div className='p-5 md:p-7'>
          <div className='w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full'>
            <Image
              src='/logo.jpeg'
              alt='logo'
              width={100}
              height={100}
              layout='responsive'
              objectFit='cover'
              className='rounded-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;