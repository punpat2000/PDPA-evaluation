import { useState, memo } from 'react';
import ResultList from './ResultList';
import SortBtn from './SortBtn';
import { generateUid } from '../../utils/generate-uid';
import { compare } from '../../utils/compare';

/**
 * @param  {Array} arr
 */
function transform(arr) {
	if (arr.length === 0) return arr;
	return arr.map((res) => {
		return { ...res, id: generateUid() };
	});
}

const Results = (props) => {
	const [results, setResults] = useState(transform(props.data));

	const sortHandler = (sortBy) => {
		setResults((prevState) => {
			if (sortBy === 'label' || sortBy === 'unsort') {
				const sortedList = [...prevState].sort(compare);

				if (
					sortedList.length === prevState.length &&
					sortedList.every((value, index) => value.id === prevState[index].id)
				) {
					return prevState;
				}
				return sortedList;
			}
		});
	};

	return (
		<>
			<SortBtn onSort={sortHandler} />
			<ResultList items={results} />
		</>
	);
};

export default memo(Results);
