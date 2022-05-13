import { useState } from 'react';
import './App.css';
import InputForm from './components/Input/InputForm';
import Results from './components/Result/Results';
import LoadingUI from './components/UI/Loading';
import { MOCK_DATA } from './components/Result/mock-data';

function App() {
	const [isLoading, setLoad] = useState(false);
	const [isAnalyzed, setAnalyze] = useState(false);
	const [data, setData] = useState({});

	const fetchData = async (data) => {
		const res = await fetch('http://localhost:3000/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return res.json();
	};

	const submitHandler = async (data) => {
		setLoad(true);
		const res = await fetchData(data);
		console.log(res);
		// setData(MOCK_DATA);
		setAnalyze(true);
		setLoad(false);
	};

	return (
		<>
			{isLoading && <LoadingUI />}
			{!isAnalyzed ? (
				<InputForm onSubmit={submitHandler} />
			) : (
				<Results data={MOCK_DATA} />
			)}
		</>
	);
}

export default App;
