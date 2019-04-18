/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var newBoard = new Board ({n:n});

  var placeRooks = function(board, row, rooks){
    if (rooks === n) {
      return board;
    } else {
      for (let i = 0; i < n; i++){
        board.togglePiece(row, i);
        if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()){
          return placeRooks(board, row + 1, rooks + 1);
        }
        board.togglePiece(row, i);  
      }
    }
  };

  var solution = placeRooks(newBoard, 0, 0).rows();
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0;
//   var newBoard = new Board ({n:n});
//   // debugger;
//   var treeCombo = function (board, i, rooks){
//     // if the board is value and rooks = n, then count ++
//     //else if the board is valid, but rooks < n, recurse
//     //else the board is invalid, don't do anything further
//     if (rooks === n){
//       solutionCount++;
//     } else if (rooks < n){
//       for (i; i < Math.pow(n, 2); i++){
//         let r = Math.floor(i/n);
//         let c = i - n * r;
//         board.togglePiece(r, c);
//         if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()){
//           treeCombo(board, i + 1, rooks + 1);
//         }
//         board.togglePiece(r, c);
//       }
//     }
//   };

//   treeCombo(newBoard, 0, 0);

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var newBoard = new Board ({n:n});
  var placeRooks = function (board, row, rooks){
    if (rooks === n){
      solutionCount++;
    } else {
      for (let col = 0; col < n; col++){
        board.togglePiece(row, col);
        if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()){
          placeRooks(board, row + 1, rooks + 1);
        } 
        board.togglePiece(row, col);
      }
    }
  };

  placeRooks(newBoard, 0, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board ({n:n});
  var solution;
  // debugger;
  var placeQueens = function(board, row, queens){
    if (queens === n) {
      solution = board;
      return true;
    } else {
      for (let i = 0; i < n; i++){
        board.togglePiece(row, i);
        if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts()){
          if(placeQueens(board, row + 1, queens + 1)){
            return true;
          }

        }
        board.togglePiece(row, i);  
      }
    }
  };

  if (n == 0){
    solution = [];
  } else {
    placeQueens(newBoard, 0, 0);
    solution = solution ? solution.rows() : newBoard.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
