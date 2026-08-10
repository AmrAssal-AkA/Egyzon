export function getkeyName(...args: string[]) {
    return `bites ${args.join(':')}`;
}


export const cartkeyById = (id: string) => getkeyName('cart', id);
export const cartkeyUserById = (userId: string) => getkeyName('cart', 'user', userId);
export const wishlistCacheKey = (userId: string) => getkeyName('wishlist', userId);