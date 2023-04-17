var board = ["", "", "", "", "", "", "", "", ""]; // 初始化遊戲棋盤
var player = "X"; // 當前玩家
var resultDiv = document.getElementById("result"); // 顯示遊戲結果的div
var restartBtn = document.getElementById("restart-btn");

// 畫出遊戲棋盤
function drawBoard() {
  var boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  for (var i = 0; i < board.length; i++) {
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i;
    cell.addEventListener("click", function() {
      cellClicked(this.id);
    });
    cell.innerHTML = board[i];
    boardDiv.appendChild(cell);
  }

  restartBtn.addEventListener("click", function() {
    restart();
  });
}

// 重新開始遊戲
function restart() {
  board = ["", "", "", "", "", "", "", "", ""];
  player = "X";
  resultDiv.innerHTML = "";
  drawBoard();
}

// 檢查是否有玩家獲勝
function checkWin(player) {
  if (board[0] == player && board[1] == player && board[2] == player) {
    return true;
  }
  else if (board[3] == player && board[4] == player && board[5] == player) {
    return true;
  }
  else if (board[6] == player && board[7] == player && board[8] == player) {
    return true;
  }
  else if (board[0] == player && board[3] == player && board[6] == player) {
    return true;
  }
  else if (board[1] == player && board[4] == player && board[7] == player) {
    return true;
  }
  else if (board[2] == player && board[5] == player && board[8] == player) {
    return true;
  }
  else if (board[0] == player && board[4] == player && board[8] == player) {
    return true;
  }
  else if (board[2] == player && board[4] == player && board[6] == player) {
    return true;
  }
  else {
    return false;
  }
}

function cellClicked(id) {
  if (board[id] == "") { 
    board[id] = player; 
    if (player == "X") {
      player = "O";
    }
    else {
      player = "X";
    }
    drawBoard(); 
    if (checkWin("X")) {
      resultDiv.innerHTML = "X獲勝！";
      restartBtn.style.display = "block";
    }
    else if (checkWin("O")) {
      resultDiv.innerHTML = "O獲勝！";
      restartBtn.style.display = "block";
    }
    else if (!board.includes("")) {
      resultDiv.innerHTML = "平局！";
      restartBtn.style.display = "block";
    }    
  }
}
drawBoard();
