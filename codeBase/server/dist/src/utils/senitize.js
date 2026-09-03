"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentizeRichText = exports.sentizePlainText = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const sentizePlainText = (text) => {
    return (0, sanitize_html_1.default)(text, {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();
};
exports.sentizePlainText = sentizePlainText;
const sentizeRichText = (html) => {
    return (0, sanitize_html_1.default)(html, {
        allowedTags: sanitize_html_1.default.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
        allowedAttributes: {
            ...sanitize_html_1.default.defaults.allowedAttributes,
            img: ['src', 'alt'],
            a: ['href', 'target', 'rel'],
        },
        allowedSchemes: ['http', 'https'],
        transformTags: {
            a: sanitize_html_1.default.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
        }
    }).trim();
};
exports.sentizeRichText = sentizeRichText;
//# sourceMappingURL=senitize.js.map