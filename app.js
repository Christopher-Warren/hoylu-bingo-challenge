// prettier-ignore
const card = [
  8, 29, 35, 54, 65,
  13, 24, 44, 48, 67,
  9, 21, 'FREE', 59, 63,
  7, 19, 34, 53, 61,
  1, 20, 33, 46, 72
]

const descDiagonalWin = [8, 24, 53, 72]
const ascDiagonalWin = [1, 19, 48, 65]

const rowWin = [7, 19, 34, 53, 61]
const colWin = [29, 24, 21, 19, 20]

function checkForBingo(bingoCard, drawnNumbers, gridSize = 5) {
  // Initialize base variables
  const bingo = { row: {}, col: {}, descDiagonalCount: 0, ascDiagonalCount: 0 }
  let hasWon = false

  for (let i = 0, len = bingoCard.length; i < len; i++) {
    // Coordinates of currently drawn number
    let row = Math.floor(i / gridSize)
    let col = i % gridSize

    // Initialize variables for rows/cols
    if (!bingo.row[row]) bingo.row[row] = 0
    if (!bingo.col[col]) bingo.col[col] = 0

    // Handle case where a drawn number matches a number on bingoCard
    if (drawnNumbers.includes(bingoCard[i]) || bingoCard[i] === 'FREE') {
      // Add to sum of each matching row/col
      bingo.row[row]++
      bingo.col[col]++

      // Add to sum of each matching diagonal line
      if (row === col) bingo.descDiagonalCount++
      if (gridSize - 1 - row === col) bingo.ascDiagonalCount++

      // Check for win based on all rows/cols and BOTH diagonal values
      if (bingo.ascDiagonalCount === gridSize) hasWon = true
      if (bingo.descDiagonalCount === gridSize) hasWon = true
      if (bingo.row[row] === gridSize) hasWon = true
      if (bingo.col[col] === gridSize) hasWon = true

      // A game of bingo ends when there is a win
      if (hasWon) break
    }
  }
  return hasWon
}

// Row and col win test
console.log(checkForBingo(card, rowWin))
console.log(checkForBingo(card, colWin))

// Descending diagonal win test
console.log(checkForBingo(card, descDiagonalWin))

// Ascending diagonal win test
console.log(checkForBingo(card, ascDiagonalWin))

// Loss test
console.log(checkForBingo(card, [0]))
console.log(checkForBingo(card, [12, 31, 54, 34, 34, 38, 36, 47]))

// Random numbers test after drawing 50 random numbers 1-72
const arr = Array.from({ length: 50 }, () => Math.ceil(Math.random() * 72))
console.log('Random draw: ', checkForBingo(card, arr))
