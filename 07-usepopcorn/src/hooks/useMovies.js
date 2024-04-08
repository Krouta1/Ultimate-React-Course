import { useState, useEffect } from 'react';

export function useMovies(query, callback) {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const API_KEY = 'bfa4d512';
	useEffect(() => {
		// fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=interstellar`)
		// 	.then(res => res.json())
		// 	.then(data => setMovies(data.Search));

		const controller = new AbortController();

		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError('');
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
					{ signal: controller.signal },
				);

				if (!res.ok)
					throw new Error('Something went wrong with fetching movies');

				const data = await res.json();

				if (data.Response === 'False')
					throw new Error('No movies were found. Please try again.');

				setMovies(data.Search);
			} catch (error) {
				if (error.name === 'AbortError') return;
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

		callback?.(); // optional chaning on function just to remember
		fetchMovies();

		return () => {
			controller.abort();
		};
	}, [query]);

	return { movies, isLoading, error };
}
