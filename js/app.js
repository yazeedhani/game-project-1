console.log('Linked.')

const boardGame = document.getElementById('boardGame')
const column1 = [0, 6, 12, 18, 24]

// create the 30 Circle divs in div boardGame
for(let i = 0; i < 30; i++)
{
    const squareDiv = document.createElement('div')
    squareDiv.id = i
    squareDiv.classList.add('color', 'white')
    squareDiv.textContent = i 
    boardGame.appendChild(squareDiv)
}

let player1 = true 
let player2 = false 

const square1 = document.getElementById('0')

square1.addEventListener('click', () => {
    let i = 0
    if(player1)
    {
        const placeToken = setInterval( () => {
            if(i === 5)
            {
                clearInterval(placeToken)
            }
            else if(i === 0 && document.getElementById(`${column1[i]}`).classList.contains('white') && !document.getElementById(`${column1[i]}`).classList.contains('yellow'))
            {
                document.getElementById(`${column1[i]}`).classList.remove('white')
                document.getElementById(`${column1[i]}`).classList.add('red')
                i++
            }
            else if(document.getElementById(`${column1[i]}`).classList.contains('white') && !document.getElementById(`${column1[i]}`).classList.contains('yellow'))
            {
                document.getElementById(`${column1[i - 1]}`).classList.remove('red')
                document.getElementById(`${column1[i - 1]}`).classList.add('white')

                document.getElementById(`${column1[i]}`).classList.remove('white')
                document.getElementById(`${column1[i]}`).classList.add('red')
                i++
            }
        },400)
        player1 = false
        player2 = true
    }
    else if(player2) 
    {
        const placeToken = setInterval( () => {
            if(i === 5)
            {
                clearInterval(placeToken)
            }
            else if(i === 0 && document.getElementById(`${column1[i]}`).classList.contains('white') && !document.getElementById(`${column1[i]}`).classList.contains('red'))
            {
                document.getElementById(`${column1[i]}`).classList.remove('white')
                document.getElementById(`${column1[i]}`).classList.add('yellow')
                i++
            }
            else if(document.getElementById(`${column1[i]}`).classList.contains('white') && !document.getElementById(`${column1[i]}`).classList.contains('red'))
            {
                document.getElementById(`${column1[i - 1]}`).classList.remove('yellow')
                document.getElementById(`${column1[i - 1]}`).classList.add('white')

                document.getElementById(`${column1[i]}`).classList.remove('white')
                document.getElementById(`${column1[i]}`).classList.add('yellow')
                i++
            }

        },400)
        player2 = false
        player1 = true
    }
})