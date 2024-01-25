<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import apolloClient from '../apollo-client';
import { VEHICLE_QUERY, VEHICLE_SUBSCRIPTION } from "../services/vehicles.ts";
import { Vehicle, VehicleSubscription } from "../interfaces/vehicle.interface.ts";
import UpdateVehicle from "./UpdateVehicle.vue";
import { successToast } from "../stores/modules/notification.ts";
import CreateVehicle from "./CreateVehicle.vue";

const state = reactive({
  data: null as Vehicle[] | null,
  loading: false,
  error: null as any,
});

// Modal
const displayCreateModal = ref<boolean>(false);
const displayUpdateModal = ref<boolean>(false);
const vehicleSelected = ref<Vehicle | null>(null);

onMounted(async () => {
  await getVehicles();
  await subscribeToVehicle();
});

/**
 * Récupère la liste des véhicules
 * @returns {Promise<void>}
 */
async function getVehicles(): Promise<void> {
  state.loading = true;
  try {
    const response = await apolloClient.query({ query: VEHICLE_QUERY });
    state.data = response.data?.vehicles ?? null;
  } catch (e) {
    state.error = e;
  } finally {
    state.loading = false;
  }
}

async function subscribeToVehicle(): Promise<any> {
  const subscription = apolloClient.subscribe<VehicleSubscription>({
    query: VEHICLE_SUBSCRIPTION,
  }).subscribe({
    next(response) {
      const vehicle = response.data?.vehicleChange ?? null;
      if (!vehicle || !state.data) return;

      const exist = state.data.find((v: Vehicle) => v.id === vehicle.id);

      if (exist) {
        const index = state.data.indexOf(exist);
        state.data[index] = vehicle;

        if (vehicleSelected.value?.id === vehicle.id) {
          vehicleSelected.value = vehicle;
          successToast({ title: 'Le véhicule que vous regardez a été mis à jour.' });
        } else successToast({ title: 'La liste des véhicules a été mise à jour.' });
      } else {
        state.data.push(vehicle);
        successToast({ title: 'La liste des véhicules a été mise à jour.' });
      }
    },
    error(err) { console.error('Erreur de subscription:', err); },
  });

  return () => subscription.unsubscribe();
}

/**
 * Ouvre la modale de mise à jour et récupère le véhicule à mettre à jour
 * @param {string} id
 * @returns {Promise<void>}
 */
async function openModal(id: string): Promise<void> {
  if (!state.data) return;

  displayUpdateModal.value = true;

  const find = state.data.find((vehicle: Vehicle) => vehicle.id === id);
  vehicleSelected.value = find ?? null;
}

/**
 * Ferme la modale de mise à jour et réinitialise la variable vehicleSelected
 * @returns {Promise<void>}
 */
async function closeModal(): Promise<void> {
  displayUpdateModal.value = false;

  setTimeout(() => {
    vehicleSelected.value = null;
  }, 300);
}
</script>

<template>
    <section class="h-screen bg-gray-700 text-white p-6">
      <div class="flex gap-6 items-center mb-4">
        <h1 class="text-2xl">Véhicules</h1>
        <button class="daisy-btn daisy-btn-neutral my-4 w-32" @click="displayCreateModal = true">
          Ajouter
        </button>
      </div>

      <div v-if="state.loading">Loading...</div>
      <div v-else-if="state.error">Error: {{ state.error }}</div>
      <div v-else-if="state.data" class="overflow-x-auto">
        <table class="daisy-table w-fit bg-[#FAFAFA] text-gray-900">
          <thead>
            <tr>
              <th></th>
              <th>Immatriculation</th>
              <th>Model</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehicle in state.data" :key="vehicle.id">
              <td>{{ vehicle.id }}</td>
              <td>{{ vehicle.immatriculation }}</td>
              <td>{{ vehicle.model }}</td>
              <td class="flex gap-4">
                <img src="../assets/icons/edit.svg" alt="" class="w-5 h-5 cursor-pointer" @click="openModal(vehicle.id)" />
                <img src="../assets/icons/trash.svg" alt="" class="w-5 h-5 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <CreateVehicle :is-shown="displayCreateModal" @close="displayCreateModal = false" />
    <UpdateVehicle
        v-if="vehicleSelected"
        :is-shown="displayUpdateModal"
        :vehicle="vehicleSelected"
        @close="closeModal()"
    />
</template>
