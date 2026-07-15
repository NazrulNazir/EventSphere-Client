import Categories from '@/components/homePage/Categories'
import EventGrid from '@/components/homePage/EventGrid'
import FAQ from '@/components/homePage/FAQ'
import Features from '@/components/homePage/Features'
import Hero from '@/components/homePage/Hero'
import Newsletter from '@/components/homePage/Newsletter'
import Pricing from '@/components/homePage/Pricing'
import Statistics from '@/components/homePage/Statistics'
import Testimonials from '@/components/homePage/Testimonials'
import Trusted from '@/components/homePage/Trusted'
import WhyChoose from '@/components/homePage/WhyChoose'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <Trusted/>
      <Features/>
      <EventGrid/>
      <Categories/>
      <Statistics/>
      <WhyChoose/>
      <Testimonials/>
      <Pricing/>
      <FAQ/>
      <Newsletter/>
    </div>
  )
}

export default HomePage