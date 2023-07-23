import { create } from 'zustand';
// To make the store Svelte compatible
import { readable } from 'svelte/store';

/* create() creates a global React hook, here  useStore is a global counter fn() craeted using create()
create() takes in a setter fn() and returns an Obj*/
const useStore = create(set => ({
    count: 0,
    increment: () => set(state => ({
        count: state.count + 1
    })),
}));

export const counter = readable(
    // 1st arg is the initial state
    useStore.getState(),
    // 2nd arg is initialization fn()
    set => {
        /* subscribe to changes on the store's "count" property, and call this fn() call set when it's fired
        return statement given below wihtout declaring the unsubscribe would throw ```Uncaught ReferenceError: assignment to undeclared variable unsubscribe``` error */
        const unsubscribe = useStore.subscribe(set);
        return () => unsubscribe();
    }
);

export default useStore;