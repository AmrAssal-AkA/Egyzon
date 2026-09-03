"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitKey = exports.productCacheKey = exports.wishlistCacheKey = exports.cartkeyUserById = exports.cartkeyById = void 0;
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
const productCacheKey = (productId) => getkeyName('product', productId);
exports.productCacheKey = productCacheKey;
const RateLimitKey = (ip) => getkeyName('rate-limit', ip || 'unknown');
exports.RateLimitKey = RateLimitKey;
//# sourceMappingURL=keys.js.map