import { create } from 'zustand';

/* create() creates a global React hook, here  useStore is a global counter fn() craeted using create()
create() takes in a setter fn() and returns an Obj*/
const useStore = create(set => ({
    count: 0,
    increment: () => set(state => ({
        count: state.count + 1
    }))
}))

export default useStore;