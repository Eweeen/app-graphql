import { defineStore } from "pinia";

type ToastType = "danger" | "warning" | "success";

interface Toast {
    type: ToastType;
    title?: string;
    message?: string;
    duration?: number;
}

let uuid: number = 0;
class ToastMessage {
    type: ToastType;
    title: string;
    message: string;
    duration: number;
    uuid: number;
    timer: NodeJS.Timeout;

    constructor(type: ToastType, title: string, message: string, duration?: number) {
        this.type = type;
        this.title = title;
        this.message = message;
        this.duration = duration ?? 5000;
        this.uuid = uuid++;

        this.timer = setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    remove(): void {
        useToastStore().remove(this.uuid);
    }
}

const useToastStore = defineStore("notification", {
    state: () => ({
        messages: [] as ToastMessage[]
    }),
    actions: {
        push(type: ToastType, title: string, message: string, duration?: number): void {
            this.messages.push(new ToastMessage(type, title, message, duration));
        },
        remove(uuid: number): void {
            this.messages.splice(
                this.messages.findIndex((t) => t.uuid === uuid),
                1
            );
        }
    }
});

/**
 * Affiche un toast d'erreur
 * @param toast
 * @param toast.title Titre du toast
 * @param toast.message Message du toast
 * @param toast.duration Durée d'affichage du toast
 * @returns void
 */
const errorToast = (toast?: Omit<Toast, "type">): void => {
    useToastStore().push(
        "danger",
        toast?.title ?? "Une erreur est survenue",
        toast?.message ?? "",
        toast?.duration
    );
};

/**
 * Affiche un toast de succès
 * @param toast
 * @param toast.title Titre du toast
 * @param toast.message Message du toast
 * @param toast.duration Durée d'affichage du toast
 * @returns void
 */
const successToast = (toast: Omit<Toast, "type">): void => {
    useToastStore().push("success", toast?.title ?? "", toast?.message ?? "", toast?.duration);
};

/**
 * Affiche un toast d'avertissement
 * @param toast
 * @param toast.title Titre du toast
 * @param toast.message Message du toast
 * @param toast.duration Durée d'affichage du toast
 * @returns void
 */
const warningToast = (toast: Omit<Toast, "type">): void => {
    useToastStore().push(
        "warning",
        toast?.title ?? "Une erreur est survenue",
        toast?.message ?? "",
        toast?.duration
    );
};

export { useToastStore, errorToast, successToast, warningToast };
