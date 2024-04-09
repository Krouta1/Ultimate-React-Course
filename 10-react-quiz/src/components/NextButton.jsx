/* eslint-disable react/prop-types */

const NextButton = ({ dispatch, answer, index, questionCount }) => {
	if (answer === null) return null;
	if (index < questionCount - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>
				Next
			</button>
		);
	if (index === questionCount - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'finish' })}
			>
				Finish
			</button>
		);
};

export default NextButton;
