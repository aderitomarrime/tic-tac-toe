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

const player1 = makePlayer("Player 1", 1);
const player2 = makePlayer("Player 2", 2);


const gameController = (()=>{

    gameboard.restartBoard();

    let moveCounter = 0;

    let activePlayer = player1;

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

    const checkWinner = (activePlayer)=>{
        if((gameboard.getBoard()[0][0] == activePlayer.getToken()) && (gameboard.getBoard()[0][1] == activePlayer.getToken()) && (gameboard.getBoard()[0][2] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }else if((gameboard.getBoard()[1][0] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[1][2] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }else if((gameboard.getBoard()[2][0] == activePlayer.getToken()) && (gameboard.getBoard()[2][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][2] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }
        else if((gameboard.getBoard()[0][0] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][2] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }
        else if((gameboard.getBoard()[0][2] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][0] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }
        else if((gameboard.getBoard()[0][0] == activePlayer.getToken()) && (gameboard.getBoard()[1][0] == activePlayer.getToken()) && (gameboard.getBoard()[2][0] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }else if((gameboard.getBoard()[0][1] == activePlayer.getToken()) && (gameboard.getBoard()[1][1] == activePlayer.getToken()) && (gameboard.getBoard()[2][1] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }
        else if((gameboard.getBoard()[0][2] == activePlayer.getToken()) && (gameboard.getBoard()[1][2] == activePlayer.getToken()) && (gameboard.getBoard()[2][2] == activePlayer.getToken())){
            console.log(`The winner is ${activePlayer.getName()}`);
            gameboard.restartBoard()
        }
    }

    return {makeMove, checkWinner, getActivePlayer}

})();


gameController.makeMove(0,0,gameController.getActivePlayer());
gameController.makeMove(2,2,gameController.getActivePlayer());
gameController.makeMove(1,0,gameController.getActivePlayer());
gameController.makeMove(1,2,gameController.getActivePlayer());
gameController.makeMove(2,0,gameController.getActivePlayer());


