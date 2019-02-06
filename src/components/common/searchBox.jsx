import React from 'react';

const SearchBox = ({ value, onChange }) => {
	return (
		<input
			type="text"
			className="form-control my-3"
            placeholder="Search movies..."
			value={value}
			onChange={(e) => onChange(e.currentTarget)}
		/>
	);
};

export default SearchBox;
