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

const players = (()=>{
    const player1 = {
        name: undefined,
        token: 1,
        setName: function(name) {
            this.name = name;
        },
        getName: function() {
            return this.name;
        },
        getToken: function(){
            return this.token;
        }
    }

    const player2 = {
        name : undefined,
        token: 2,
        setName: function(name) {
            this.name = name;
        },
        getName: function() {
            return this.name;
        },
        getToken: function(){
            return this.token;
        }
    }

    return {player1, player2};
})();

const gameController = (()=>{

    gameboard.restartBoard();

    const player1Name = "Aderito";
    const player2Name = "Benson";

    let moveCounter = 0;

    players.player1.setName(player1Name);
    players.player2.setName(player2Name);

    let activePlayer = players.player1;

    const changeActivePlayer = (player)=>{
        if(player == players.player1) {
            activePlayer = players.player2;
        }else {
            activePlayer = players.player1;
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


