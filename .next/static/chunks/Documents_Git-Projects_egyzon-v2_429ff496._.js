(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/dropdown.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Dropdown({ trigger, children }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggleDropdown = ()=>setIsOpen(!isOpen);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dropdown.useEffect": ()=>{
            const handleClickOutside = {
                "Dropdown.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsOpen(false);
                    }
                }
            }["Dropdown.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "Dropdown.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["Dropdown.useEffect"];
        }
    }["Dropdown.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block text-left",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: toggleDropdown,
                children: trigger
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/dropdown.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20",
                role: "menu",
                "aria-orientation": "vertical",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-1",
                    role: "none",
                    onClick: ()=>setIsOpen(false),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/dropdown.jsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/dropdown.jsx",
                lineNumber: 30,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/dropdown.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(Dropdown, "uhOyve9TWk+bvhPJTPlaMsUEQAY=");
_c = Dropdown;
var _c;
__turbopack_context__.k.register(_c, "Dropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/EgyzonLogo.4fbb0a50.png");}),
"[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png.mjs { IMAGE => \"[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png (static in ecmascript)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 800,
    height: 800,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAApklEQVR42qXPsQ7BQBwG8L9KRDBIDCQms1WCTSSCeAOP4N1MNpsIqiQNxcZouES119T1XO/+ei/AYPgNX/LlSz5ARPgGfhbi8FXQJGM5VMqQEc8qKY1EOskp8Kx9x9vuuvTgtMPrrf5cm33qnJrucjXihFQhOF8a9Oi0PMvqkdl04i7mY2qbg8DeDN/kXgM9qykhMsJ3y4oHReR+CaNHBWOWh79ffABRDrwW4NVCMgAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/egyzon-v2/context/CartContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function CartProvider({ children }) {
    _s();
    const [cartItems, setCartItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isCartopen, setCartopen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const openCart = ()=>setCartopen(true);
    const closeCart = ()=>setCartopen(false);
    const addtocart = (product, quantity = 1)=>{
        setCartItem((prevItems)=>{
            const existingItem = prevItems.find((Item)=>Item.id === product.id);
            if (existingItem) {
                return prevItems.map((item)=>item.id === product.id ? {
                        ...item,
                        quantity: item.quantity + quantity
                    } : item);
            } else {
                return [
                    ...prevItems,
                    {
                        ...product,
                        quantity
                    }
                ];
            }
        });
    };
    const removeFromCart = (productId)=>{
        setCartItem((prevItems)=>prevItems.filter((item)=>item.id !== productId));
    };
    const clearCart = ()=>setCartItem([]);
    const value = {
        cartItems,
        addtocart,
        openCart,
        closeCart,
        isCartopen,
        removeFromCart,
        clearCart
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/Git-Projects/egyzon-v2/context/CartContext.jsx",
        lineNumber: 45,
        columnNumber: 10
    }, this);
}
_s(CartProvider, "ZsjOy9XUB0Oy/Laa31r+w9OErHQ=");
_c = CartProvider;
function useCart() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/egyzon-v2/lib/actions.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Mainheader,
    "navlinks",
    ()=>navlinks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUserRound$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-client] (ecmascript) <export default as CircleUserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/log-in.js [app-client] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$components$2f$headerFooter$2f$dropdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/dropdown.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png.mjs { IMAGE => "[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/context/CartContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$lib$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/lib/actions.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const navlinks = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Products",
        path: "/products"
    },
    {
        name: "Deals",
        path: "/Deals"
    },
    {
        name: "Become a Partner",
        path: "Partner"
    }
];
function Mainheader({ user }) {
    _s();
    const currentPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { openCart, cartItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const totalquantity = cartItems.reduce((Quantity, item)=>Quantity + item.quantity, 0);
    const [Open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "shadow-md w-full fixed top-0 left-0 ",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "md:flex items-center justify-between bg-yellow-400 py-4 md:px-10 px-7",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cursor-pointer flex items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                            alt: "egyzon Brand logo",
                            width: 100
                        }, void 0, false, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setOpen(!Open),
                    className: "absolute right-8 top-8 cursor-pointer md:hidden",
                    children: Open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                        lineNumber: 51,
                        columnNumber: 19
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {}, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                        lineNumber: 51,
                        columnNumber: 27
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: `md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-yellow-400 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${Open ? "top-30 opacity-100" : "top-[-498px]"} md:opecity-100 opecity-0 `,
                    children: [
                        navlinks.map((links)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "md:ml-8 text-xl md:my-0 my-7  md:p-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: links.path,
                                    className: currentPath === links.path ? "border-2 p-2 text-yellow-800 font-bold" : "text-black",
                                    children: links.name
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this)
                            }, links.name, false, {
                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:ml-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$components$2f$headerFooter$2f$dropdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "p-4 py-3 cursor-pointer duration-200 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleUserRound$3e$__["CircleUserRound"], {
                                            className: "w-6 h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                            lineNumber: 79,
                                            columnNumber: 19
                                        }, void 0),
                                        user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden md:inline",
                                            children: user.name
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                            lineNumber: 81,
                                            columnNumber: 21
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                    lineNumber: 78,
                                    columnNumber: 17
                                }, void 0),
                                children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/profile/settings",
                                            className: "flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                            role: "menuitem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                    lineNumber: 93,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                    lineNumber: 94,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                            lineNumber: 88,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            action: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$lib$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"],
                                            className: "w-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                                role: "menuitem",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                        lineNumber: 102,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Logout"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                        lineNumber: 103,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                lineNumber: 97,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: "flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                            role: "menuitem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                    lineNumber: 114,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Login"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                    lineNumber: 115,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/signup",
                                            className: "flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                            role: "menuitem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                    lineNumber: 122,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Sign Up"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                                    lineNumber: 123,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                            lineNumber: 117,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/cart",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: openCart,
                                className: "p-4 py-3 md:ml-4 cursor-pointer relative inline-block",
                                "aria-label": "open cart",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        size: 25
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this),
                                    totalquantity > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-2 right-2 bg-yellow-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold",
                                        children: totalquantity
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(Mainheader, "zPkHIcKFOdWuNHHMARYDP6RmTuY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = Mainheader;
var _c;
__turbopack_context__.k.register(_c, "Mainheader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png.mjs { IMAGE => "[project]/Documents/Git-Projects/egyzon-v2/public/Logo/EgyzonLogo.png (static in ecmascript)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$components$2f$headerFooter$2f$MainHeader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/MainHeader.jsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Footer() {
    const links = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$components$2f$headerFooter$2f$MainHeader$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navlinks"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-yellow-400 text-gray-800 py-6 ",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-start w-80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$public$2f$Logo$2f$EgyzonLogo$2e$png__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                width: 100,
                                alt: "Egyzon Brand Logo"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-3xl",
                                children: "Experience shopping like never before!"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                                lineNumber: 15,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: " flex flex-row gap-5 font-bold text-black text-xl mt-2",
                            children: links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.path,
                                        className: "hover:border-2 p-2 mb-1 last:mb-0",
                                        children: [
                                            " ",
                                            link.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                                        lineNumber: 22,
                                        columnNumber: 17
                                    }, this)
                                }, link.name, false, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-black"
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: " text-center p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-3xl",
                    children: "© Designed By AmrAssal, All right reserved"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Git-Projects/egyzon-v2/components/headerFooter/footer.jsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Git-Projects_egyzon-v2_429ff496._.js.map