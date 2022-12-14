import logo from './logo.svg';
import './App.css';import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import Nav from './nav'
import Button from './button'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: '20 Most Frequent Words',
    },
    maintainAspectRatio: false,
    responsive: true,
  },
};

function App() {
  
  const [xAxis, setxAxis] = useState(null);
  const [yAxis, setyAxis] = useState(null);

  const data = {
    labels : xAxis,
    datasets: [
      {
        label: xAxis,
        data: yAxis,
        backgroundColor: 'black',
      },
    ],
  };

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
    const topWords = frequencyArr.slice(0, 20).map(el => [el[0], el[1]]);
    const words = topWords.map(x => x[0]);
    const freq = topWords.map(x => x[1]);
    setxAxis(words);
    setyAxis(freq);
  } 
  
  return (
    <div className="App">
      <Nav />
      <div className='btnBox'>
        <Button onClickFunction={fetchData} text={"Fetch Data"} />
      </div>
      <div className='graphBox'>
        { xAxis  ?  <Bar options={options} data={data} /> : ""  }
      </div>
      
    </div>
  );
}

export default App;
