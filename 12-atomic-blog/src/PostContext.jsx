/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

const PostContext = createContext();

function PostProvider({ children }) {
	function createRandomPost() {
		return {
			title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
			body: faker.hacker.phrase(),
		};
	}

	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, () => createRandomPost()),
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [isFakeDark, setIsFakeDark] = useState(false);

	// Derived state. These are the posts that will actually be displayed
	const searchedPosts =
		searchQuery.length > 0
			? posts.filter(post =>
					`${post.title} ${post.body}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			  )
			: posts;

	function handleAddPost(post) {
		setPosts(posts => [post, ...posts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}

	// Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
	useEffect(
		function() {
			document.documentElement.classList.toggle('fake-dark-mode');
		},
		[isFakeDark],
	);

	const value = useMemo(() => {
		return {
			posts: searchedPosts,
			onAddPost: handleAddPost,
			onClearPosts: handleClearPosts,
			searchQuery,
			setSearchQuery,
		};
	}, [searchQuery, searchedPosts]);

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePosts() {
	const context = useContext(PostContext);

	if (!context) {
		throw new Error('usePost must be used within a PostProvider');
	}

	return context;
}

export { PostProvider, usePosts };
