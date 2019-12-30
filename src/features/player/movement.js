import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'


export default function handleMovement(player) {    
    // Up => 87
    // left => 65
    // right => 68
    // down => 83
    // jump => 32
    // attack => 80

    function getNewPosition(oldPos,direction) {
      
        switch (direction) {
            case 'WEST': 
                return [ oldPos[0] + SPRITE_SIZE, oldPos[1] ]
            case 'EAST': 
                return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]
            case 'NORTH': 
                return [ oldPos[0], oldPos[1] - SPRITE_SIZE ]
            case 'SOUTH': 
                return [ oldPos[0], oldPos[1] + SPRITE_SIZE ]
            default:
                return [ oldPos[0], oldPos[1] ]
        }
    };


    function getSpriteLocation(direction,walIndex) {
        switch(direction) {
            case 'WEST':
                return `${SPRITE_SIZE*walIndex}px ${SPRITE_SIZE*1}px`
            case 'EAST':
                return `${SPRITE_SIZE*walIndex}px ${SPRITE_SIZE*2}px`
            case 'SOUTH':
                return `${SPRITE_SIZE*walIndex}px ${SPRITE_SIZE*0}`
            case 'NORTH':
                return `${SPRITE_SIZE*walIndex}px ${SPRITE_SIZE*3}`
            default:
                return console.log('this is not key')
        }
    }

    function getWalkIndex() {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 8 ? 0 : walkIndex + 1
    }

    function observeBoundaries (oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
            (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
            ? newPos : oldPos
    };


    function observeImpassible (oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        return nextTile < 5
    }


    function dispatchMove(direction, newPos) {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction: direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction,walkIndex)
                // position: observeBoundaries(oldPos,getNewPosition(direction))
            }
        })
    }

    function actionMove(type) {
        console.log(type)
    }


    function attempMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition( oldPos,direction)
        if(observeBoundaries(oldPos, newPos) && observeImpassible(oldPos, newPos)) {
            dispatchMove(direction,newPos)
        }
    }


    function handleKeyDown(e) {
        e.preventDefault()
        switch(e.keyCode) {
            case 87:
                return attempMove('NORTH')
            case 68:
                return attempMove('WEST')
            case 65:
                return attempMove('EAST')
            case 83:
                return attempMove('SOUTH')
            case 32:
                return actionMove('JUMP')
            case 80:
                return actionMove('ATTACK')
            default:
                console.log(e.keyCode)
        }
    }


    
    
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player;
}