import Image from 'next/image';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TvSeries from './components/TvSeries';
import Movies from './components/Movies';
import FeaturedCast from './components/FeaturedCast';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Movies />
      {/* <TvSeries />
      <FeaturedCast/> */}
      <Footer/>
    </main>
  );
}
