import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function TrainingForm(props) {
    const {addDataToTable} = props;

    const dateRef = useRef();
    const distanceRef = useRef();

    const handleSubmit = evt => {
        evt.preventDefault();
        
        if (dateRef.current.value && distanceRef.current.value) {
            addDataToTable(dateRef.current.value, distanceRef.current.value);            
        }        
    }

    return (
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
    );
}
TrainingForm.propTypes = {
    addDataToTable: PropTypes.func.isRequired
}
export default TrainingForm;