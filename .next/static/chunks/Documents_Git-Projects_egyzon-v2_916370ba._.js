(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Git-Projects/egyzon-v2/Hooks/useHandleAddToCart.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useHandleAddToCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/context/CartContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useHandleAddToCart() {
    _s();
    const { addtocart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const handleAddToCart = (product, quantity = 1)=>{
        addtocart(product, quantity);
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${quantity} x ${product.name} added to cart`, {
            position: "bottom-right",
            autoClose: 5000,
            size: "small"
        });
    };
    return handleAddToCart;
}
_s(useHandleAddToCart, "lgqzvitdaLmtHtRIosQRWJR8UhU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$Hooks$2f$useHandleAddToCart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/Hooks/useHandleAddToCart.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ProductGrid({ products }) {
    _s();
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$Hooks$2f$useHandleAddToCart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const handleAddToCartClick = (e, product)=>{
        e.preventDefault(); // Prevent navigating to product detail page
        e.stopPropagation(); // Stop event from bubbling up
        addToCart(product, 1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto mt-5 shadow-lg",
        children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/products/${product.id}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: product.image,
                            alt: product.name,
                            className: "w-full h-85 fill"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-semibold mb-2",
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                                    lineNumber: 27,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: " text-gray-500 mb-2",
                                    children: product.category
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                                    lineNumber: 28,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-yellow-600 font-bold text-xl",
                                    children: [
                                        product.price,
                                        " EGP"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>handleAddToCartClick(e, product),
                                    className: "mt-10 bg-yellow-400 text-white rounded-3xl hover:bg-transparent hover:text-black w-35 h-10 cursor-pointer hover:border-1",
                                    children: "Add To Cart"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                            lineNumber: 26,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this)
            }, product.id, false, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
                lineNumber: 19,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/ProductGrid.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(ProductGrid, "Y8Hq8i8zlBa6qwA5MXoS/tlZvZ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$Hooks$2f$useHandleAddToCart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ProductGrid;
var _c;
__turbopack_context__.k.register(_c, "ProductGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Git-Projects_egyzon-v2_916370ba._.js.map