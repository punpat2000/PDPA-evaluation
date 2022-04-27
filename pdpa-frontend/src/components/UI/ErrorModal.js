import { Fragment, memo } from 'react';
import * as ReactDOM from 'react-dom';
import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
	return (
		<Card className={classes.modal}>
			<header className={classes.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.actions}>
				<Button onClick={props.onConfirm}>Okay</Button>
			</footer>
		</Card>
	);
};

const ErrorModal = (props) => {

  console.log('test')
	if (!props.isError) return;

	return ReactDOM.createPortal(
		<Fragment>
			<Backdrop onConfirm={props.onConfirm} />
			<ModalOverlay
				title={props.title}
				message={props.message}
				onConfirm={props.onConfirm}
			/>
		</Fragment>,
		document.getElementById('modal-root')
	);
};

export default memo(ErrorModal);
