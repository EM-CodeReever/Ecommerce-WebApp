import { defineStore } from "pinia";
import mitt from "mitt";
const $emitter = mitt();
export const useEventStore = defineStore('eventStore', {
    state: () => ({
        emitter: $emitter,
    }),
    getters: {
        getEmitter(): typeof $emitter {
            return this.emitter;
        }
    },
});