<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";
import { VehicleDto } from "../validations/Vehicle.dto.ts";

const emits = defineEmits(["close"]);

defineProps({
  isShown: {
    type: Boolean,
    default: false,
  },
});

const vehicleForm = ref<VehicleDto>(new VehicleDto());

async function closeModal(): Promise<void> {
  emits("close");
}
</script>

<template>
  <Modal
      :is-shown="isShown"
      title="Ajouter"
      @close="closeModal()"
  >
    <form class="flex flex-col gap-2">
      <label class="daisy-form-control w-full">
        <div class="daisy-label">
          <span class="daisy-label-text">Immatriculation</span>
        </div>
        <input
            v-model="vehicleForm.immatriculation"
            type="text"
            placeholder="Type here"
            class="daisy-input daisy-input-bordered w-full"
        />
      </label>

      <label class="daisy-form-control w-full">
        <div class="daisy-label">
          <span class="daisy-label-text">Model</span>
        </div>
        <input
            v-model="vehicleForm.model"
            type="text"
            placeholder="Type here"
            class="daisy-input daisy-input-bordered w-full"
        />
      </label>

      <button class="daisy-btn daisy-btn-neutral mt-4">Ajouter</button>
    </form>
  </Modal>
</template>
