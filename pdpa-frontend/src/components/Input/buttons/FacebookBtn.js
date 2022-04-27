import React from 'react';
import FacebookIcon from './FacebookIcon';
import styles from './Button.module.css';

const FacebookBtn = (props) => {
	const appliedStyle = `${styles['facebook-btn']} ${
		props.isSelected ? styles.selected : ''
	}`;

	const facebookSelectHandler = () => {
		props.onSelectPlatform('Facebook');
	};

	return (
		<button
			className={appliedStyle}
			onClick={facebookSelectHandler}
			type="button"
		>
			<span>
				<FacebookIcon />
			</span>
		</button>
	);
};

export default React.memo(FacebookBtn);
