import React from 'react';
import Character from './imagePlayer/claude.png'
import { connect } from 'react-redux'
import handleMovement from './movement'


function Player (props) {
    return (
        <div style={{
            position: 'absolute',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: `url('${Character}')`,
            backgroundPosition: props.spriteLocation,
            width: '32px',
            height: '63px'
        }}>
            
        </div>
    )
}

function mapStateToProps (state) {
    return {
        ...state.player,
    }
}

export default connect(mapStateToProps)(handleMovement(Player))