import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Generation from './components/Generation'
import Dragon from './components/Dragon';
import './index.css';
import { generationReducer } from './reducers';
import { generationActionCreator } from './actions/generation'

const GENERATION_ACTION_TYPE = 'GENERATION_ACTION_TYPE';


const store = createStore( 
    generationReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => console.log('store state update',store.getState())); //whenever subscribe in encountered state is updated.

store.dispatch({
    type: GENERATION_ACTION_TYPE,
    generation: { generationId:'1', expiration:'10-03-1999'}
});

console.log('store.getState()',store.getState());



const action = generationActionCreator({
    generationId:'10',
    expiration: '2020'
});

store.dispatch(action);

fetch('http://localhost:3000/generation')
.then( response => response.json())
.then( json =>{
    store.dispatch(generationActionCreator(json.generation));
});
render(
    <Provider store = {store}>
        <div>
        <Generation />
        <Dragon />
    </div>
    </Provider>,
    document.getElementById('root')
);