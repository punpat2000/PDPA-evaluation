import { useState, memo } from "react";
import ResultList from "./ResultList";
import SortBtn from "./SortBtn";
import { generateUid } from "../../utils/generate-uid";
import { compare } from "../../utils/compare";

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
  const initialList = useState(results)[0];

  const isUnaltered = (prevList, newList) => {
    return (
      newList.length > 0 &&
      prevList.length === newList.length &&
      prevList.every((value, index) => value.id === newList[index].id)
    );
  };

  const sortHandler = (sortBy) => {
    setResults((prevState) => {
      if (sortBy === "label") {
        const sortedList = [...prevState].sort(compare);
        return isUnaltered(prevState, sortedList) ? prevState : sortedList;
      }
      if (sortBy === "unsort") {
        return initialList;
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
