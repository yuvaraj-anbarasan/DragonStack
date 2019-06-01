import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

const DEFAULT_DRAGON = { dragonId: '', generationId: '', birthdate: '', nickname: '', traits: []};

class Dragon extends Component {
    state = { dragon: DEFAULT_DRAGON };

    componentDidMount() {
        this.fetchDragon();
    }

    fetchDragon = () => {
        fetch('http://localhost:3000/dragon/new')
        .then(response => response.json())
        .then(json => {
            console.log('json',json)

            this.setState( { dragon: json.dragon });
        })
        .catch(error => console.error('error',error));
    };

    render() {
       
        return (
            <div>
                <Button onClick = { this.fetchDragon }>New Dragon</Button>
                <DragonAvatar dragon={this.state}/>
            </div>  
        );
        //fetchDragon() is called and every time the state is updated
    }
}

export default Dragon;