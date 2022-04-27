import { useState, useCallback } from 'react';
import PlatformButtons from './buttons/PlatformButtons';
import ErrorModal from '../UI/ErrorModal';
import './InputForm.css';
import './Input.css'

const today = new Date().toLocaleDateString('en-ca');

const InputForm = (props) => {
	const [isError, setIsError] = useState(false);
	const [selectedPlatform, setSelectedPlatform] = useState('');
	const [enteredUsername, setEnteredUsername] = useState('');
	const [enteredName, setEnteredName] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
	const [enteredDate, setEnteredDate] = useState('');

	const platformSelectHandler = useCallback((platform) => {
		setSelectedPlatform(platform);
	}, []);

	const errorHandler = useCallback(() => {
		setIsError(false);
	}, []);

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const nameChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const phoneNumberChangeHandler = (event) => {
		setEnteredPhoneNumber(event.target.value);
	};

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const resetForm = () => {
		setSelectedPlatform('');
		setEnteredUsername('');
		setEnteredName('');
		setEnteredPhoneNumber('');
		setEnteredEmail('');
		setEnteredDate('');
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const expenseData = {
			title: enteredName,
			amount: enteredEmail,
			date: new Date(enteredDate),
		};

		props.onAddExpense(expenseData);
		resetForm();
	};

	return (
		<div className="new-expense">
			<ErrorModal
				title={'Invalid User Input'}
				message={'messagedlfhgsh ;udf sdujfh suf'}
				onConfirm={errorHandler}
				isError={isError}
			/>
			<form onSubmit={submitHandler}>
				<div className="new-expense__controls">
					<h2>Select Platform</h2>
				</div>
				<PlatformButtons
					platform={selectedPlatform}
					onSelectPlatform={platformSelectHandler}
				/>
				<div className="new-expense__controls">
					<div className="new-expense__control">
						<label>Username</label>
						<input
							type="text"
							value={enteredUsername}
							onChange={usernameChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label>Full Name</label>
						<input
							type="text"
							value={enteredName}
							onChange={nameChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label>Phone Number</label>
						<input
							type="tel"
							pattern="[0-9]{10}"
							value={enteredPhoneNumber}
							onChange={phoneNumberChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label>E-mail</label>
						<input
							type="email"
							value={enteredEmail}
							onChange={emailChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label>Birthdate</label>
						<input
							type="date"
							max={today}
							value={enteredDate}
							onChange={dateChangeHandler}
						/>
					</div>
				</div>
				<div className="new-expense__actions">
					<button className="button" type="button" onClick={resetForm}>
						Reset
					</button>
					<button className="button" type="submit">
						Analyze
					</button>
				</div>
			</form>
		</div>
	);
};

export default InputForm;
