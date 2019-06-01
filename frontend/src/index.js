import React from 'react';
import { render } from 'react-dom';
import Generation from './components/Generation'
import Dragon from './components/Dragon';
import './index.css';

render(
    <div>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
);