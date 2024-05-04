import { Header } from 'components';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { setBaseCurrency } from 'reduxState/currency/currencySlice';
import { fetchBaseCurrency } from 'reduxState/currency/operations';
const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    function success(pos) {
      if (!pos?.coords) return;
      const crd = pos.coords;

      dispatch(fetchBaseCurrency(crd));
    }
    function error() {
      dispatch(setBaseCurrency('USD'));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
