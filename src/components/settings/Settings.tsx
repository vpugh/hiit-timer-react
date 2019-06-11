import React, { useContext, useState } from 'react';
import './settings.scss';
import { IExercise } from '../../interfaces';
import { Store } from '../../redux/Store';
import FormInputs from './formInputs';
import TextInputs from './textInputs';

export default function Settings():JSX.Element {
  const {state, dispatch } = useContext(Store);
  const [saving, setSaving] = useState(false);
  const [rest, setRest] = useState(state.timer[0].restTime);
  const [work, setWork] = useState(state.timer[0].workTime);
  const [round, setRound] = useState(state.timer[0].rounds);

  const handleInput = (ev:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.currentTarget;
    if (/^-?\d*$/.test(value) === true) {
      if (name === 'workoutTime') {
        setWork(value);
      }
      if (name === 'restTime') {
        setRest(value);
      }
      if (name === 'rounds') {
        setRound(value);
      }
    }
  }
  
  return (
    <div>
      <form>
        <h2 style={{ marginTop: '0' }}>Settings</h2>
        <p>Time should be in seconds, ex: 1 min = 60s.</p>
        <FormInputs
          title="Workout Time"
          name="workoutTime"
          id="workoutTime"
          value={work}
          onChange={handleInput}
        />
        <FormInputs
          title="Rest Time"
          name="restTime"
          id="restTime"
          value={rest}
          onChange={handleInput}
        />
        <FormInputs
          title="Rounds"
          name="rounds"
          id="rounds"
          value={round}
          onChange={handleInput}
        />
        <button
          type="button"
          className="btn"
          onClick={
            () => dispatch({ type: 'UPDATE_TIMER', restTime: rest, workTime: work, rounds: round})}
          >
            Update Timer
        </button>
        <div className="exercises">
          <h3>Exercises:</h3>
          <div className="form-inputs">
            {state.exercises && state.exercises.map((exercise:IExercise, index:number) => ( 
              <TextInputs key={exercise.index} index={index} setSaving={setSaving} />
            ))}
            {saving && (
              <p>Saving...</p>
            )}
            <button className="btn" onClick={() => dispatch({ type: 'ADD_EXERCISE'})} type="button">Add Exercise</button>
          </div>
        </div>
      </form>
    </div>
  )
}