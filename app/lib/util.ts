
export const path = 'https://image.tmdb.org/t/p/w780';
export const path_original = 'https://image.tmdb.org/t/p/original';

export const path_500 = 'https://image.tmdb.org/t/p/w500';

//  "backdrop_sizes": [
//     "w300",
//     "w780",
//     "w1280",
//     "original"
//   ],
//   "logo_sizes": [
//     "w45",
//     "w92",
//     "w154",
//     "w185",
//     "w300",
//     "w500",
//     "original"
//   ],
//   "poster_sizes": [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original"
//   ],
//   "profile_sizes": [
//     "w45",
//     "w185",
//     "h632",
//     "original"
//   ],
//   "still_sizes": [
//     "w92",
//     "w185",
//     "w300",
//     "original"
//   ]

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWM1YzZkZmI2OTVjOGY2YzBmODM5MmIzZTM5NjU0ZiIsInN1YiI6IjYxNDk5ZWVmNzAzMDlmMDAyYWY5NjIxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Dq1lmEy43LTcNIKvAnY9UEEk6OTOnPufOUq3hVWDiQ',
    },
};

export async function getData() {
    const res = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        options
    );
    if (!res.ok) {
        throw new Error('Failed to fetch data ');
    }
    return res.json();
}

export async function getMovies() {
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie`,
        options
    );
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export async function getMovieById(id: number) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
    if (!res.ok) {
        throw new Error('Failed to fetch data by Id');
    }
    return res.json();
}

export async function getVideos(id:number) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`,options)
    if (!res.ok) {
        throw new Error('Failed to fetch data by Id');
    }
    return res.json()
    
}


export async function getTvSeries() {
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv`, options);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export async function getTvSerieById(id: number) {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options);
    if (!res.ok) {
        throw new Error('Failed to fetch data by Id');
    }
    return res.json();
}

export async function getFeaturedCasts() {
    const res = await fetch(`https://api.themoviedb.org/3/person/popular`, options);
    if (!res.ok) {
        throw new Error('Failed to fetch data by Id');
    }
    return res.json();
}
