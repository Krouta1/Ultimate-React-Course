import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Spinner';
import CountryItem from './CountryItem';

const CountryList = ({ cities, isLoading }) => {
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message="Add your first city by clicking on city on the map" />
		);
	const countries = [];
	return (
		<ul className={styles.countryList}>
			{countries.map(country => (
				<CountryItem key={country.id} country={country} />
			))}
		</ul>
	);
};

export default CountryList;
