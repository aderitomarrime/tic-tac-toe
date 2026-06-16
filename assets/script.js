const gameboard = (()=> {

    const rows = 3;
    const columns = 3;

    let board = [];


    const restartBoard = ()=> {
        for(let i = 0; i < rows; i++){
            board[i] = []
            for(let j = 0; j < columns; j++){
                board[i].push(0);
            }
        }
    }

    const printBoard = ()=> {
        console.table(board);
    }

    const getBoard = ()=> board;

    return {getBoard, restartBoard, printBoard};
})()

function makePlayer(nameInput, tokenInput){
    
    let name = nameInput
    let token = tokenInput

    const setName = (playerName)=> {
        name = playerName;
    }

    const setToken = (playerToken)=> {
        name = playerToken;
    }

    const getName = ()=> {
        return name;
    }

    const getToken = ()=> {
        return token;
    }

    return {setName, getName, setToken, getToken}
}

const player1 = makePlayer("Player 1", "X");
const player2 = makePlayer("Player 2", "O");

const gameController = (()=>{


    gameboard.restartBoard();

    let moveCounter = 0;
    let activePlayer = player1;
    let winner;

    const changeActivePlayer = (player)=>{
        if(player == player1) {
            activePlayer = player2;
        }else {
            activePlayer = player1;
        }
    }

    const getActivePlayer = ()=> {
        return activePlayer;
    }

    const makeMove = (row, column, player)=>{
        gameboard.getBoard()[row][column] = player.getToken();
        moveCounter++;
        changeActivePlayer(player);
        gameboard.printBoard()
        checkWinner(player);
    }

    const announceWinner = (winner)=>{

        moveCounter = 0;
        const announceWinnerModal = document.querySelector('#announce-winner');
        const winnerToken = document.querySelector('#announce-winner h1');
        const winnerParagraph = document.querySelector('#announce-winner p');

        const seeBoardButton = document.querySelector('.modalButtons button:first-child')
        const restartButton = document.querySelector('.modalButtons button:last-child')

        if(winner == undefined) {
            winnerToken.textContent = `It's a tie!`;
            winnerParagraph.textContent = `Play again to see who wins.`
        }else{

            winnerToken.textContent = `${winner.getToken()}`;
            winnerParagraph.textContent = `${winner.getName()} is the winner!`

        }

        seeBoardButton.addEventListener('click', ()=> {
            announceWinnerModal.close();
        })

        restartButton.addEventListener('click', ()=> {
            displayController.clearBoardDisplay();
            announceWinnerModal.close();
        })

        announceWinnerModal.showModal();
        gameboard.restartBoard()

    }

    const checkWinner = (activePlayer)=>{
        if((gameboard.getBoard()[0][0] == activePlayer.getToken()) && (gameboard.getBoard()[0][1] == activePlayer.getToken()) && (gameboard.getBoard()[0][2] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }else if((gameboard.getBoard()[1][0] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[1][2] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }else if((gameboard.getBoard()[2][0] == activePlayer.getToken()) && (gameboard.getBoard()[2][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][2] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }
        else if((gameboard.getBoard()[0][0] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][2] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }
        else if((gameboard.getBoard()[0][2] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][0] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }
        else if((gameboard.getBoard()[0][0] == activePlayer.getToken()) && (gameboard.getBoard()[1][0] == activePlayer.getToken()) && (gameboard.getBoard()[2][0] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }else if((gameboard.getBoard()[0][1] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][1] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }
        else if((gameboard.getBoard()[0][2] == activePlayer.getToken()) && (gameboard.getBoard()[1][2] == activePlayer.getToken()) && (gameboard.getBoard()[2][2] == activePlayer.getToken())){
            announceWinner(activePlayer);
        }

        if(moveCounter == 9) {
            if(winner == undefined) {
                announceWinner();
            }
        }
    }

    return {makeMove, checkWinner, getActivePlayer}

})();

const displayController = (()=>{
    
    const makeMoveOnTheBoard = function (item){
        
        switch(Number(item.target.id)) {
            case 0:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(0,0,gameController.getActivePlayer());
            break;
            case 1:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(0,1,gameController.getActivePlayer());
            break;
            case 2:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(0,2,gameController.getActivePlayer());
            break;
            case 3:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(1,0,gameController.getActivePlayer());
            break;
            case 4:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(1,1,gameController.getActivePlayer());
            break;
            case 5:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(1,2,gameController.getActivePlayer());
            break;
            case 6:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(2,0,gameController.getActivePlayer());
            break;
            case 7:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(2,1,gameController.getActivePlayer());
            break;
            case 8:
                item.target.textContent = `${gameController.getActivePlayer().getToken()}`;
                gameController.makeMove(2,2,gameController.getActivePlayer());
            break;
            default:
                console.log("This value is invalid");
            break;
        }
    }

    const clearBoardDisplay = function() {
        gameSquares.forEach((square)=>{
            square.textContent='';
        })
    }

    let gameSquares = document.querySelectorAll('.square');
    gameSquares = Array.from(gameSquares);

    gameSquares.forEach((square)=>{
        square.addEventListener('click', makeMoveOnTheBoard)
    })

    return {makeMoveOnTheBoard, clearBoardDisplay}
})()


