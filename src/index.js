import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {
    render() {
        return (
            <div className="container">React App</div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)