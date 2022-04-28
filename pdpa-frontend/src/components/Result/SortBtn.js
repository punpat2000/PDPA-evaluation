import styles from './Result.module.css';

const SortBtn = (props) => {
	const sortHandler = () => {
		props.onSort('label');
	};
	return (
		<div className={`padding-rule ${styles['sort-holder']}`}>
			<button
				className={styles['sort-btn']}
				type="button"
				onClick={sortHandler}
			>
				sort
			</button>
		</div>
	);
};

export default SortBtn;
