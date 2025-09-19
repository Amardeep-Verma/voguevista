import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'} />

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis pariatur tenetur doloribus placeat nisi saepe alias magni esse non est.

        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos odit doloremque minima nostrum veniam reprehenderit?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus exercitationem atque id blanditiis!</p>

        </div>

        <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />

        </div>
    </div>

    </div>
  )
}

export default About