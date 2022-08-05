import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setData(data.message)
        });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
};

export default App;
