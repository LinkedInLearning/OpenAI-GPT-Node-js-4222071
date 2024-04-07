import { useState, useEffect } from "react";
import "./App.css";
import LazyImage from "./components/Gallery";

function App() {
  const [data, setData] = useState([]);
  function fetchImages() { 
    fetch("   http://127.0.0.1:4000/read")
    .then(response => response.json())
    .then(data => data.images)
    .then(setData)
  }

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div data-test-id="component-app" className="container">
      <h1>🖼️ Image Gallery</h1>

      <div className="flexbox">
        {data.map((item, index) => (
          <LazyImage {...item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
