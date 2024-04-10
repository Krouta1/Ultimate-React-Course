import styles from './Map.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h1>{lat}</h1>
    </div>
  );
};

export default Map;
