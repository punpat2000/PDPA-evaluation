import { useState } from 'react';
import './App.css';
import InputForm from './components/Input/InputForm';
import Results from './components/Result/Results';
import LoadingUI from './components/UI/Loading';
import { MOCK_DATA } from './components/Result/mock-data';
import ErrorModal from './components/UI/ErrorModal';

function App() {
	const [isError, setIsError] = useState(false);
	const [isLoading, setLoad] = useState(false);
	const [isAnalyzed, setAnalyze] = useState(false);
	const [analyzedData, setData] = useState(MOCK_DATA);

	const fetchData = async (data) => {
		const res = await fetch('http://localhost:8001/query', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return await res.json();
	};

	const submitHandler = async (data) => {
		setLoad(true);
		try {
			console.log(data);
			const res = await fetchData(data);
			console.log(res);
			setData(res);
			setAnalyze(true);
		} catch (e) {
			setIsError(true);
			console.log(e.name);
		}
		setLoad(false);
	};

	const errorHandler = () => {
		setIsError(false);
	};

	return (
		<>
			{isError && (
				<ErrorModal
					title={'error'}
					message="An error occurred. Please try again later."
					onConfirm={errorHandler}
					isError={isError}
				/>
			)}
			{isLoading && <LoadingUI />}
			{!isAnalyzed ? (
				<InputForm onSubmit={submitHandler} />
			) : (
				<Results data={analyzedData} />
			)}
		</>
	);
}

export default App;
