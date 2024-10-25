import React, { useEffect, useRef, useState } from 'react';
import useRandomItem from './hook';

const SpeedTest = function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [text, setText] = useState('')
    const [time, setTime] = useState(0)
    const [length, setLength] = useState(0)

    const timeId = useRef(null)

    useEffect(() => {
        regenerateWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        if(text === word){
            regenerateWord()
            setLength((prevState) => prevState + text.length)
            setText('')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[text])

    const startTime = () => {
        timeId.current = setInterval(()=>{
            setTime((prevState) => prevState + 1)
        },1000)
    }

    const stopTime = () => {
        clearInterval(timeId.current)
    }

    const reset = () => {
        setTime(0)
        setLength(0)
        regenerateWord()
    }

    return (
        <div>
            <h1>{word}</h1>
            <h3>{`Stoper : ${time}`} <button type="submit" onClick={()=>stopTime()}>Stop</button> <button disabled={time === 0} type='submit' onClick={()=> reset()}>Reset</button></h3>
            <input onFocus={startTime} onBlur={stopTime} value={text} onChange={(e) => setText(e.target.value)}/>
            <h3>{`Ilość poprawnie wprowadzonych znaków : ${length}`}</h3>
            <h3>{`Ilość znaków na sekundę ${time > 0 ? (length / time).toFixed(2) : 0}`}</h3>
        </div>
    );
}

export default SpeedTest;
