'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWM1YzZkZmI2OTVjOGY2YzBmODM5MmIzZTM5NjU0ZiIsInN1YiI6IjYxNDk5ZWVmNzAzMDlmMDAyYWY5NjIxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Dq1lmEy43LTcNIKvAnY9UEEk6OTOnPufOUq3hVWDiQ',
  },
};
async function getData() {
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    options
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data ');
  }

  return res.json();
}

const Hero = () => {
  const [movies, setMovies] = useState<Movie[]>();

  const [currentIndex, setCurrentIndex] = useState(2);
  useEffect(() => {
    getData().then((data) => setMovies(data.results));
  }, []);

  interface Movie {
    id: number;
    vote_average: number;
    overview: string;
    original_title: string;
    poster_path: string;
  }

  return (
    <div className="w-full h-[500px] sm:h-screen relative">
      {movies && (
        <div
          className="w-full h-full duration-500 after:bg-black after:w-full after:h-full after:absolute after:top-0 after:left-0 after:opacity-50"
          style={{
            backgroundImage: ` url(https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // filter: 'brightness(0.7)',
          }}
        >
          <div className="flex flex-col absolute right-0 bg-slate-950/50 mx-2 rounded-md px-2 top-[50%] translate-y-[-50%] z-10 ">
            {movies.slice(0, 5).map((m, index) => (
              <span
                key={m.id}
                className={`text-white cursor-pointer relative text-xs transition-all ${
                  currentIndex === index
                    ? 'scale-100 before:w-3 before:absolute before:bg-white before:h-[2px] before:-left-4 before:top-[50%] before:translate-y-[-50%]'
                    : 'scale-75'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </span>
            ))}
          </div>
          <div className="text-white absolute top-[50%] translate-y-[-50%] w-3/4  md:px-36  px-5 z-10  ">
            <h1 className="mb-5 text-xl font-semibold md:text-3xl ">
              {movies[currentIndex].original_title}
            </h1>
            <p className="text-xs md:text-xl">
              {movies[currentIndex].overview}
            </p>
            <p className="text-xs md:text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 md:w-12 inline-block mr-2"
              >
                <path
                  fill="#fff"
                  d="M4 7c-1.103 0-2 .897-2 2v6.4c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2H4Zm1.4 2.363h1.275v5.312H5.4V9.362Zm1.962 0H9l.438 2.512.287-2.512h1.75v5.312H10.4v-3l-.563 3h-.8l-.512-3v3H7.362V9.362Zm8.313 0H17v1.2c.16-.16.516-.363.875-.363.36.04.84.283.8.763v3.075c0 .24-.075.404-.275.524-.16.04-.28.075-.6.075-.32 0-.795-.196-.875-.237-.08-.04-.163.275-.163.275h-1.087V9.362Zm-3.513.037H13.6c.88 0 1.084.078 1.325.237.24.16.35.397.35.838v3.2c0 .32-.15.563-.35.762-.2.2-.484.288-1.325.288h-1.438V9.4Zm1.275.8v3.563c.2 0 .488.04.488-.2v-3.126c0-.28-.247-.237-.488-.237Zm3.763.675c-.12 0-.2.08-.2.2v2.688c0 .159.08.237.2.237.12 0 .2-.117.2-.238l-.037-2.687c0-.12-.043-.2-.163-.2Z"
                />
              </svg>
              <span className="align-middle">
                {movies[currentIndex].vote_average.toFixed(1)}
              </span>
            </p>

            <button className="bg-red-600 px-3 py-2 text-xs uppercase flex items-center mt-2 rounded-md">
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
              Watch Trailer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
