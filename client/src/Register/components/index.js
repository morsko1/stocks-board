import React from 'react';
import './index.css';

const RegisterView = props => {
    return (
        <div className={'register-container'}>
            {props.testData}
            <br/>
            <button onClick={() => props.test()}>test</button>
        </div>
    );
}

export default RegisterView;
