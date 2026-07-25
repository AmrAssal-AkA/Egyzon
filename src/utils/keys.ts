export function getkeyName(...args: string[]) {
    return `bites ${args.join(':')}`;
}


export const cartkeyById = (id: string) => getkeyName('cart', id);