export const formatMoney = (amount: number | undefined) => {
    if (amount === undefined || amount === null) {
        return 'R$ 0,00';
    }
    return `R$ ${amount.toFixed(2).replace('.', ',')}`;
};