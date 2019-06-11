import React, { useContext } from 'react';
import { Store } from '../../redux/Store';

export default function TextInputs({
  index, setSaving,
}) {
  const {state, dispatch} = useContext(Store);

  const handleListedInput = (ev) => {
    const { value } = ev.currentTarget;
    const index = ev.currentTarget.getAttribute('data-index');
    const updateExercise = [...state.exercises];
    updateExercise[index].name = value;
    dispatch({ type: 'UPDATE_EXERCISE', exercises: value });
  }
  
  const handleSaving = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 500);
  }
  
  const handleDeletion = (ev, index) => {
    ev.preventDefault();
    dispatch({ type: 'DELETE_EXERCISE', index: index});
  }

  return (
    <div style={{ margin: '10px 0' }}>
      <label
        htmlFor="exercises"
        style={{ marginBottom: '6px' }}
      >
        Exercise {index + 1}:
      </label>
      <div className="combinedBtnInput">
        <input type="text" name={`Exercise ${index + 1}`} placeholder={`Exercise ${index + 1}`} value={state.exercises[index].name} data-index={index} onChange={handleListedInput} onBlur={handleSaving} />
        <button className="deleteExercise" role="button" onClick={ev => handleDeletion(ev, index)}>Delete</button>
      </div>
    </div>
  )
}
