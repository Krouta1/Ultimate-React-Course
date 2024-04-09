/* eslint-disable react/prop-types */

const Progress = ({
	index,
	questionCount,
	points,
	maxPossiblePoints,
	answer,
}) => {
	return (
		<header className="progress">
			<progress max={questionCount} value={index + Number(answer !== null)} />
			<p>
				Question <strong>{index + 1}</strong> / {questionCount}
			</p>
			<p>
				<strong>{points}</strong> / {maxPossiblePoints} points
			</p>
		</header>
	);
};

export default Progress;
