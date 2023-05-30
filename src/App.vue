<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-center align-items-center m-5">
        <span class="fs-3">El juego del Gato #ElGatoApp</span>
        <button class="btn btn-outline-primary ms-2" @click="resetGame">Reiniciar</button>
      </div>
    </div>
    <div class="row" v-for="(row, rowIndex) in board">
      <div class="col d-flex justify-content-center align-items-center m-2 square" v-for="(col, colIndex) in row" @click="handleClick(rowIndex, colIndex)">
        <i v-if="col === 'X'" class="bi-x-lg fs-2" style="color: #CD2402;"></i>
        <i v-if="col === 'O'" class="bi-circle fs-2" style="color: #1683CF;"></i>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center align-items-center square turn m-5" :class="(turn === 'X') ? 'active' : ''">
        <i class="bi-x-lg fs-2" style="color: #CD2402;"></i>
      </div>
      <div class="col d-flex justify-content-center align-items-center square turn m-5" :class="(turn === 'O') ? 'active' : ''">
        <i class="bi-circle fs-2" style="color: #1683CF;"></i>
      </div>
    </div>
  </div>
  <Transition name="dialog">
      <div v-if="isShowing" class="dialog-container">
          <div class="dialog position-absolute d-flex justify-content-center align-items-center h-100 w-100" @click.self="selfClose">
              <AlertDialog />
          </div>
      </div>
  </Transition>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useBoardStore } from '@/stores/board';
  import { useDialogStore } from '@/stores/dialogStore';
  import AlertDialog from '@/components/AlertDialog.vue';
  
  const boardStore = useBoardStore();
  const { board, turn } = storeToRefs(boardStore);
  const { handleClick, resetGame } = boardStore;

  const dialogStore = useDialogStore();
  const { isShowing } = storeToRefs(dialogStore);
  const { selfClose } = dialogStore;
</script>

<style scoped>
  .square {
    border: 1px solid #AAAAAA;
    border-radius: 5px;
    width: 15vw;
    height: 20vh;
  }

  .square.turn {
    width: 10vw;
    height: 10vh;
  }

  .turn.active {
    background-color: rgba(11, 228, 101, 0.2);
    border: 1px solid rgba(11, 228, 101, 0.6);
  }

  .dialog {
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }

  .dialog-enter-active,
  .dialog-leave-active {
      transition: opacity 0.2s ease;
  }

  .dialog-enter-from,
  .dialog-leave-to {
      opacity: 0;
  }
</style>