// 'use client'
import { useEffect } from "react"
import { getMovieById, path_500, path, path_original, getVideos } from '@/app/lib/util'
import Image from "next/image"

const Movie = async ({ params }: { params: { id: number } }) => {
    const movieData = await getMovieById(params.id)
    const { original_title, backdrop_path, release_date, poster_path, overview, genres, vote_average, status } = movieData
    const videoData = await getVideos(params.id)
    const trailers = videoData.results.filter((trailer) => trailer.type === 'Trailer')
    console.log(trailers);

    return (
        <div className=" sm:w-screen sm:h-screen  " style={{
            backgroundImage: ` url(https://image.tmdb.org/t/p/w780${backdrop_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',           
          }}>
            {/* <div className="w-full h-full ">
            <Image className="w-full grayscale h-full object-cover" src={path_original + backdrop_path} width={780} height={500} alt="" />
            </div> */}
            <div className="sm:w-full sm:h-full mx-auto gap-5 flex flex-col sm:justify-center items-center sm:items-center sm:flex-row  backdrop-blur">
                <div className="mt-10 sm:mt-0 ">
                    <Image className=" text-center" src={path_500 + poster_path} width={400} height={200} alt="" />
                </div>
                <div className="w-5/6 sm:w-1/2 mb-10 sm:mb-0 bg-neutral-800 text-white p-5">
                    
                    <p className="font-bold text-center text-xl sm:text-left mb-5" >{original_title} <span className=" text-base font-normal">({new Date(release_date).getFullYear()})</span></p>
                    <p><span className="font-bold">Overview: </span>{overview}</p>
                    <p><span className="font-bold">Genres: </span>{genres.map((genre) => <span key={genre.id}> {genre.name} ,</span>)}</p>
                    <p><span className="font-bold">IMDB: </span>{vote_average}</p>
                    <p><span className="font-bold">Status: </span>{status}</p>
                    

                    <div className="">
                        <p className="font-bold">Videos</p>

                        <iframe className="w-full" width={560} height={315} src={`https://www.youtube.com/embed/${trailers[0].key}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    
                </div>
               
            </div>
           
        </div>
    )

}

export default Movie