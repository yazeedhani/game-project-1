console.log('Linked.')

const boardGame = document.getElementById('boardGame')
// BoardGame columns.
const column1 = [0, 6, 12, 18, 24]
const column2 = [1, 7, 13, 19, 25]
const column3 = [2, 8, 14, 20, 26]
const column4 = [3, 9, 15, 21, 27]
const column5 = [4, 10, 16, 22, 28]
const column6 = [5, 11, 17, 23, 29]
const winningCombinations = [
    [0,1,2,3], [1,2,3,4], [2,3,4,5],
    [6,7,8,9], [7,8,9,10], [8,9,10,11],
    [12,13,14,15], [13,14,15,16], [14,15,16,17],
    [18,19,20,21], [19,20,21,22], [20,21,22,23],
    [24,25,26,27], [25,26,27,28], [26,27,28,29],
    [0,6,12,18], [6,12,18,24], [1,7,13,19], [7,13,19,25],
    [2,8,14,20], [8,14,20,26], [3,9,15,21], [9,15,21,27],
    [4,10,16,22], [10,16,22,28], [5,11,17,23], [11,17,23,29],
    [2,9,16,23], [1,8,15,22], [8,15,22,29], [0,7,14,21], [7,14,21,28],
    [6,13,20,27], [18,13,8,3], [24,19,14,9], [19,14,9,4], [25,20,15,10],
    [20,15,10,5], [26,21,16,11]
]
const player1 = {
    name: 'Player-1',
    tokenColor: 'red',
    isTurn: true,
    score: 0
}
const player2 = {
    name: 'Player-2',
    tokenColor: 'yellow',
    isTurn: false,
    score: 0
}

// Create the 30 Circle divs in div boardGame
for(let i = 0; i < 30; i++)
{
    const squareDiv = document.createElement('div')
    squareDiv.id = i
    squareDiv.classList.add('color', 'white')
    squareDiv.textContent = i 
    boardGame.appendChild(squareDiv)
}

// Drops token in the boardgame at the clicked column.
const dropToken = (player1, player2, i, placeToken, column) => {
    if(i === 5)
    {
        clearInterval(placeToken)
    }
    else if(i === 0 && document.getElementById(`${column[i]}`).classList.contains('white') && !document.getElementById(`${column[i]}`).classList.contains(player2.tokenColor))
    {
        document.getElementById(`${column[i]}`).classList.remove('white')
        document.getElementById(`${column[i]}`).classList.add(player1.tokenColor)
    }
    else if(document.getElementById(`${column[i]}`).classList.contains('white') && !document.getElementById(`${column[i]}`).classList.contains(player2.tokenColor))
    {
        document.getElementById(`${column[i - 1]}`).classList.remove(player1.tokenColor)
        document.getElementById(`${column[i - 1]}`).classList.add('white')

        document.getElementById(`${column[i]}`).classList.remove('white')
        document.getElementById(`${column[i]}`).classList.add(player1.tokenColor)
    }
}

// Place token function
// const placeToken = (counter) => {
//     const placeToken = setInterval( () => {
//         dropToken(player1, player2, i, placeToken)
//         i++
//     }, 400)
// }

//FIRST COLUMN EVENT LISTENER
document.getElementById('0').addEventListener('click', () => {
    let i = 0
    if(player1.isTurn)
    {
        // Will drop the token every 4 seconds until its reaches its optimal position.
        const placeToken = setInterval( () => {
            dropToken(player1, player2, i, placeToken, column1)
            i++
        }, 400)
        player1.isTurn = false
        player2.isTurn = true
    }
    else if(player2.isTurn) 
    {
        const placeToken = setInterval( () => {
            dropToken(player2, player1, i, placeToken, column1)
            i++ 
        }, 400)
        player2.isTurn = false
        player1.isTurn = true
    }
})

//SECOND COLUMN EVENT LISTENER
document.getElementById('1').addEventListener('click', () => {
    let i = 0
    if(player1.isTurn)
    {
        const placeToken = setInterval( () => {
            dropToken(player1, player2, i, placeToken, column2)
            i++
        }, 400)
        player1.isTurn = false
        player2.isTurn = true
    }
    else if(player2.isTurn) 
    {
        const placeToken = setInterval( () => {
            dropToken(player2, player1, i, placeToken, column2)
            i++ 
        },400)
        player2.isTurn = false
        player1.isTurn = true
    }
})

//THIRD COLUMN EVENT LISTENER
document.getElementById('2').addEventListener('click', () => {
    let i = 0
    if(player1.isTurn)
    {
        const placeToken = setInterval( () => {
            dropToken(player1, player2, i, placeToken, column3)
            i++
        }, 400)
        player1.isTurn = false
        player2.isTurn = true
    }
    else if(player2.isTurn) 
    {
        const placeToken = setInterval( () => {
            dropToken(player2, player1, i, placeToken, column3)
            i++
        }, 400)
        player2.isTurn = false
        player1.isTurn = true
    }
})

//FOURTH COLUMN EVENT LISTENER
document.getElementById('3').addEventListener('click', () => {
    let i = 0
    if(player1.isTurn)
    {
        const placeToken = setInterval( () => {
            dropToken(player1, player2, i, placeToken, column4)
            i++
        }, 400)
        player1.isTurn = false
        player2.isTurn = true
    }
    else if(player2.isTurn) 
    {
        const placeToken = setInterval( () => {
            dropToken(player2, player1, i, placeToken, column4)
            i++    
        }, 400)
        player2.isTurn = false
        player1.isTurn = true
    }
})

//FIFTH COLUMN EVENT LISTENER
document.getElementById('4').addEventListener('click', () => {
    let i = 0
    if(player1.isTurn)
    {
        const placeToken = setInterval( () => {
            dropToken(player1, player2, i, placeToken, column5)
            i++
        }, 400)
        player1.isTurn = false
        player2.isTurn = true
    }
    else if(player2.isTurn) 
    {
        const placeToken = setInterval( () => {
            dropToken(player2, player1, i, placeToken, column5)
            i++    
        }, 400)
        player2.isTurn = false
        player1.isTurn = true
    }
})

//SIX COLUMN EVENT LISTENER
document.getElementById('5').addEventListener('click', () => {
    let i = 0
    if(player1.isTurn)
    {
        const placeToken = setInterval( () => {
            dropToken(player1, player2, i, placeToken, column6)
            i++
        }, 400)
        player1.isTurn = false
        player2.isTurn = true
    }
    else if(player2.isTurn) 
    {
        const placeToken = setInterval( () => {
            dropToken(player2, player1, i, placeToken, column6)
            i++    
        }, 400)
        player2.isTurn = false
        player1.isTurn = true
    }
})