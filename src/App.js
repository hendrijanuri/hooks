import React, {useState, useEffect} from 'react';

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);

  // fetch news
  const fetchNews = () => {
    // clear news data every fetch
    setNews([])
    // set loading true
    setLoading(true)
    // fetch api
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(err => console.log(err))
  };

  useEffect(() => {
    document.title = `Search result for "${searchQuery}"`;
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => ( loading ? <p>Loading...</p> : "");

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange} />
      <button>Search</button>
    </form>
  );

  const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

  return (
    <div>
      <h2>News</h2>
      {searchForm()}
      {showLoading()}
      {showNews()}
    </div>
  );
};

export default App;


// COUNTER CLICK APP BELOW 

// function App() {
//   // state
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   });

//   const increment = () => {
//       setCount(count+1)
//   };

//   return (
//     <div>
//       <h2>counter app</h2>
//       <button onClick={increment}>
//         Clicked {count} times
//       </button>
//     </div>
//   );
// };

// export default App;
