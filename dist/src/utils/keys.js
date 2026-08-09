"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistCacheKey = exports.cartkeyUserById = exports.cartkeyById = void 0;
exports.getkeyName = getkeyName;
function getkeyName(...args) {
    return `bites ${args.join(':')}`;
}
const cartkeyById = (id) => getkeyName('cart', id);
exports.cartkeyById = cartkeyById;
const cartkeyUserById = (userId) => getkeyName('cart', 'user', userId);
exports.cartkeyUserById = cartkeyUserById;
const wishlistCacheKey = (userId) => getkeyName('wishlist', userId);
exports.wishlistCacheKey = wishlistCacheKey;
//# sourceMappingURL=keys.js.map