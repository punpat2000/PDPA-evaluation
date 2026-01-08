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
		// OLD API CALL - COMMENTED OUT
		// const res = await fetch('http://query', {
		// 	method: 'POST',
		// 	mode: 'cors',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		// });
		// return await res.json();

		// Mock API response - simulate network delay
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		// Return mock data based on input
		// You can customize this to return different mock data based on the input
		const mockResponse = MOCK_DATA.map(item => ({
			...item,
			// Optionally filter or modify based on input data
			// For now, just return the mock data as-is
		}));
		
		return mockResponse;
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
