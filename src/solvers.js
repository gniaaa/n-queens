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



/* 

total O(n ** 3) time complexity by reducing conflict checks to O(n);

*/

// window.findNRooksSolution = function(n) {
//   var newBoard = new Board ({n:n});

//   var placeRooks = function(board, row, rooks){
//     if (rooks === n) {
//       return board;
//     } else {
//       for (let i = 0; i < n; i++){
//         board.togglePiece(row, i);
//         if (!board.hasColConflictAt(i) && !board.hasRowConflictAt(row)){
//           return placeRooks(board, row + 1, rooks + 1);
//         }
//         board.togglePiece(row, i);  
//       }
//     }
//   };

//   var solution = placeRooks(newBoard, 0, 0).rows();

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };

/* 

total O(n ** 2) time complexity by reducing conflict checks to O(1);

*/

window.findNRooksSolution = function (n) {
  var newBoard = new Board({ n: n });
  var rowObj = {};
  var colObj = {};
  var solution;

  var placeRooks = function (board, row, rooks) {
    if (rooks === n) {
      solution = board;
      return true;
    } else {
      //debugger;
      for (let col = 0; col < n; col++) {
        if (!(rowObj.hasOwnProperty(row)) && !(colObj.hasOwnProperty(col))) {
          board.togglePiece(row, col);
          rowObj[row] = row;
          colObj[col] = col;

          if (placeRooks(board, row + 1, rooks + 1)) {
            return true;
          }

          board.togglePiece(row, col);
          delete rowObj[row];
          delete colObj[col];
        }
      }
    }
  };
  placeRooks(newBoard, 0, 0);
  solution = solution.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

/* 

general solution by trying out all possibilities in recursion tree

*/

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

/* 

total O(n ** 3) time complexity by reducing conflict checks to O(n);

*/

// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0;
//   var newBoard = new Board ({n:n});
//   var placeRooks = function (board, row, rooks){
//     if (rooks === n){
//       solutionCount++;
//     } else {
//       for (let col = 0; col < n; col++){
//         board.togglePiece(row, col);
//         if (!board.hasColConflictAt(col) && !board.hasRowConflictAt(row)){
//           placeRooks(board, row + 1, rooks + 1);
//         } 
//         board.togglePiece(row, col);
//       }
//     }
//   };

//   placeRooks(newBoard, 0, 0);

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

/* 

total O(n ** 2) time complexity by reducing conflict checks to O(1);

*/

window.countNRooksSolutions = function (n) {
  var solutionCount = 0;
  var rowObj = {};
  var colObj = {};
  var newBoard = new Board({ n: n });
  var placeRooks = function (board, row, rooks) {
    if (rooks === n) {
      solutionCount++;
    } else {
      for (let col = 0; col < n; col++) {
        if (!rowObj.hasOwnProperty(row) && !colObj.hasOwnProperty(col)) {
          board.togglePiece(row, col);
          rowObj[row] = row;
          colObj[col] = col;
          placeRooks(board, row + 1, rooks + 1);
          board.togglePiece(row, col);
          delete rowObj[row];
          delete colObj[col];
        }
        // board.togglePiece(row, col);
        // if (!board.hasColConflictAt(col) && !board.hasRowConflictAt(row)){
        //   placeRooks(board, row + 1, rooks + 1);
        // } 
        // board.togglePiece(row, col);
      }
    }
  };

  placeRooks(newBoard, 0, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

/* 

total O(n ** 3) time complexity by reducing conflict checks to O(n);

*/

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function (n) {
//   var newBoard = new Board({ n: n });
//   var solution;
//   // debugger;
//   var placeQueens = function (board, row, queens) {
//     if (queens === n) {
//       solution = board;
//       return true;
//     } else {
//       for (let col = 0; col < n; col++) {
//         board.togglePiece(row, col);
//         if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col) && !board.hasMinorDiagonalConflictAt(col + row) && !board.hasMajorDiagonalConflictAt(col - row)) {
//           if (placeQueens(board, row + 1, queens + 1)) {
//             return true;
//           }

//         }
//         board.togglePiece(row, col);
//       }
//     }
//   };

//   if (n === 0) {
//     solution = [];
//   } else {
//     placeQueens(newBoard, 0, 0);
//     solution = solution ? solution.rows() : newBoard.rows();
//   }
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };

/* 

total O(n ** 2) time complexity by reducing conflict checks to O(1);

*/

window.findNQueensSolution = function (n) {
  var newBoard = new Board({ n: n });
  var rowObj = {};
  var colObj = {};
  var majObj = {};
  var minObj = {};
  var solution;

  var placeQueens = function (board, row, queens) {
    if (queens === n) {
      solution = board;
      return true;
    } else {
      for (let col = 0; col < n; col++) {
        if (!(rowObj.hasOwnProperty(row)) && !(colObj.hasOwnProperty(col)) && !(majObj.hasOwnProperty(col - row)) && !(minObj.hasOwnProperty(col + row))) {
          board.togglePiece(row, col);
          rowObj[row] = row;
          colObj[col] = col;
          majObj[col - row] = col - row;
          minObj[col + row] = col + row;

          if (placeQueens(board, row + 1, queens + 1)) {
            return true;
          }

          board.togglePiece(row, col);
          delete rowObj[row];
          delete colObj[col];
          delete majObj[col - row];
          delete minObj[col + row];
        }
      }
    }
  };

  if (n === 0) {
    solution = [];
  } else {
    placeQueens(newBoard, 0, 0);
    solution = solution ? solution.rows() : newBoard.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

/* using objects as dictionary*/

window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  var newBoard = new Board({ n: n });
  var rowObj = {};
  var colObj = {};
  var majObj = {};
  var minObj = {};

  var placeQueens = function (board, row, queens) {
    if (queens === n) {
      solutionCount++;
    } else {
      for (let col = 0; col < n; col++) {
        if (!(rowObj.hasOwnProperty(row)) && !(colObj.hasOwnProperty(col)) && !(majObj.hasOwnProperty(col - row)) && !(minObj.hasOwnProperty(col + row))) {
          board.togglePiece(row, col);
          rowObj[row] = row;
          colObj[col] = col;
          majObj[col - row] = col - row;
          minObj[col + row] = col + row;

          placeQueens(board, row + 1, queens + 1);
          board.togglePiece(row, col);
          delete rowObj[row];
          delete colObj[col];
          delete majObj[col - row];
          delete minObj[col + row];
        }
      }
    }
  };

  placeQueens(newBoard, 0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};




/* 

total O(n ** 3) time complexity by reducing conflict checks to O(n);

*/

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function (n) {
//   var solutionCount = 0;
//   var newBoard = new Board({ n: n });

//   var placeQueens = function (board, row, queens) {
//     if (queens === n) {
//       solutionCount++;
//     } else {
//       for (let col = 0; col < n; col++) {
//         board.togglePiece(row, col);
//         if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col) && !board.hasMinorDiagonalConflictAt(col + row) && !board.hasMajorDiagonalConflictAt(col - row)) {
//           placeQueens(board, row + 1, queens + 1);
//         }
//         board.togglePiece(row, col);
//       }
//     }
//   };

//   placeQueens(newBoard, 0, 0);

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };


/*
Time complexity:
findNRooksSolution: O(n**2)
countNRooksSolutions: O(n**2)
findNQueensSolution: O(n**3)
countNQueensSolutions: O(n**3)
*/