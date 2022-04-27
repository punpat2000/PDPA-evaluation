import { useState } from 'react';
import InputForm from './InputForm';
import './Input.css';

const Input = (props) => {
	const [isEditing, setIsEditing] = useState(false);

	const saveExpenseDataHandler = (enteredExpenseData) => {
		const expenseData = {
			...enteredExpenseData,
			id: Math.random().toString(),
		};
		props.onAddExpense(expenseData);
		setIsEditing(false);
	};

	const stopEditingHandler = () => {
		setIsEditing(false);
	};

	return (
		<div className="new-expense">
			{!isEditing && (
				<InputForm
					onSaveExpenseData={saveExpenseDataHandler}
					onCancel={stopEditingHandler}
				/>
			)}
		</div>
	);
};

export default Input;
