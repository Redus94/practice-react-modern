// ./src/components/App.js
import React from 'react';
import Box from './Box';
import TextContext from '../context';

class App extends React.Component {
    state = {
        text: 'React HelloWorld Modern!',
    };

    render() {
        const { text } = this.state;

        return (
            <TextContext.Provider value={text}>
                <Box />
            </TextContext.Provider>
        );
    }
}

export default App;
