import {defineStore} from 'pinia'

type Mode = 'dark' | 'light';

export const useStore = defineStore('app', {
    state: () => {
        return {
            mode: 'dark' as Mode
        }
    },
    getters: {
        appearanceMode(state) {
            return state.mode;
        }
    },
    actions: {
        toggleAppearanceMode() {
            if (this.appearanceMode === 'dark') {
                this.mode = 'light';
            } else {
                this.mode = 'dark';
            }
        }
    }
})
