import React, { Component } from 'react';
import {patchy, skinny, slender, sporty, spotted, stocky, striped, plain} from '../assets/index'
//import spotted from '../assets/spotted.png';

const propertyMap = {
    bodyColor: {
        black: '#263238',
        white: '#cfd8dc',
        green: '#a5d6a7',
        darkblue: '#0277bd'
    },
    pattern: { plain, striped, spotted },
    build: {  skinny, sporty },
    size: { small: 25, big: 75, gigantic: 100 }
};

class DragonAvatar extends Component {
    
    get DragonImage() {
        const dragonPropertyMap = {};

        this.props.dragon.traits.forEach(trait => {
            const { traitType, traitValue } = trait;

            dragonPropertyMap[traitType] = propertyMap[traitType] [traitValue];

        });

        const { bodyColor, build, pattern, size} = dragonPropertyMap;
        const sizing = { width: 200, height:200};
        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{ backgroundColor: propertyMap.bodyColor.darkblue, ...sizing}}></div>
                <img  src={propertyMap.pattern.striped} className='dragon-avatar-image-pattern' style={{...sizing }}/>
                <img  src={propertyMap.build.sporty} className='dragon-avatar-image' style={{...sizing }}/>
            </div>
        );
    }
    render() {
        const { dragon }= this.props.dragon;
        return (
            <div>
                <span>DragonId: {dragon.dragonId}</span>
                <span>generationId: {dragon.generationId }</span>
                { dragon.traits.map( trait => trait.traitValue).join(', ') } 
                { this.DragonImage}
            </div>
        )
    }
}

export default DragonAvatar;