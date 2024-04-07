import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

/* eslint-disable react/prop-types */
const SelectedMovie = ({
  selectedId,
  onCloseMovie,
  onAddToWatched,
  watched = [],
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

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
  const controller = new AbortController();
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`,
        { signal: controller.signal }
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;

    return () => {
      document.title = 'UsePopcorn';
      controller.abort();
    };
  }, [Title]);

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
      userRating,
    };
    onAddToWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onCloseMovie();
      }
    });

    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          onCloseMovie();
        }
      });
    };
  }, [onCloseMovie]);

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
              {!isWatched ? (
                <>
                  {' '}
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating}⭐️</p>
              )}
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
