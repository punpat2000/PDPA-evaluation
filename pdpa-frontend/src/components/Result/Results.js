import { useState } from 'react';
import { MOCK_DATA } from './mock-data';
import ResultList from './ResultList';

const Results = () => {
	const [results, setResults] = useState(MOCK_DATA);

	return (
		<>
			<ResultList items={results} />
		</>
	);
};

export default Results;
