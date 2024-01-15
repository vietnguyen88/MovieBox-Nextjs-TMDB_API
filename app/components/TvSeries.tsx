'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ControlBtn from './ControlBtn';
import { TvSerie, Country, Genre } from './Types';
import { imdb } from './svgs';
import { getTvSerieById,getTvSeries,path } from '../lib/util'; 


const TvSeries = () => {
  const [tvSeries, setTvSeries] = useState<TvSerie[] | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const allMoviesPromise = new Promise<TvSerie[]>((resolve, reject) => {
      getTvSeries()
        .then((data) => {
          resolve(data.results);
        })
        .catch((error) => reject(error));
    });
    allMoviesPromise.then((data) => {
      const allPromises = data.map(async (movie: TvSerie) => {
        return await getTvSerieById(movie.id).then((item) => item);
      });
      Promise.all(allPromises).then((tvseries) => setTvSeries(tvseries));
    });
  }, []);

  const handlePrevBtn = () => {
    setCurrentIndex(
      tvSeries !== undefined
        ? currentIndex - 1 < 0
          ? tvSeries.length - 4
          : currentIndex - 1
        : currentIndex
    );
  };

  const handleNextBtn = () => {
    setCurrentIndex(
      tvSeries !== undefined
        ? currentIndex + 1 > tvSeries.length - 4
          ? 0
          : currentIndex + 1
        : currentIndex
    );
  };

  return (
    <div className="px-5 md:w-4/5 md:mx-auto">
      <h1 className="py-8 font-bold md:text-3xl flex justify-between items-center">
        TV Series{' '}
        <ControlBtn
          handleNextBtn={handleNextBtn}
          handlePrevBtn={handlePrevBtn}
        />
      </h1>
      <div className="sm:grid-cols-4  grid gap-2 ">
        {tvSeries &&
          tvSeries.slice(currentIndex, currentIndex + 4).map((tvseries) => (
            <div key={tvseries.id} className="mx-auto sm:mx-[unset]">
              <Image
                className="w-auto h-auto"
                src={path + tvseries.poster_path}
                alt=""
                width={200}
                height={200}
                placeholder="blur"
                blurDataURL={path + tvseries.poster_path}
              />{' '}
              <p className="text-xs font-sans font-semibold text-gray-400 mt-2">
                {tvseries.production_countries.map((country, i) => (
                  <span key={country.iso_3166_1}>
                    {country.iso_3166_1}
                    {tvseries.production_countries.length - 1 === i
                      ? ' '
                      : ','}{' '}
                  </span>
                ))}{' '}
                - {new Date(tvseries.first_air_date).getFullYear()}
              </p>
              <p className="text-xs font-sans font-semibold text-gray-400 mb-3 truncate">
                {tvseries.genres.map((genre, i) => (
                  <span key={genre.id}>
                    {genre.name}
                    {tvseries.genres.length - 1 === i ? ' ' : ','}{' '}
                  </span>
                ))}
              </p>
              <p className="text-xs font-bold truncate">{tvseries.name}</p>
              <p className="text-xs">
                {imdb}
                <span className="align-middle">
                  {tvseries.vote_average.toFixed(1)}
                </span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TvSeries;
