import { About } from '@/pages/index/components/About'
import { Cta } from '@/pages/index/components/Cta'
import { FAQ } from '@/pages/index/components/FAQ'
import { Features } from '@/pages/index/components/Features'
import { Footer } from '@/pages/index/components/Footer'
import { Hero } from '@/pages/index/components/Hero'
import { HowItWorks } from '@/pages/index/components/HowItWorks'
import { Navbar } from '@/pages/index/components/Navbar'
import { Newsletter } from '@/pages/index/components/Newsletter'
import { Pricing } from '@/pages/index/components/Pricing'
import { ScrollToTop } from '@/pages/index/components/ScrollToTop'
import { Services } from '@/pages/index/components/Services'
import { Sponsors } from '@/pages/index/components/Sponsors'
import { Team } from '@/pages/index/components/Team'
import { Testimonials } from '@/pages/index/components/Testimonials'

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  )
}
