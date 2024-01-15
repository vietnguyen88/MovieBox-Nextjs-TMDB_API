'use client'
import { useState, useEffect } from "react";
import { Cast } from "./Types";
import { getFeaturedCasts , path} from "../lib/util";
import Image from "next/image";

const FeaturedCast = ()=>{
    const [casts, setCasts] = useState<Cast[] | undefined>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
      const allCastsPromise = new Promise<Cast[]>((resolve, reject) => {
        getFeaturedCasts()
          .then((data) => {
            resolve(data.results);
          })
          .catch((error) => reject(error));
      });
     allCastsPromise.then(data => setCasts(data))
     
    }, []);
    if (casts === undefined) {
        return <div>loading...</div>;
      }
    
    return(
        <div className="px-5 md:w-4/5 md:mx-auto">
        <h1 className="py-8 font-bold md:text-3xl flex justify-between items-center">
          <div>
          Featured Casts <span className='text-xs font-normal text-red-600'>See more {">"}</span>
          </div>
        </h1>
        <div className="sm:grid-cols-4  grid gap-2 ">
        {casts.slice(currentIndex, currentIndex + 4).map((cast) => (
          <div key={cast.id} className="mx-auto w-52 sm:w-auto sm:mx-[unset] text-wrap">
            <Image
              className="w-auto h-auto"
              src={path + cast.profile_path}
              alt=""
              width={300}
              height={200}
              placeholder="blur"
              blurDataURL={path + cast.profile_path}
            />{' '}
            {/* <p className="text-xs font-sans font-semibold text-gray-400 mt-2 ">
              {movie.production_countries.map((country, i) => (
                <span key={country.iso_3166_1}>
                  {country.iso_3166_1}
                  {movie.production_countries.length - 1 === i ? ' ' : ','}{' '}
                </span>
              ))}{' '}
              - {new Date(movie.release_date).getFullYear()}
            </p> */}
            {/* <p className="text-xs font-sans font-semibold text-gray-400 mb-3 truncate">
              {movie.genres.map((genre, i) => (
                <span key={genre.id}>
                  {genre.name}
                  {movie.genres.length - 1 === i ? ' ' : ','}{' '}
                </span>
              ))}
            </p> */}
            <p className="text-xs font-bold truncate w-60 sm:w-auto">
              {cast.name}
            </p>
            {/* <p className="text-xs">
              {imdb}
              <span className="align-middle">
                {movie.vote_average.toFixed(1)}
              </span>
            </p> */}
          </div>
        ))}
      </div>
        </div>
    )
}

export default FeaturedCast