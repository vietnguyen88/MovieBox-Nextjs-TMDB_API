export interface Genre {
  id: number;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}
export interface Movie {
  id: number;
  vote_average: number;
  overview: string;
  original_title: string;
  poster_path: string;
  release_date: Date;
  genres: Genre[];
  production_countries: Country[];
}

export interface TvSerie {
  id: number;
  vote_average: number;
  overview: string;
  name: string;
  poster_path: string;
  first_air_date: Date;
  genres: Genre[];
  production_countries: Country[];
}

export interface Cast {
  id:number;
  profile_path:string;
  name: string;
}