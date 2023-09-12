import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

const loadState = () => {
    try {
        const storedState = localStorage.getItem('minimumLimitWarnings')
        return storedState ? JSON.parse(storedState) : null
    } catch (error) {
        console.log(error);
        return null
    }
}

const saveState = (state) => {
    try {
        localStorage.setItem('minimumLimitWarnings', JSON.stringify(state))
        console.log('saving state to local storage', state);
    } catch (error) {
        console.log(error);
        return null
    }
}


const useStore = create(
    devtools((set) => ({
        minimumLimitWarnings: loadState() || [
            { denomination: 50, value: 0 }, // Default values
            { denomination: 20, value: 0 },
            { denomination: 10, value: 0 },
            { denomination: 5, value: 0 },
            { denomination: 2, value: 0 },
            { denomination: 1, value: 0 },
            { denomination: .50, value: 0 },
            { denomination: .20, value: 0 },
            { denomination: .10, value: 0 },
            { denomination: .05, value: 0 },
        ],
        setMinimumLimitWarning: (denomination, value) => {
            set((state) => ({
                minimumLimitWarnings: state.minimumLimitWarnings.map((item) =>
                    item.denomination === denomination
                        ? { ...item, value }
                        : item
                ),
            }));
        },
    })),
    "lowerLimitStore"
)
useStore.subscribe(
    (state) => {
        saveState(state.minimumLimitWarnings);
    },
    (state) => state.minimumLimitWarnings
);
export default useStore;
