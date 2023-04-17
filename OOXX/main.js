var board = ["", "", "", "", "", "", "", "", ""]; // 初始化遊戲棋盤
var player = "X"; // 當前玩家
var resultDiv = document.getElementById("result"); // 顯示遊戲結果的div

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

// 當玩家點擊棋盤時，執行該函數
function cellClicked(id) {
  if (board[id] == "") { // 如果該位置沒有棋子
    board[id] = player; // 在該位置上下
    // 切換玩家
    if (player == "X") {
      player = "O";
    }
    else {
      player = "X";
    }
    drawBoard(); // 重新畫出遊戲棋盤
    // 檢查遊戲是否結束
    if (checkWin("X")) {
      resultDiv.innerHTML = "X獲勝！";
    }
    else if (checkWin("O")) {
      resultDiv.innerHTML = "O獲勝！";
    }
    else if (!board.includes("")) {
      resultDiv.innerHTML = "平局！";
    }
  }
}

// 初始化遊戲
drawBoard();
