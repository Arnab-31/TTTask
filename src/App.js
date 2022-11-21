import logo from './logo.svg';
import './App.css';

function App() {

  const fetchData = async () => {
    const res = await fetch('https://www.terriblytinytales.com/test.txt');
    const text = await res.text();
    const wordsArray = text.split(' ');

    const map = {};
    wordsArray.forEach(word => {
       if(map.hasOwnProperty(word)){
          map[word]++;
       }else{
          map[word] = 1;
       }
    });

    const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
    frequencyArr.sort((a, b) => b[1] - a[1]);
    const topWords = frequencyArr.slice(0, 5).map(el => [el[0], el[1]]);
    console.log(topWords);
  } 
  
  const onClick  = () => {
    fetchData();
  }   
  return (
    <div className="App">
      <h1>Terribly Tiny Tales</h1>
      <button onClick={fetchData}>Click to fetch</button>
    </div>
  );
}

export default App;
