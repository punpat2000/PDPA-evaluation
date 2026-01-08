import TwitterIcon from './TwitterIcon';
import styles from './Button.module.css';

const TwitterBtn = (props) => {
	const appliedStyle = `${styles['twitter-btn']} ${
		props.isSelected ? styles.selected : ''
	}`;

	const twitterSelectHandler = () => {
		props.onSelectPlatform('Twitter');
	};

	return (
		<button
			className={appliedStyle}
			onClick={twitterSelectHandler}
			type="button"
			aria-label="Twitter"
		>
			<span>
				<TwitterIcon />
			</span>
		</button>
	);
};

export default TwitterBtn;
