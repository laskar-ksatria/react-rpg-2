import React from 'react';

import Player from '../player/player.jsx'

import Map from '../map/map.jsx'

import { tiles } from '../../data/maps/1/index'

import store from '../../config/store'

function World (props) {
    store.dispatch({type: 'ADD_TILES', payload: {
        tiles: tiles,
    }})
    return (
        <div style={{
            position: 'relative',
            width: '800px',
            height: '400px',
            margin: '20px auto',
        }}>
            <Map tiles={tiles} />
            <Player />
        </div>
    )

}


export default World;