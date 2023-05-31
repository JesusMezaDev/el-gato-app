import { ref } from 'vue';
import { defineStore } from 'pinia';

import confetti from 'canvas-confetti';

import { useDialogStore } from './dialogStore';

export const useBoardStore = defineStore('board', () => {
  const dialog = useDialogStore();
  const TURNS = {
    X: 'X',
    O: 'O',
  }

  const board = ref<(string | null)[][]>([[null, null, null], [null, null, null], [null, null, null]]);
  const turn = ref(TURNS.X);
  let count = 0;

  const resetGame = () => {
    board.value = [[null, null, null], [null, null, null], [null, null, null]];
    turn.value = TURNS.X;
    count = 0;
  }

  const checkWinner = () => {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ]

    for (let row = 0; row < lines.length; row++) {
      const [a, b, c] = lines[row];
      if (board.value[a[0]][a[1]] && board.value[a[0]][a[1]] === board.value[b[0]][b[1]] && board.value[a[0]][a[1]] === board.value[c[0]][c[1]]) {
        confetti({ particleCount: 300, spread: 120 });
        dialog.setDialog({ dialogType: 'alert', message: `¡Felicidades! El jugador "${board.value[a[0]][a[1]]}" ganó.`,
          onCloseDialog: () => {
            resetGame();
          }
        });
        dialog.show();
      } 
    }
  }

  const checkTie = () => {
    if (count === 9) {
      dialog.setDialog({ dialogType: 'alert', message: '¡Empate!', onCloseDialog: () => { resetGame(); } });
      dialog.show();
    }
  }

  const updateBoard = (row: number, col: number) => {
    if (board.value[row][col]) return;
    count++;
    board.value[row][col] = turn.value;
    turn.value = turn.value === TURNS.X ? TURNS.O : TURNS.X;
    if (count > 3) {
      checkWinner();
      checkTie();
    }
  }
  
  return {
    /* States */
    board,
    turn,

    /* Mutations */
    handleClick: (row: number, col: number) => {
      updateBoard(row, col);
    },
    resetGame,
  }
})
