import { useState, memo } from 'react';
import { MOCK_DATA } from './mock-data';
import ResultList from './ResultList';
import SortBtn from './SortBtn';
import { generateUid } from '../../utils/generate-uid';
import { compare } from '../../utils/compare';

/**
 * @param  {Array} arr
 */
function transform(arr) {
	if (arr.length === 0) return arr;
	return arr
		.map((res) => {
			return { ...res, id: generateUid() };
		})
		.sort(compare);
}

const Results = () => {
	const [results, setResults] = useState(transform(MOCK_DATA));

	const sortHandler = (sortBy) => {
		setResults((prevState) => {
			if (sortBy === 'label') {
				console.log('test');
				const sortedList = [...prevState].sort(compare);

				if (
					sortedList.length === prevState.length &&
					sortedList.every((value, index) => value.id === prevState[index].id)
				) {
					return prevState;
				}
				console.log(sortedList);
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
