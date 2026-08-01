"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartkeyById = void 0;
exports.getkeyName = getkeyName;
function getkeyName(...args) {
    return `bites ${args.join(':')}`;
}
const cartkeyById = (id) => getkeyName('cart', id);
exports.cartkeyById = cartkeyById;
//# sourceMappingURL=keys.js.map