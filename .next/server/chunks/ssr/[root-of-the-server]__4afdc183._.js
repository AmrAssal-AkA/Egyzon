module.exports = [
"[project]/.next-internal/server/app/categories/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/app/error.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/error.jsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.jsx [app-rsc] (ecmascript)"));
}),
"[project]/components/category/categoryGrid.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
;
function CategoryGrid({ categories }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto mt-5 shadow-lg dark:shadow-gray-700",
        children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                href: `/categories/${category.slug}`,
                className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full  dark:bg-gray-800 dark:border-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: category.image,
                            alt: category.name,
                            className: "w-full h-64 object-cover"
                        }, void 0, false, {
                            fileName: "[project]/components/category/categoryGrid.jsx",
                            lineNumber: 17,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 text-center flex-grow flex flex-col justify-start dark:text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-semibold mb-2 ",
                                    children: category.name
                                }, void 0, false, {
                                    fileName: "[project]/components/category/categoryGrid.jsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "light:text-gray-600 mb-4 dark:text-gray-200",
                                    children: category.description
                                }, void 0, false, {
                                    fileName: "[project]/components/category/categoryGrid.jsx",
                                    lineNumber: 24,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/category/categoryGrid.jsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this)
                    ]
                }, category.id, true, {
                    fileName: "[project]/components/category/categoryGrid.jsx",
                    lineNumber: 13,
                    columnNumber: 11
                }, this)
            }, category.id, false, {
                fileName: "[project]/components/category/categoryGrid.jsx",
                lineNumber: 8,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/category/categoryGrid.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/Products.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
        price: 75000,
        image: "/productImages/iphone 17.webp",
        description: "Meet the new iPhone 17. Designed with contoured edges, thinner borders, and durable materials like Ceramic Shield 2 on the front, it looks — and stays — beautiful. You can see and do more of everything you love on a 6.3-inch Super Retina XDR display.5 And enjoy smoother scrolling and more immersive gaming with ProMotion, with an adaptive refresh rate up to 120Hz. Take it for a spin.",
        category: "electronics"
    },
    {
        id: "2",
        name: "Samsung Galaxy s25 ultra",
        price: 65000,
        image: "/productImages/samsung S25.jpeg",
        description: "The Samsung Galaxy S25 Ultra features a powerful Snapdragon 8 Elite processor, a vibrant 6.9-inch QHD+ display with a 120Hz refresh rate and Gorilla Glass Armor 2 for enhanced durability and reduced glare, and a versatile camera system led by a 200MP main sensor and a new 50MP ultra-wide lens. It boasts enhanced AI features through a Gemini/Bixby hybrid assistant ,a refined design with rounded corners and a titanium frame",
        category: "electronics"
    },
    {
        id: "3",
        name: "Playstation 5 ",
        price: 30000,
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
        category: "electronics",
        description: "The latest MacBook Pro with the powerful M4 chip."
    },
    {
        id: "6",
        name: "Sony Headset",
        image: "/productImages/Sony WH-1000XM4.avif",
        price: 1500,
        category: "electronics",
        description: "Sony WH-1000XM4 Wireless Noise-Cancelling Headphones."
    },
    {
        id: "7",
        name: "dell xps Laptop",
        image: "/productImages/dell xps.avif",
        price: 15000,
        category: "electronics",
        description: "Dell XPS laptop with high-resolution display and powerful performance."
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
"[project]/app/categories/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$category$2f$categoryGrid$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/category/categoryGrid.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/Products.js [app-rsc] (ecmascript)");
;
;
;
;
function Categories() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-4 mt-30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-6xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-600 to-yellow-700 bg-clip-text text-transparent mb-4",
                            children: "Categories"
                        }, void 0, false, {
                            fileName: "[project]/app/categories/page.jsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 text-lg font-medium dark:text-gray-300",
                            children: "Explore our wide range of products"
                        }, void 0, false, {
                            fileName: "[project]/app/categories/page.jsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/categories/page.jsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$category$2f$categoryGrid$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    categories: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categories"]
                }, void 0, false, {
                    fileName: "[project]/app/categories/page.jsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/categories/page.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/categories/page.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Categories;
}),
"[project]/app/categories/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/categories/page.jsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4afdc183._.js.map