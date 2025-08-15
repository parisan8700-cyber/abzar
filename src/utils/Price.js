export const getFinalPrice = (price, discount) => {
    if (!price) return 0;
    return discount ? price - discount : price;
};

export const getDiscountPercent = (price, discount) => {
    if (!price || !discount) return 0;
    return Math.round((discount / price) * 100);
};

export const formatPrice = (value) => {
    if (typeof value !== "number") return "";
    return value.toLocaleString();
};
