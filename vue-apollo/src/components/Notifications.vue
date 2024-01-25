<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../stores";

const store = useStore();
const toasts = computed(() => store.toast.messages);

function deleteToast(uuid: number) {
  store.toast.remove(uuid);
}
</script>

<template>
  <div class="fixed top-8 w-full sm:w-auto sm:right-8 flex items-end flex-col gap-2 z-[90]">
    <transition-group name="toast" appear>
      <div
          v-for="toast in toasts"
          :key="toast.uuid"
          :pw="toast.type"
          class="rounded-lg p-4 select-none bg-white max-w-sm shadow-md mx-1 sm:mx-0"
      >
        <div class="flex flex-row gap-4">
          <div class="flex flex-col gap-1">
            <h5 class="text-sm leading-5 font-medium text-lc-gray-arsenic">
              {{ toast.title }}
            </h5>
            <div v-if="toast.message" class="mt-1 text-sm leading-5 font-normal text-lc-gray-dimGray">
              {{ toast.message }}
            </div>
          </div>
          <div class="flex-shrink-0">
            <img
                @click="deleteToast(toast.uuid)"
                src="../assets/icons/close.svg"
                class="h-5 w-5 cursor-pointer"
                alt="Supprimer la notification"
                aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  &-enter-from {
    opacity: 0;
    transform: translateX(200px);
  }
  &-enter-active {
    transition: all 0.4s ease-out;
  }
  &-enter-to {
    opacity: 100;
    transform: translateX(0px);
  }

  &-leave-from {
    opacity: 100;
    transform: translateX(0px);
  }
  &-leave-active {
    transition: all 0.4s ease-in;
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(200px);
  }
}
</style>
