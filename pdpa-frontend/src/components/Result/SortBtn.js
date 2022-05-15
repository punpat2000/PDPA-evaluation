import { useState } from 'react';
import styles from './Result.module.css';

const SortBtn = (props) => {
	const [status, setStatus] = useState('sort');

	const sortHandler = () => {
		switch (status) {
			default:
			case 'sort': {
				props.onSort('label');
				setStatus('unsort');
				console.log('sort was called');
				break;
			}
			case 'unsort': {
				props.onSort('unsort');
				setStatus('sort');
				break;
			}
		}
		// props.onSort('label');
	};

	return (
		<div className={`padding-rule ${styles['sort-holder']}`}>
			<button
				className={styles['sort-btn']}
				type="button"
				onClick={sortHandler}
			>
				{status}
			</button>
		</div>
	);
};

export default SortBtn;
