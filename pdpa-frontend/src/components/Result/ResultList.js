import { Fragment } from 'react';
import styles from './Result.module.css';
import Status from './Status';

const ResultList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className={styles['result-card']}>
				<h2 className="expenses-list__fallback">Found No Posts</h2>
			</div>
		);
	}
	return (
		<Fragment>
			{props.items.map((res) => {
				return (
					<div className={`padding-rule ${styles['result-card']}`} key={res.id}>
						<span>{res.content}</span>
						<br />
						<small className={styles.timestamp}>{res.date}</small>
						<Status labels={res.labels} />
					</div>
				);
			})}
		</Fragment>
	);
};

export default ResultList;
