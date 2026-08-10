"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (Schema) => (req, res, next) => {
    try {
        Schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                status: "error",
                message: error.issues.map((err) => err.message).join(", "),
            });
        }
        next(error);
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map