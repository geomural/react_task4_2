import React, {useState} from 'react';
import './App.css';
import TrainingForm from './components/TrainingForm';
import TrainingModel from './TrainingModel';
import TrainingTable from './components/TrainingTable';
import { nanoid } from 'nanoid';

function App() {  
  const [trainingData, setTrainingData] = useState([]);

  function addDataToTable(value, distance) {
    let trainingDate = new Date(value);
    let isDateExist = false;

    //check if training with the same date exist
    let updatedTrainingData = trainingData.map(el => {
        if (el.date.getTime() === trainingDate.getTime()) {
            el.distance += Number(distance);
            isDateExist = true;
        }
        return el;
    });

    if (!isDateExist) {
        //add new training to training list
        let training = new TrainingModel(nanoid(), trainingDate, distance);
        setTrainingData(prevTraining => [...prevTraining, training]);
    } else {
        //update training list
        setTrainingData(updatedTrainingData);
    }
  }

  return (
    <div className="App">
      <TrainingForm addDataToTable={addDataToTable}/>
      <TrainingTable trainingData={trainingData} setTrainingData={setTrainingData}/>
    </div>
  );
}

export default App;
