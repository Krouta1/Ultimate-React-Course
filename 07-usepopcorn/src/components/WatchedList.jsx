import WatchedMovie from './WatchedMovie';

/* eslint-disable react/prop-types */
const WatchedList = ({ watched }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedList;
