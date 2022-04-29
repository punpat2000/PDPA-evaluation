import styles from './Result.module.css';
import { generateUid } from '../../utils/generate-uid';
import { LABEL_TEXT } from './label-text';
import { memo } from 'react';

const isCategory = (label) => {
	return ['none', 'religion', 'politics', 'sexual', 'health'].includes(label);
};

const Status = (props) => {
	return (
		<>
			{props.labels.map((label) => {
				return (
					<div
						className={`${styles.label} ${
							isCategory(label) ? styles[label] : styles.normal
						}`}
						key={generateUid()}
					>
						{LABEL_TEXT[label]}
					</div>
				);
			})}
		</>
	);
};

export default memo(Status);
