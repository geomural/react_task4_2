import React from 'react';
import PropTypes from 'prop-types';

const formatter = new Intl.DateTimeFormat("ru");

function TrainingTable(props) {
    const {trainingData, setTrainingData} = props;
    let rows = [];
   
    const removeHandler = id => {
        setTrainingData(prevData => prevData.filter(o => o.id !== id));
    }

    if (trainingData) {
        trainingData.sort(function(a,b){return b.date.getTime() - a.date.getTime()});    
        trainingData.forEach(element => {
            rows.push(
                <tr key={element.id} id={element.id}>
                    <td> {formatter.format(element.date)} </td>
                    <td> {element.distance.toFixed(1)} </td>
                    <td>
                        <button id="remove" onClick={() => removeHandler(element.id)}> x </button>
                    </td>
                </tr>
            )                 
        });
    }
    return (
        <table id="trainingTable">
            <thead>
                <tr>
                    <td>
                        <label> Дата (ДД.ММ.ГГ) </label>
                    </td>
                    <td>
                        <label> Пройдено км </label>
                    </td>
                    <td>
                        <label> Действия </label>                                             
                    </td>
                </tr>
            </thead>
            <tbody id="trainingTableBody">
                {rows.length > 0 ? rows : null}
            </tbody>
        </table>
    );
}

TrainingTable.propTypes = {
    trainingData: PropTypes.array.isRequired,
    setTrainingData: PropTypes.func.isRequired
}
export default TrainingTable;