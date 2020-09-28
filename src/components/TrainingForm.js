import React, { useState, useRef } from 'react';
import TrainingModel from '../TrainingModel';
import TrainingTable from './TrainingTable';
import { nanoid } from 'nanoid';

function TrainingForm() {
    const dateRef = useRef();
    const distanceRef = useRef();
    const [trainingData, setTrainingData] = useState([]);

    const handleSubmit = evt => {
        evt.preventDefault();
        if (dateRef.current.value && distanceRef.current.value) {
            let trainingDate = new Date(dateRef.current.value);
            let isDateExist = false;

            //check if training with the same date exist
            let updatedTrainingData = trainingData.map(el => {
                if (el.date.getTime() === trainingDate.getTime()) {
                    el.distance += Number(distanceRef.current.value);
                    isDateExist = true;
                }
                return el;
            });

            if (!isDateExist) {
                //add new training to training list
                let training = new TrainingModel(nanoid(), trainingDate, distanceRef.current.value);
                setTrainingData(prevTraining => [...prevTraining, training]);
            } else {
                //update training list
                setTrainingData(updatedTrainingData);
            }
        }        
    }

    const removeHandler = id => {
        setTrainingData(prevData => prevData.filter(o => o.id !== id));
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <table id="inputs">
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="trainingDate"> Дата (ДД.ММ.ГГ) </label>
                        </td>
                        <td>
                            <label htmlFor="distance"> Пройдено км </label>
                        </td>
                        <td>                        
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="date" id="trainingDate" name="trainingDate" ref={dateRef}/>
                        </td>
                        <td>
                            <input type="number" step="0.1" id="distance" name="distance" ref={distanceRef}/>
                        </td>
                        <td>
                            <button type="submit"> ОК </button>
                        </td>
                    </tr>
                </tbody>
            </table>            
        </form>
        <TrainingTable trainingData={trainingData} removeHandler={id => removeHandler(id)}/>
        </>
    );
}

export default TrainingForm;