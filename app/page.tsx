import Image from 'next/image';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TvSeries from './components/TvSeries';
import Movies from './components/Movies';

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Movies />
      <TvSeries />
    </main>
  );
}
