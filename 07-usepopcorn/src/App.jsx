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
import StarRating from './components/StarRating';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SelectedMovie from './components/SelectedMovie';

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
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('inception');
	const [selectedId, setSelectedId] = useState(null);
	const API_KEY = 'bfa4d512';

	useEffect(() => {
		// fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=interstellar`)
		// 	.then(res => res.json())
		// 	.then(data => setMovies(data.Search));

		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError('');
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
				);

				if (!res.ok)
					throw new Error('Something went wrong with fetching movies');

				const data = await res.json();

				if (data.Response === 'False')
					throw new Error('No movies were found. Please try again.');

				setMovies(data.Search);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}

		fetchMovies();
	}, [query]);

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
					{!isLoading && !error && <MovieList movies={movies} />}
				</Box>
				<Box>
					{selectedId ? (
						<SelectedMovie selectedId={selectedId} />
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
