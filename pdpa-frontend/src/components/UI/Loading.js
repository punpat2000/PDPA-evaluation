import { Fragment, memo } from 'react';
import * as ReactDOM from 'react-dom';
import classes from './Loading.module.css';

const Backdrop = () => {
	return <div className={classes.backdrop} />;
};

const LoadingOverlay = () => {
	return (
		<div className={classes.modal}>
			<div className={classes.loader}>Loading...</div>
		</div>
	);
};

const LoadingUI = () => {
	return ReactDOM.createPortal(
		<Fragment>
			<Backdrop />
			<LoadingOverlay />
		</Fragment>,
		document.getElementById('loading-ui')
	);
};

export default memo(LoadingUI);
