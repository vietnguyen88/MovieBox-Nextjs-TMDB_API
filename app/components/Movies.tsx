'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ControlBtn from './ControlBtn';
import { Movie, Country, Genre } from './Types';
import { imdb } from './svgs';
import { getMovieById, getMovies, path } from '../lib/util';





const Movies = () => {
  const [movies, setMovies] = useState<Movie[] | undefined>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const allMoviesPromise = new Promise<Movie[]>((resolve, reject) => {
      getMovies()
        .then((data) => {
          resolve(data.results);
        })
        .catch((error) => reject(error));
    });
    allMoviesPromise.then((data) => {
      const allPromises = data.map(async (movie: Movie) => {
        return await getMovieById(movie.id).then((item) => item);
      });
      Promise.all(allPromises).then((movies) => setMovies(movies));
    });
   
  }, []);



  const handlePrevBtn = () => {
    setCurrentIndex(
      movies !== undefined
        ? currentIndex - 1 < 0
          ? movies.length - 4
          : currentIndex - 1
        : currentIndex
    );
  };

  const handleNextBtn = () => {
    setCurrentIndex(
      movies !== undefined
        ? currentIndex + 1 > movies.length - 4
          ? 0
          : currentIndex + 1
        : currentIndex
    );
  };

  if (movies === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div className="px-5 md:w-4/5 md:mx-auto">
      <h1 className="py-8 font-bold md:text-3xl flex justify-between items-center">
        <div>
        Movies <span className='text-xs font-normal text-red-600'>See more {">"}</span>
        </div>
        <ControlBtn
          handleNextBtn={handleNextBtn}
          handlePrevBtn={handlePrevBtn}
        />
      </h1>
      <div className="sm:grid-cols-4  grid gap-2 transition-all">
        {movies.slice(currentIndex, currentIndex + 4).map((movie) => (
          <div key={movie.id} className="mx-auto sm:mx-[unset] text-wrap">
            <Image
              className="w-auto "
              src={path + movie.poster_path}
              alt=""
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={path + movie.poster_path}
            />{' '}
            <p className="text-xs font-sans font-semibold text-gray-400 mt-2 ">
              {movie.production_countries.map((country, i) => (
                <span key={country.iso_3166_1}>
                  {country.iso_3166_1}
                  {movie.production_countries.length - 1 === i ? ' ' : ','}{' '}
                </span>
              ))}{' '}
              - {new Date(movie.release_date).getFullYear()}
            </p>
            <p className="text-xs font-sans font-semibold text-gray-400 mb-3 truncate">
              {movie.genres.map((genre, i) => (
                <span key={genre.id}>
                  {genre.name}
                  {movie.genres.length - 1 === i ? ' ' : ','}{' '}
                </span>
              ))}
            </p>
            <p className="text-xs font-bold truncate w-60 sm:w-auto">
              {movie.original_title}
            </p>
            <p className="text-xs">
              {imdb}
              <span className="align-middle">
                {movie.vote_average.toFixed(1)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
