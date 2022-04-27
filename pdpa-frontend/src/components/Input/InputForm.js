import { useState, useCallback } from 'react';
import PlatformButtons from './buttons/PlatformButtons';
import ErrorModal from '../UI/ErrorModal';
import './InputForm.css';
import './Input.css';

const today = new Date().toLocaleDateString('en-ca');

const platformNotSelectedText = 'Please select the platform';
const usernameNotEntered = 'Please enter your username';

const InputForm = (props) => {
	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const [selectedPlatform, setSelectedPlatform] = useState('');
	const [enteredUsername, setEnteredUsername] = useState('');
	const [enteredName, setEnteredName] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
	const [enteredDate, setEnteredDate] = useState('');

	const isValidForm = () => {
		if (selectedPlatform === '') {
			setErrorMessage(platformNotSelectedText);
			return false;
		}
		if (enteredUsername === '') {
			setErrorMessage(usernameNotEntered);
			return false;
		}
		return true;
	};

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
		if (!isValidForm()) {
			setIsError(true);
			return;
		}

		const platform = selectedPlatform === 'Twitter' ? 0 : 1;
		const username = enteredUsername.trim();
		const name = enteredName.trim().split(' ');
		const first_name = name[0];
		const last_name = name[1];
		const birth_date = enteredDate;
		const phone_num = enteredPhoneNumber.trim();
		const email = enteredEmail.trim();

		const inputData = {
			platform,
			username,
			...(first_name && { first_name }),
			...(last_name && { last_name }),
			...(birth_date && { birth_date }),
			...(phone_num && { phone_num }),
			...(email && { email }),
		};

		props.onSubmit(inputData);
		resetForm();
	};

	return (
		<div className="new-expense">
			<ErrorModal
				title={'Missing Required Field'}
				message={errorMessage}
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
						<label htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							required
							value={enteredUsername}
							onChange={usernameChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label htmlFor="name">Full Name</label>
						<input
							id="name"
							type="text"
							value={enteredName}
							onChange={nameChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label htmlFor="phone-number">Phone Number</label>
						<input
							id="phone-number"
							type="tel"
							pattern="[0-9]{10}"
							value={enteredPhoneNumber}
							onChange={phoneNumberChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label htmlFor="email">E-mail</label>
						<input
							id="email"
							type="email"
							value={enteredEmail}
							onChange={emailChangeHandler}
						/>
					</div>
					<div className="new-expense__control">
						<label htmlFor="birthdate">Birthdate</label>
						<input
							id="birthdate"
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
