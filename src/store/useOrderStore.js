import { create } from "zustand";

const useOrderStore = create((set) => ({
    orderId: null,
    amount: 0,

    setOrder: (id, amount) => set({ orderId: id, amount }),
    clearOrder: () => set({ orderId: null, amount: 0 }),
}));

export default useOrderStore;
