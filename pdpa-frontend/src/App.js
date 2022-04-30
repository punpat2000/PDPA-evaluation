import { lazy, Suspense } from 'react';
import './App.css';
import InputForm from './components/Input/InputForm';
// import Results from './components/Result/Results';

function App() {
	const submitHandler = (data) => {
		console.log('form recevied, from app');
		console.log(JSON.stringify(data));
	};

	const LazyResults = lazy(() => import('./components/Result/Results'));

	return (
		<>
			<InputForm onSubmit={submitHandler} />
			<Suspense fallback={<div>Loading...</div>}>
				<LazyResults />
			</Suspense>
		</>
	);
}

export default App;
