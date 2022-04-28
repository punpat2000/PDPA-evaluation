import { Fragment } from 'react';
import styles from './Result.module.css';
import Status from './Status';

const ResultList = (props) => {
	if (props.items.length === 0) {
		return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
	}
	return (
		<Fragment>
			{props.items.map((res, index) => {
				return (
					<Fragment key={index}>
						<div className={styles['result-card']}>
							<span>{res.tweet}</span>
							<br />
							<small className={styles.timestamp}>{res.date}</small>
							<Status label={res.label} />
						</div>
					</Fragment>
				);
			})}
		</Fragment>
	);
};

export default ResultList;
