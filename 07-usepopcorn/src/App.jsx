import Navbar from './components/Navbar';
import Main from './components/Main';
import { useState, useEffect } from 'react';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SelectedMovie from './components/SelectedMovie';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

// const tempWatchedData = [
// 	{
// 		imdbID: 'tt1375666',
// 		Title: 'Inception',
// 		Year: '2010',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
// 		runtime: 148,
// 		imdbRating: 8.8,
// 		userRating: 10,
// 	},
// 	{
// 		imdbID: 'tt0088763',
// 		Title: 'Back to the Future',
// 		Year: '1985',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
// 		runtime: 116,
// 		imdbRating: 8.5,
// 		userRating: 9,
// 	},
// ];

// const tempMovieData = [
// 	{
// 		imdbID: 'tt1375666',
// 		Title: 'Inception',
// 		Year: '2010',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
// 	},
// 	{
// 		imdbID: 'tt0133093',
// 		Title: 'The Matrix',
// 		Year: '1999',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
// 	},
// 	{
// 		imdbID: 'tt6751668',
// 		Title: 'Parasite',
// 		Year: '2019',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
// 	},
// ];

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);
	const [watched, setWatched] = useLocalStorageState([], 'watched');

	const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

	function handleSelectMovie(id) {
		setSelectedId(selectedId === id ? null : id);
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddToWatched(movie) {
		setWatched(prev => [...prev, movie]);
		// localStorage.setItem('watched', JSON.stringify([...watched, movie])); // need to build array coz of stale state
	}
	function handleRemoveFromWatched(id) {
		setWatched(prev => prev.filter(movie => movie.imdbID !== id));
	}

	return (
		<>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{isLoading && !error && <Loader movies={movies} />}
					{error && <ErrorMessage message={error} />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
				</Box>
				<Box>
					{selectedId ? (
						<SelectedMovie
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddToWatched={handleAddToWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedList
								watched={watched}
								onDeleteWatched={handleRemoveFromWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
