const gameboard = (()=> {

    const rows = 3;
    const columns = 3;

    let board = [];

    for(let i = 0; i < rows; i++){
        board[i] = []
        for(let j = 0; j < columns; j++){
            board[i].push(0);
        }
    }

    getBoard = ()=> board;

    return {board, getBoard};
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
    player1Name = "Aderito";
    player2Name = "Benson";

    players.player1.setName(player1Name);
    players.player2.setName(player2Name);
})();
