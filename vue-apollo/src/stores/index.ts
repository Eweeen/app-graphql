import { defineStore } from "pinia";
import { useToastStore } from "./modules/notification";

export const useStore = defineStore("store", () => {
    const toast = useToastStore();

    return { toast };
});
