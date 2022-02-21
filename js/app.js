console.log('Linked.')

const resetButton = document.getElementById('resetGame')
const newGameButton = document.getElementById('newGame')
const message = document.getElementById('message')
const boardGame = document.getElementById('boardGame')
// Board game columns.
const column1 = [0, 6, 12, 18, 24]
const column2 = [1, 7, 13, 19, 25]
const column3 = [2, 8, 14, 20, 26]
const column4 = [3, 9, 15, 21, 27]
const column5 = [4, 10, 16, 22, 28]
const column6 = [5, 11, 17, 23, 29]
const winningCombinations = [
    [0,1,2,3], [1,2,3,4], [2,3,4,5], [6,7,8,9], [7,8,9,10], [8,9,10,11],
    [12,13,14,15], [13,14,15,16], [14,15,16,17], [18,19,20,21], [19,20,21,22], 
    [20,21,22,23], [24,25,26,27], [25,26,27,28], [26,27,28,29], [0,6,12,18], 
    [6,12,18,24], [1,7,13,19], [7,13,19,25], [2,8,14,20], [8,14,20,26], 
    [3,9,15,21], [9,15,21,27], [4,10,16,22], [10,16,22,28], [5,11,17,23], [11,17,23,29],
    [2,9,16,23], [1,8,15,22], [8,15,22,29], [0,7,14,21], [7,14,21,28], [6,13,20,27], 
    [18,13,8,3], [24,19,14,9], [19,14,9,4], [25,20,15,10], [20,15,10,5], [26,21,16,11]
]

// Class to build player objects
class Player {
    constructor(name, tokenColor, isTurn)
    {
        this.name = name,
        this.tokenColor = tokenColor,
        this.isTurn = isTurn,
        this.score = 0
    }
}

const player1 = new Player('Player-1', 'red', true)
const player2 = new Player('Player-2', 'yellow', false)

// Create the 30 Circle divs in div boardGame
for(let i = 0; i < 30; i++)
{
    const squareDiv = document.createElement('div')
    squareDiv.id = i
    squareDiv.classList.add('color', 'white')
    squareDiv.textContent = i 
    boardGame.appendChild(squareDiv)
}

/******************* FUNCTIONS ********************/

/*
   Removes the event listeners on the first row (circle) of each column
   return - no value returned
*/
const removeListeners = () => {
    document.getElementById(`0`).removeEventListener('click', column1EventHandler)
    document.getElementById(`1`).removeEventListener('click', column2EventHandler)
    document.getElementById(`2`).removeEventListener('click', column3EventHandler)
    document.getElementById(`3`).removeEventListener('click', column4EventHandler)
    document.getElementById(`4`).removeEventListener('click', column5EventHandler)
    document.getElementById(`5`).removeEventListener('click', column6EventHandler)
}

/*
   Checks to see if there is a winner using by looping through the
   winnningCominations array. If there is a winner, remove the event listeners
   on the first circle in each column.
   parameter1 - winningCombinations: array containing all the winning combos
   parameter2 - player: an object that represents the player
   return - return true is there is a winner
*/
const checkWinner = (winningCombinations, player) => {
    for(let i = 0; i < winningCombinations.length; i++)
    {
        if(document.getElementById(`${winningCombinations[i][0]}`).classList.contains(`${player.tokenColor}`) 
        && document.getElementById(`${winningCombinations[i][1]}`).classList.contains(`${player.tokenColor}`) 
        && document.getElementById(`${winningCombinations[i][2]}`).classList.contains(`${player.tokenColor}`) 
        && document.getElementById(`${winningCombinations[i][3]}`).classList.contains(`${player.tokenColor}`))
        {
            console.log(document.getElementById(`${winningCombinations[i][0]}`))
            console.log(document.getElementById(`${winningCombinations[i][1]}`))
            console.log(document.getElementById(`${winningCombinations[i][2]}`))
            console.log(document.getElementById(`${winningCombinations[i][3]}`))
            removeListeners()
            return true
        }
    }
}

