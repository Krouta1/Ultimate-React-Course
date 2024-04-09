import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import Error from './components/Error';
import Main from './components/Main';
import './index.css';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';

const initialState = {
	questions: [],
	status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
			};
		case 'newAnswer': {
			const currentQuestion = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				points:
					action.payload === currentQuestion.correctOption
						? state.points + currentQuestion.points
						: state.points,
			};
		}
		case 'nextQuestion':
			return { ...state, index: state.index + 1, answer: null };
		case 'finish':
			return {
				...state,
				status: 'finished',
				highScore:
					state.points > state.highScore ? state.points : state.highScore,
			};
		case 'restart':
			return { ...initialState, status: 'ready' };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function App() {
	const [
		{ questions, status, index, answer, points, highScore },
		dispatch,
	] = useReducer(reducer, initialState);
	const questionCount = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0,
	);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchData() {
			try {
				const response = await fetch('http://localhost:3001/questions', {
					signal: controller.signal,
				});
				if (!response.ok) throw new Error('Network response was not ok');
				const data = await response.json();
				dispatch({ type: 'dataReceived', payload: data });
			} catch (error) {
				// Ignore fetch abort errors
				if (error.name === 'AbortError') return;
				dispatch({ type: 'dataFailed', payload: error });
			}
		}

		fetchData();

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen questionCount={questionCount} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							index={index}
							questionCount={questionCount}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton
							dispatch={dispatch}
							answer={answer}
							index={index}
							questionCount={questionCount}
						/>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highScore={highScore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}

export default App;
