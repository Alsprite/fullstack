import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      Filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;