import { create } from "zustand";

const useOrderStore = create((set) => ({
    orderId: null,
    amount: 0,
    paymentType: null,

    setOrder: (id, amount, paymentType) =>
        set({
            orderId: id,
            amount,
            paymentType,
        }),

    clearOrder: () =>
        set({
            orderId: null,
            amount: 0,
            paymentType: null,
        }),
}));

export default useOrderStore;
