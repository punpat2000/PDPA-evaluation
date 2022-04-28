import { Fragment } from 'react';
import './App.css';
import InputForm from './components/Input/InputForm';
import Results from './components/Result/Results';

// const DUMMY_EXPENSES = [
// 	{
// 		id: 'e1',
// 		title: 'Toilet Paper',
// 		amount: 94.12,
// 		date: new Date(2020, 7, 14),
// 	},
// 	{ id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
// 	{
// 		id: 'e3',
// 		title: 'Car Insurance',
// 		amount: 294.67,
// 		date: new Date(2021, 2, 28),
// 	},
// 	{
// 		id: 'e4',
// 		title: 'New Desk (Wooden)',
// 		amount: 450,
// 		date: new Date(2021, 5, 12),
// 	},
// ];

function App() {
	// const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

	const submitHandler = (data) => {
		console.log('form recevied, from app');
		console.log(JSON.stringify(data));
	};

	return (
		<>
			<InputForm onSubmit={submitHandler} />
			<Results />
		</>
	);
}

export default App;
