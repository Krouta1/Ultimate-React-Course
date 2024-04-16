/* eslint-disable react/prop-types */
import { useCallback, useReducer } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';

const BASE_URL = 'http://localhost:3001';
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    default:
      throw new Error(`Action type ${action.type} not supported`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        throw new Error('Data not found.');
      } finally {
        dispatch({ type: 'rejected', payload: 'Data not found.' });
      }
    }
    fetchCities();
  }, []);

  const findCityById = useCallback(
    async function findCityById(id) {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch {
        throw new Error('Data not found.');
      } finally {
        dispatch({ type: 'rejected', payload: 'Data not found.' });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch {
      throw new Error('Data not found.');
    } finally {
      dispatch({ type: 'rejected', payload: 'Data not found.' });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      throw new Error('Data not found.');
    } finally {
      dispatch({ type: 'rejected', payload: 'Data not found.' });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        findCityById,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}

export { CitiesProvider, useCities };
