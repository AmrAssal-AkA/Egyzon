module.exports = [
"[project]/Documents/Git-Projects/egyzon-v2/.next-internal/server/app/products/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/Documents/Git-Projects/egyzon-v2/app/favicon.ico.mjs { IMAGE => \"[project]/Documents/Git-Projects/egyzon-v2/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/app/favicon.ico.mjs { IMAGE => \"[project]/Documents/Git-Projects/egyzon-v2/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/Documents/Git-Projects/egyzon-v2/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/Git-Projects/egyzon-v2/app/error.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/app/error.jsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/Git-Projects/egyzon-v2/app/not-found.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/app/not-found.jsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/Git-Projects/egyzon-v2/app/products/not-found.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/app/products/not-found.jsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/Git-Projects/egyzon-v2/lib/Products.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductsData",
    ()=>ProductsData,
    "categories",
    ()=>categories,
    "getCategoryState",
    ()=>getCategoryState,
    "getProductCategory",
    ()=>getProductCategory
]);
const ProductsData = [
    {
        id: "1",
        name: "Apple Iphone 17",
        price: "80000",
        image: "/productImages/iphone 17.webp",
        description: "Meet the new iPhone 17. Designed with contoured edges, thinner borders, and durable materials like Ceramic Shield 2 on the front, it looks — and stays — beautiful. You can see and do more of everything you love on a 6.3-inch Super Retina XDR display.5 And enjoy smoother scrolling and more immersive gaming with ProMotion, with an adaptive refresh rate up to 120Hz. Take it for a spin.",
        category: "electronics"
    },
    {
        id: "2",
        name: "Samsung Galaxy s25 ultra",
        price: "65000",
        image: "/productImages/samsung S25.jpeg",
        description: "The Samsung Galaxy S25 Ultra features a powerful Snapdragon 8 Elite processor, a vibrant 6.9-inch QHD+ display with a 120Hz refresh rate and Gorilla Glass Armor 2 for enhanced durability and reduced glare, and a versatile camera system led by a 200MP main sensor and a new 50MP ultra-wide lens. It boasts enhanced AI features through a Gemini/Bixby hybrid assistant ,a refined design with rounded corners and a titanium frame",
        category: "electronics"
    },
    {
        id: "3",
        name: "Playstation 5 ",
        price: "30000",
        image: "/productImages/ps5.jpg",
        description: "The PlayStation 5 (PS5) is Sony's powerful fifth-generation game console featuring an ultra-high-speed SSD for rapid load times, a custom CPU/GPU for stunning graphics and high frame rates up to 120fps, and support for advanced features like 4K resolution, ray tracing, haptic feedback, adaptive triggers, and 3D Audio for immersive gameplay. It offers backward compatibility with most PS4 games, a DualSense controller with tactile feedback, and access to a vast library of PlayStation games.",
        category: "electronics"
    },
    {
        id: "4",
        name: "Xbox Series X",
        price: 25000,
        image: "/productImages/xbox-series-x.png",
        description: "The Xbox Series X is Microsoft's powerful, high-performance gaming console designed for an unparalleled next-generation experience , featuring a custom AMD processor, a 1TB SSD for fast loading, Quick Resume to switch between games instantly, DirectX ray tracing for realistic graphics, 4K resolution support, and backward compatibility with thousands of Xbox One, Xbox 360, and original Xbox games.  ",
        category: "electronics"
    },
    {
        id: "5",
        image: "/productImages/Apple MacBook pro.jpeg",
        name: "MacBook Pro M4",
        price: 120000,
        category: "electronics"
    },
    {
        id: "6",
        name: "Sony Headset",
        image: "/productImages/Sony WH-1000XM4.avif",
        price: 1500,
        category: "electronics"
    },
    {
        id: "7",
        name: "dell xps Laptop",
        image: "/productImages/dell xps.avif",
        price: 15000,
        category: "electronics"
    }
];
const categories = [
    {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: "HomePage/electronic-cat.png",
        description: "Latest gadgets and tech devices",
        color: "bg-yellow-400"
    },
    {
        id: 2,
        name: "Car Care",
        slug: "care-care",
        image: "HomePage/car-care.jpg",
        description: "Car Care Products – Shine, Protect & Refresh Your Ride",
        color: "bg-yellow-400"
    },
    {
        id: 3,
        name: "Books",
        slug: "books",
        image: "HomePage/books.png",
        description: "Books – Discover, Learn & Get Inspired",
        color: "bg-yellow-400"
    },
    {
        id: 4,
        name: "fashion",
        slug: "fashion",
        image: "HomePage/fashion.png",
        description: "Fashion – Style That Defines You",
        color: "bg-yellow-400"
    },
    {
        id: 5,
        name: "Grocery",
        slug: "grocery",
        image: "HomePage/Groceries-Banner.jpeg",
        description: "High-quality of grociries",
        color: "bg-yellow-400"
    }
];
const getProductCategory = (categorySlug)=>{
    return ProductsData.filter((product)=>product.category === categorySlug);
};
const getCategoryState = ()=>{
    return catrgories.map((category)=>({
            ...category,
            productCount: getProductCategory(category.slug).length
        }));
};
}),
"[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductsAndCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$lib$2f$Products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/lib/Products.js [app-rsc] (ecmascript)");
;
;
;
;
function ProductsAndCategory() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-40",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-5xl text-center font-bold",
                children: [
                    "Browse ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-yellow-500",
                        children: "products and categories"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                        lineNumber: 10,
                        columnNumber: 16
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "m-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto mt-5 shadow-lg",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$lib$2f$Products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categories"].map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: category.image,
                                    alt: category.name,
                                    className: "w-full h-85 fill"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-semibold mb-2",
                                            children: category.name
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                            lineNumber: 27,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 mb-4",
                                            children: category.description
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                            lineNumber: 28,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, category.id, true, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                            lineNumber: 17,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "p-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto mt-5 shadow-lg",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$lib$2f$Products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductsData"].map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/products/${product.id}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: product.image,
                                        alt: product.name,
                                        className: "w-full h-85 fill"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-semibold mb-2",
                                                children: product.name
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                                lineNumber: 46,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: " text-gray-500 mb-2",
                                                children: product.category
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                                lineNumber: 49,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$egyzon$2d$v2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-yellow-600 font-bold text-xl",
                                                children: [
                                                    product.price,
                                                    " EGP"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                                lineNumber: 50,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this)
                        }, product.id, false, {
                            fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/Git-Projects/egyzon-v2/app/products/page.jsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__61902e84._.js.map