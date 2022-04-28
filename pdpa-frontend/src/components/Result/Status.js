import styles from './Result.module.css';

const Status = (props) => {
	const appliedStyle = `${styles.label} ${styles[props.label]}`;
	return <div className={appliedStyle}>{props.label}</div>;
};

export default Status;
