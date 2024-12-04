// SearchResults.js
import React from 'react';

function SearchResults({ data, query }) {
  // Filter data based on the search query
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
);

return (
    <div className="search-results">
        <ul>
            {filteredData.map((result, index) => (
            <li key={index}>{result}</li>
            ))}
        </ul>
    </div>
  );
}

export default SearchResults;
