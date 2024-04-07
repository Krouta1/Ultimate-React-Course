import WatchedMovie from './WatchedMovie';

/* eslint-disable react/prop-types */
const WatchedList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedList;
