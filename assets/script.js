const gameboard = (()=> {

    const rows = 3;
    const columns = 3;

    let board = [];
    let isBoardReady = true;


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

    const getBoardStatus = ()=> {
        return isBoardReady;
    }

    const changeBoartStatus = (status)=> {
        isBoardReady = status;
    }

    const getBoard = ()=> board;

    return {getBoard, restartBoard, printBoard, getBoardStatus, changeBoartStatus};
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

    const resetMoveCounter = ()=>{
        moveCounter = 0;
    }

    const getMoveCounter = ()=> {
        return moveCounter;
    }

    const setDeafultActivePLayer = ()=>{
        activePlayer = player1;
    }

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
        gameboard.changeBoartStatus(false);

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

    return {makeMove, checkWinner, getActivePlayer, resetMoveCounter, setDeafultActivePLayer, getMoveCounter}

})();

const displayController = (()=>{

    const player1Name = document.querySelector('.players .player1 h1');
    const player1Token = document.querySelector('.players .player1 h2');
    const player2Name = document.querySelector('.players .player2 h1');
    const player2Token = document.querySelector('.players .player2 h2');

    let buttonRestart = document.querySelector('.buttons .restart');
    let changeNamesButton = document.querySelector('.buttons .names');
    let changeNamesModal = document.querySelector('#change-names');
    let myForm =document.querySelector('form');
    let cancelButton = document.querySelector(".form-buttons input[formmethod='dialog']");
    let submitButton = document.querySelector(".form-buttons input[value='Change']");
    let player1Container = document.querySelector('.player1');
    let player2Container = document.querySelector('.player2');
    let gameSquares = document.querySelectorAll('.square');
    gameSquares = Array.from(gameSquares);

    player1Name.textContent =`${player1.getName()}`;
    player1Token.textContent = `${player1.getToken()}`;
    player2Name.textContent =`${player2.getName()}`;
    player2Token.textContent = `${player2.getToken()}`;
    
    const makeMoveOnTheBoard = function (item){

        if(gameboard.getBoardStatus() != true) {
            displayController.clearBoardDisplay()
            gameboard.changeBoartStatus(true);
        } 
        
        if(item.target.textContent == '') {
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

        markActivePLayer()

        if(gameController.getMoveCounter()>0) {
            changeNamesButton.setAttribute('style', 'display: none;')
        } else{
            changeNamesButton.setAttribute('style', 'display: inline-block;')
        }
    }

    const clearBoardDisplay = function() {
        gameSquares.forEach((square)=>{
            square.textContent='';
        })
    }

    const changeNames = (firstPlayerName, secondPlayerName)=> {
        player1Name.textContent =`${firstPlayerName}`;
        player2Name.textContent =`${secondPlayerName}`;
    }

    const markActivePLayer = ()=>{
        if(gameController.getActivePlayer().getToken() == 'X') {
            player1Container.setAttribute('style', 'border-bottom: 1px solid;')
            player2Container.setAttribute('style', 'border-bottom: none;')
        }else {
            player2Container.setAttribute('style', 'border-bottom: 1px solid;')
            player1Container.setAttribute('style', 'border-bottom: none;')
        }
    }
    markActivePLayer()

    buttonRestart.addEventListener('click', ()=> {
        if(gameboard.getBoardStatus()) {
            gameController.setDeafultActivePLayer()
        }
        
        clearBoardDisplay();
        gameboard.restartBoard();
        gameController.resetMoveCounter();
        changeNamesButton.setAttribute('style', 'display: inline-block;')
    })

    changeNamesButton.addEventListener('click', ()=> {
        changeNamesModal.showModal();
    })

    cancelButton.addEventListener('click', (event)=> {
        changeNamesModal.close();
        myForm.reset();
        event.preventDefault()
    })

    myForm.addEventListener('submit', (event)=>{

        const firstPlayerName = document.querySelector("input[name='playerone']");
        const secondPlayerName = document.querySelector("input[name='playertwo']");

        changeNames(firstPlayerName.value, secondPlayerName.value);

        event.preventDefault();
        changeNamesModal.close();
        myForm.reset();
    })

    gameSquares.forEach((square)=>{
        square.addEventListener('click', makeMoveOnTheBoard)
    })

    return {makeMoveOnTheBoard, clearBoardDisplay}
})()


