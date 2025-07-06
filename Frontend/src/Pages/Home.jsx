import Hero from "../Components/Hero"
import LatestCollection from "../Components/LatestCollection"
import BestSeller from "../Components/BestSeller"
import OurPolicy from "../Components/OurPolicy"
import NewsletterBox from "../Components/NewsletterBox"
import Footer from "../Components/Footer"

function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home