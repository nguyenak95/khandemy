import React from 'react';
import './index.scss';

const SearchBar = () => {
  return (
    <div className='nav-item input-group' id='search__bar'>
      <input
        type='text'
        className='form-control'
        placeholder='Tìm kiếm khóa học'
      />
      <div className='input-group-append'>
        <span className='input-group-text' id='addono'>
          <i className='fa fa-search'></i>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
