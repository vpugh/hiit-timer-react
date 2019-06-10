import React, { useContext } from 'react';
import './settings.scss';
import { ISettingsState, ISettingsProps, IExercise} from '../../interfaces';
import { Store } from '../../redux/Store';

export default function Settings(props):JSX.Element {
  const {state, dispatch } = useContext(Store);

  console.log(props);

  const handleInput = (ev:React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    if (/^-?\d*$/.test(ev.currentTarget.value) === true) {
      this.setState({ [ev.currentTarget.name]: ev.currentTarget.value })
    }
  }

  const handleListedInput = (ev) => {
    const { value } = ev.currentTarget;
    const index = ev.currentTarget.getAttribute('data-index');
    const updateExercise = [...state.exercises];
    updateExercise[index].name = value;
    // @ts-ignore
    dispatch({ type: 'UPDATE_EXERCISE', exercises: value });
    // onUpdateExercise(value);
  }

  const handleSaving = () => {
    this.setState({ saving: true }, null);
    setTimeout(() => {
      this.setState({ saving: false });
    }, 500);
  }

  const handleDeletion = (ev, index) => {
    ev.preventDefault();
    // @ts-ignore
    dispatch({ type: 'DELETE_EXERCISE', exercises: index});
    // onDeleteExercise(index);
  }
  
  return (
    <div>
      <form>
        <h2 style={{ marginTop: '0' }}>Settings</h2>
        <p>Time should be in seconds, ex: 1 min = 60s.</p>
        <div className="form-inputs">
          <label htmlFor="workoutTime">Workout Time:</label>
          <input type="text" className="shorter" name="workTime" id="workoutTime" value={state.timer[0].workTime} onChange={handleInput} />
        </div>
        <div className="form-inputs">
          <label htmlFor="rest">Rest Time:</label>
          <input type="text" className="shorter" name="restTime" id="rest" value={state.timer[0].restTime} onChange={handleInput} />
        </div>
        <div className="form-inputs">
          <label htmlFor="rounds">Rounds:</label>
          <input type="text" className="shorter" name="rounds" id="rounds" value={state.timer[0].rounds} onChange={handleInput} />
        </div>
        <button type="button" className="btn" onClick={() => dispatch({ type: 'UPDATE_TIMER', workTime: state.timer[0].workTime, restTime: state.timer[0].restTime, rounds: state.timer[0].rounds})}>Update Timer</button>
        <div className="exercises">
          <h3>Exercises:</h3>
          <div className="form-inputs">
            {state.exercises && state.exercises.map((exercise, index) => ( 
              <div key={exercise.name} style={{ margin: '10px 0' }}>
                <label htmlFor="exercises" style={{ marginBottom: '6px' }}>Exercise {index + 1}:</label>
                <div className="combinedBtnInput">
                  <input type="text" name={exercise.name} placeholder={`Exercise ${index + 1}`} value={state.exercises[index].name} data-index={index} onChange={handleListedInput} onBlur={handleSaving} />
                  <button className="deleteExercise" role="button" onClick={ev => handleDeletion(ev, index)}>Delete</button>
                </div>
              </div>
            ))}
            {state.saving && (
              <p>Saving...</p>
            )}
            <button className="btn" onClick={() => dispatch({ type: 'ADD_EXERCISE'})} type="button">Add Exercise</button>
          </div>
        </div>
      </form>
    </div>
  )
}