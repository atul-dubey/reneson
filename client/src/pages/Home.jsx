import React from 'react'
import Hero from '../components/Hero'
import ClientStrip from '../components/ClientStrip'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testinomials'
import ScheduleCall from '../components/ScheduleCall'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <>
      <Hero/>  
      <ClientStrip/>
      <Services/>
      <WhyChooseUs/>
      <Stats/>
      <Testimonials/>
      <ScheduleCall/>
      <Contact/>
    </>
  )
}

export default Home