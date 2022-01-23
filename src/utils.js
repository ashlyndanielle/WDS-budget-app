// first arg is local - passing 'undefined' defaults to current user's local (english, etc...)
export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: 'usd',
    style: 'currency',
    minimumFractionDigits: 0,
})