/*
   Drops token in the boardgame at the clicked column to place it in the correct row.
   Will check if each row in column is empty or has a token.
   If column is full, then stop function, else place token
   parameter1 - player1: player object that is executing this function when placing their token
   parameter2 - player2: player object to keep track of the other player's tokens in the column
   parameter3 - i: a counter to loop through the column
   parameter4 - placeToken: a setInveral function ID to stop the setInterval function when column is full
   return - no value returned
*/
const dropToken = (player1, player2, i, placeToken, column) => {
    //if i is 5, then this means the column is full with tokens and stop executing this function
    if(i === 5)
    {
        clearInterval(placeToken)
    }
    //checks the first circle(row) in the current column
    //set the circle's color to red or yellow
    else if(i === 0 && document.getElementById(`${column[i]}`).classList.contains('white') && !document.getElementById(`${column[i]}`).classList.contains(player2.tokenColor))
    {
        document.getElementById(`${column[i]}`).classList.remove('white')
        document.getElementById(`${column[i]}`).classList.add(player1.tokenColor)
    }
    //checks the the rest of the circles (rows) in the current column
    // resets the previous circle to white and sets the current circle to red or yellow
    else if(document.getElementById(`${column[i]}`).classList.contains('white') && !document.getElementById(`${column[i]}`).classList.contains(player2.tokenColor))
    {
        //set previous circle color back to white
        document.getElementById(`${column[i - 1]}`).classList.remove(player1.tokenColor)
        document.getElementById(`${column[i - 1]}`).classList.add('white')
        //set current circle color to red or yellow
        document.getElementById(`${column[i]}`).classList.remove('white')
        document.getElementById(`${column[i]}`).classList.add(player1.tokenColor)
    }
}

/*
   This function is executed by the player to place the token at the clicked column.
   setInterval() is used to check for a winner and drop the token at the right circle
   in the column by traversing through each circle first. Will also switch player turns
   after move is made.
   parameter1 - column: array of indixes for each column in the grid.
   return - no value returned
*/
const play = (column) => {
    let i = 0

    if(player1.isTurn)
    {
        // Will drop the token into new position every 4 seconds until its reaches its optimal position.
        const placeToken = setInterval( () => {
            if(checkWinner(winningCombinations, player1))
            {
                alert('Player 1 is the winner')
                message.textContent = 'Player 1 wins!'
                clearInterval(placeToken)
            }
            dropToken(player1, player2, i, placeToken, column)
            i++
        }, 400)
        player1.isTurn = false
        player2.isTurn = true
        message.textContent = "Player-2's turn"
    }
    else if(player2.isTurn) 
    {
        const placeToken = setInterval( () => {
            if(checkWinner(winningCombinations, player2))
            {
                alert('Player 2 is the winner')
                message.textContent = 'Player 2 wins!'
                clearInterval(placeToken)
            }
            dropToken(player2, player1, i, placeToken, column)
            i++ 
        }, 400)
        player2.isTurn = false
        player1.isTurn = true
        message.textContent = "Player-1's turn"
    }
}

// A play() function for each event listener for each column
const column1EventHandler = () => {play(column1)}
const column2EventHandler = () => {play(column2)}
const column3EventHandler = () => {play(column3)}
const column4EventHandler = () => {play(column4)}
const column5EventHandler = () => {play(column5)}
const column6EventHandler = () => {play(column6)}


/******************* EVENT LISTENERS ********************/
//FIRST COLUMN EVENT LISTENER
document.getElementById('0').addEventListener('click', column1EventHandler)

//SECOND COLUMN EVENT LISTENER
document.getElementById('1').addEventListener('click', column2EventHandler)

//THIRD COLUMN EVENT LISTENER
document.getElementById('2').addEventListener('click', column3EventHandler)

//FOURTH COLUMN EVENT LISTENER
document.getElementById('3').addEventListener('click', column4EventHandler)

//FIFTH COLUMN EVENT LISTENER
document.getElementById('4').addEventListener('click', column5EventHandler)

//SIXTH COLUMN EVENT LISTENER
document.getElementById('5').addEventListener('click', column6EventHandler)