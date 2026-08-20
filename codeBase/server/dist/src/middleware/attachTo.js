"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachTo = attachTo;
function attachTo(io) {
    return (req, res, next) => {
        req.io = io;
        next();
    };
}
//# sourceMappingURL=attachTo.js.map