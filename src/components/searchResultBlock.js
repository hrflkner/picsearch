/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import axios from 'axios';

function searchResultBlock() {

  const [photo, setPhoto] = useState("");
  const [clientId] = useState(_INSERT_API_KEY_HERE_) // Delete and Replace with API KEY as String
  const  [result, setResult] = useState([]);

  function inputText(event) {
    setPhoto(event.target.value);
  }

  function handleEnter(event) {
    if (event.key === 'Enter') {
      search(event);
    }
  }

  function search(event) {
    const url = "https://api.unsplash.com/search/photos?page=1&per_page=30&query="+photo+'&client_id='+clientId;
    axios.get(url).then(response => {
      console.log(response);
      setResult(response.data.results);
    });
  }

return (
  <>
    <main>
      <section className="searchbar">
        <input onChange={inputText} onKeyDown={handleEnter} type="text" placeholder="just start typing..."></input>
        <button onClick={search}>Search</button>
      </section>

      <section className="return-block">
        {result.map((photo) => (
          <section className="photoblock">
            <img key={photo.id} src={photo.urls.small} alt={photo.description}/>
            <section className="image-info">
              <span>Author: {photo.user.name}</span>
              <span>Location: {photo.user.location ? photo.user.location : 'Unknown'}</span>
            </section>
          </section>
        ))}
      </section>
    </main>
  </>
);
}

export default searchResultBlock;