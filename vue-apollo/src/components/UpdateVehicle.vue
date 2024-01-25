<script setup lang="ts">
import {onMounted, PropType, ref, watch} from "vue";
import Modal from "./Modal.vue";
import { Vehicle } from "../interfaces/vehicle.interface.ts";
import {VehicleDto} from "../validations/Vehicle.dto.ts";

const emits = defineEmits(["close"]);

const props = defineProps({
  isShown: {
    type: Boolean,
    default: false,
  },
  vehicle: {
    type: Object as PropType<Vehicle>,
    required: true,
  },
});

const vehicleForm = ref<VehicleDto>(new VehicleDto());

onMounted(async () => {
  await buildForm();
});

async function buildForm(): Promise<void> {
  vehicleForm.value.immatriculation = props.vehicle.immatriculation;
  vehicleForm.value.model = props.vehicle.model;
}

async function closeModal(): Promise<void> {
  emits("close");
}

watch(
    () => props.vehicle,
    async () => {
      await buildForm();
    },
    { immediate: true }
);
</script>

<template>
  <Modal
      :is-shown="isShown"
      :title="vehicle ? 'Modifier' : 'Ajouter'"
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

      <button class="daisy-btn daisy-btn-neutral mt-4">
        {{ vehicle ? 'Modifier' : 'Ajouter' }}
      </button>
    </form>
  </Modal>
</template>
