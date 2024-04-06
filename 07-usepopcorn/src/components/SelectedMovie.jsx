import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

/* eslint-disable react/prop-types */
const SelectedMovie = ({ selectedId, onCloseMovie, onAddToWatched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title,
    Poster,
    Plot,
    Genre,
    Director,
    Actors,
    imdbRating,
    Released,
    Runtime,
  } = movie;

  const API_KEY = 'bfa4d512';
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovie();
  }, [selectedId]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Poster,
      Plot,
      Genre,
      Director,
      Actors,
      imdbRating: +imdbRating,
      Released,
      Runtime: +Runtime.split(' ').at(0),
    };
    onAddToWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={Poster} alt={`Poster of the ${movie} movie`} />
            <div className='details-overview'>
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              <StarRating maxRating={10} size={24} />
              <button className='btn-add' onClick={handleAdd}>
                Add to list
              </button>
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>
              <strong>Director:</strong> {Director}
            </p>
            <p>
              <strong>Actors:</strong> {Actors}
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default SelectedMovie;
