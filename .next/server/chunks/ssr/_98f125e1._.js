module.exports = [
"[project]/Hooks/useHandleAddToCart.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useHandleAddToCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CartContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/react-toastify.esm.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function useHandleAddToCart() {
    const { addtocart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const handleAddToCart = (product, quantity = 1)=>{
        addtocart(product, quantity);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`${quantity} x ${product.name} added to cart`, {
            position: "bottom-right",
            autoClose: 5000,
            size: "small"
        });
    };
    return handleAddToCart;
}
}),
"[project]/components/product/ProductGrid.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Hooks$2f$useHandleAddToCart$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Hooks/useHandleAddToCart.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function ProductGrid({ products }) {
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Hooks$2f$useHandleAddToCart$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const handleAddToCartClick = (e, product)=>{
        e.preventDefault();
        addToCart(product, 1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-6xl mx-auto mt-8 dark:shadow-gray-700",
        children: !products || products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center h-64 bg-gray-50 rounded-2xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg text-gray-500 font-medium",
                children: "No products found."
            }, void 0, false, {
                fileName: "[project]/components/product/ProductGrid.jsx",
                lineNumber: 18,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/product/ProductGrid.jsx",
            lineNumber: 17,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 dark:shadow-gray-700",
            children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: `/products/${product.id}`,
                    className: "group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md shadow-amber-400 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full dark:bg-gray-800 dark:border-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-square sm:aspect-[4/5] overflow-hidden bg-white p-4 sm:p-6 flex justify-center items-center dark:bg-gray-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: product.image,
                                alt: product.name,
                                className: "w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700"
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductGrid.jsx",
                                lineNumber: 31,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/product/ProductGrid.jsx",
                            lineNumber: 30,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 sm:p-5 flex flex-col flex-grow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xs sm:text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold dark:text-white",
                                    children: product.category
                                }, void 0, false, {
                                    fileName: "[project]/components/product/ProductGrid.jsx",
                                    lineNumber: 38,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[40px] sm:min-h-[48px] dark:text-white",
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/components/product/ProductGrid.jsx",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-auto pt-4 flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg sm:text-xl font-bold text-yellow-600 dark:text-yellow-400",
                                            children: [
                                                Number(product.price).toFixed(2),
                                                " EGP"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/product/ProductGrid.jsx",
                                            lineNumber: 45,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>handleAddToCartClick(e, product),
                                            className: "w-full bg-yellow-400 text-gray-900 font-bold py-2.5 rounded-xl hover:bg-yellow-500 transition-colors active:scale-95 duration-200",
                                            children: "Add To Cart"
                                        }, void 0, false, {
                                            fileName: "[project]/components/product/ProductGrid.jsx",
                                            lineNumber: 48,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/product/ProductGrid.jsx",
                                    lineNumber: 44,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/product/ProductGrid.jsx",
                            lineNumber: 37,
                            columnNumber: 15
                        }, this)
                    ]
                }, product.id, true, {
                    fileName: "[project]/components/product/ProductGrid.jsx",
                    lineNumber: 25,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/product/ProductGrid.jsx",
            lineNumber: 23,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/product/ProductGrid.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/Products.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        category: "electronics",
        rating: 4.9,
        stock: 10,
        seller: "Apple",
        createdAt: "2023-05-15T09:30:00Z",
        sales: 120
    },
    {
        id: "2",
        name: "Samsung Galaxy s25 ultra",
        price: 65000,
        image: "/productImages/samsung S25.jpeg",
        description: "The Samsung Galaxy S25 Ultra features a powerful Snapdragon 8 Elite processor, a vibrant 6.9-inch QHD+ display with a 120Hz refresh rate and Gorilla Glass Armor 2 for enhanced durability and reduced glare, and a versatile camera system led by a 200MP main sensor and a new 50MP ultra-wide lens. It boasts enhanced AI features through a Gemini/Bixby hybrid assistant ,a refined design with rounded corners and a titanium frame",
        category: "electronics",
        rating: 4.8,
        stock: 15,
        seller: "Samsung",
        createdAt: "2023-05-15T09:30:00Z",
        sales: 120
    },
    {
        id: "3",
        name: "Playstation 5 ",
        price: 30000,
        image: "/productImages/ps5.jpg",
        description: "The PlayStation 5 (PS5) is Sony's powerful fifth-generation game console featuring an ultra-high-speed SSD for rapid load times, a custom CPU/GPU for stunning graphics and high frame rates up to 120fps, and support for advanced features like 4K resolution, ray tracing, haptic feedback, adaptive triggers, and 3D Audio for immersive gameplay. It offers backward compatibility with most PS4 games, a DualSense controller with tactile feedback, and access to a vast library of PlayStation games.",
        category: "electronics",
        rating: 4.7,
        stock: 10,
        seller: "Sony",
        createdAt: "2023-05-15T09:30:00Z",
        sales: 120
    },
    {
        id: "4",
        name: "Xbox Series X",
        price: 25000,
        image: "/productImages/xbox-series-x.png",
        description: "The Xbox Series X is Microsoft's powerful, high-performance gaming console designed for an unparalleled next-generation experience , featuring a custom AMD processor, a 1TB SSD for fast loading, Quick Resume to switch between games instantly, DirectX ray tracing for realistic graphics, 4K resolution support, and backward compatibility with thousands of Xbox One, Xbox 360, and original Xbox games.  ",
        category: "electronics",
        rating: 4.6,
        stock: 10,
        seller: "Microsoft",
        createdAt: "2023-05-15T09:30:00Z",
        sales: 120
    },
    {
        id: "5",
        image: "/productImages/Apple MacBook pro.jpeg",
        name: "MacBook Pro M4",
        price: 120000,
        category: "electronics",
        description: "The latest MacBook Pro with the powerful M4 chip.",
        rating: 4.9,
        stock: 10,
        seller: "Apple",
        createdAt: "2023-05-15T09:30:00Z",
        sales: 120
    },
    {
        id: "6",
        name: "Sony Headset",
        image: "/productImages/Sony WH-1000XM4.avif",
        price: 1500,
        category: "electronics",
        description: "Sony WH-1000XM4 Wireless Noise-Cancelling Headphones.",
        rating: 4.8,
        stock: 10,
        seller: "Sony",
        createdAt: "2023-05-15T09:30:00Z",
        sales: 120
    },
    {
        id: "7",
        name: "dell xps Laptop",
        image: "/productImages/dell xps.avif",
        price: 15000,
        category: "electronics",
        description: "Dell XPS laptop with high-resolution display and powerful performance.",
        rating: 4.5,
        stock: 15,
        seller: "Dell",
        createdAt: "2023-05-15T09:30:00Z",
        sales: 120
    },
    {
        id: "8",
        name: "T-shirt",
        price: 500,
        image: "/productImages/t-shirt.jpg",
        description: "A comfortable cotton t-shirt.",
        category: "fashion",
        rating: 4.2,
        stock: 100,
        seller: "FashionBrand",
        createdAt: "2023-06-01T10:00:00Z",
        sales: 300
    },
    {
        id: "9",
        name: "Jeans",
        price: 1200,
        image: "/productImages/jeans.jpg",
        description: "Stylish blue jeans.",
        category: "fashion",
        rating: 4.6,
        stock: 80,
        seller: "FashionBrand",
        createdAt: "2023-05-20T14:00:00Z",
        sales: 250
    },
    {
        id: "10",
        name: "Organic Apples",
        price: 150,
        image: "/productImages/apples.jpg",
        description: "Fresh organic apples.",
        category: "grocery",
        rating: 4.8,
        stock: 200,
        seller: "FreshFarms",
        createdAt: "2023-06-10T08:00:00Z",
        sales: 500
    },
    {
        id: "11",
        name: "Car Wax",
        price: 300,
        image: "/productImages/car-wax.jpg",
        description: "High-quality car wax for a brilliant shine.",
        category: "car-care",
        rating: 4.7,
        stock: 50,
        seller: "AutoShine",
        createdAt: "2023-04-25T11:20:00Z",
        sales: 150
    },
    {
        id: "12",
        name: "The Great Gatsby",
        price: 250,
        image: "/productImages/gatsby.jpg",
        description: "A classic novel by F. Scott Fitzgerald.",
        category: "books",
        rating: 4.9,
        stock: 120,
        seller: "BookWorld",
        createdAt: "2023-03-10T18:45:00Z",
        sales: 400
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
        slug: "car-care",
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
"[project]/components/filters/filterSlidbar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/Products.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const FilterSidebar = ({ filters, setFilter, clearFilters, sortOption, setSortOption, products })=>{
    const sellers = [
        ...new Set(products.map((p)=>p.seller))
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-full md:w-96 p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg space-y-6 md:mt-0 mt-30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-800 dark:text-white",
                        children: "Filters"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clearFilters,
                        className: "text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300",
                        children: "Clear All"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/filters/filterSlidbar.jsx",
                lineNumber: 17,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-700 dark:text-gray-300",
                        children: "Sort By"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: sortOption,
                        onChange: (e)=>setSortOption(e.target.value),
                        className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "newest",
                                children: "Newest"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "price-asc",
                                children: "Price: Low to High"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "price-desc",
                                children: "Price: High to Low"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "rating",
                                children: "Highest Rated"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "best-selling",
                                children: "Best Selling"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/filters/filterSlidbar.jsx",
                lineNumber: 29,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-700 dark:text-gray-300",
                        children: "Category"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filters.category,
                        onChange: (e)=>setFilter("category", e.target.value),
                        className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: "All Categories"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categories"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: cat.slug,
                                    children: cat.name
                                }, cat.id, false, {
                                    fileName: "[project]/components/filters/filterSlidbar.jsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/filters/filterSlidbar.jsx",
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-700 dark:text-gray-300",
                        children: "Price Range"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                placeholder: "Min",
                                value: filters.minPrice,
                                onChange: (e)=>setFilter("minPrice", e.target.value),
                                className: "w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 dark:text-gray-400",
                                children: "-"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                placeholder: "Max",
                                value: filters.maxPrice,
                                onChange: (e)=>setFilter("maxPrice", e.target.value),
                                className: "w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/filters/filterSlidbar.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-700 dark:text-gray-300",
                        children: "Rating"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: "0",
                        max: "5",
                        step: "0.5",
                        value: filters.rating,
                        onChange: (e)=>setFilter("rating", Number(e.target.value)),
                        className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-600 dark:text-gray-300 font-medium",
                        children: [
                            filters.rating.toFixed(1),
                            "+ Stars"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/filters/filterSlidbar.jsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-700 dark:text-gray-300",
                        children: "Seller"
                    }, void 0, false, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filters.seller,
                        onChange: (e)=>setFilter("seller", e.target.value),
                        className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: "All Sellers"
                            }, void 0, false, {
                                fileName: "[project]/components/filters/filterSlidbar.jsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            sellers.map((seller)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: seller,
                                    children: seller
                                }, seller, false, {
                                    fileName: "[project]/components/filters/filterSlidbar.jsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/filters/filterSlidbar.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/filters/filterSlidbar.jsx",
                lineNumber: 105,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex items-center justify-between cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg font-semibold text-gray-700 dark:text-gray-300",
                            children: "In Stock Only"
                        }, void 0, false, {
                            fileName: "[project]/components/filters/filterSlidbar.jsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: filters.inStock,
                                    onChange: (e)=>setFilter("inStock", e.target.checked),
                                    className: "sr-only"
                                }, void 0, false, {
                                    fileName: "[project]/components/filters/filterSlidbar.jsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/filters/filterSlidbar.jsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${filters.inStock ? "transform translate-x-6 bg-yellow-500" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/components/filters/filterSlidbar.jsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/filters/filterSlidbar.jsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/filters/filterSlidbar.jsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/filters/filterSlidbar.jsx",
                lineNumber: 123,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/filters/filterSlidbar.jsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = FilterSidebar;
}),
"[project]/Hooks/useFilter.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFilter",
    ()=>useFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const useFilter = (products)=>{
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        category: "all",
        minPrice: "",
        maxPrice: "",
        rating: 0,
        seller: "all",
        inStock: false
    });
    const [sortOption, setSortOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("newest");
    const setFilter = (filterName, value)=>{
        setFilters((prevFilters)=>({
                ...prevFilters,
                [filterName]: value
            }));
    };
    const clearFilters = ()=>{
        setFilters({
            category: "all",
            minPrice: "",
            maxPrice: "",
            rating: 0,
            seller: "all",
            inStock: false
        });
        setSortOption("newest");
    };
    const filteredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let filtered = [
            ...products
        ];
        // Filter by category
        if (filters.category !== "all") {
            filtered = filtered.filter((product)=>product.category === filters.category);
        }
        // Filter by price range
        if (filters.minPrice !== "") {
            filtered = filtered.filter((product)=>product.price >= Number(filters.minPrice));
        }
        if (filters.maxPrice !== "") {
            filtered = filtered.filter((product)=>product.price <= Number(filters.maxPrice));
        }
        // Filter by rating
        if (filters.rating > 0) {
            filtered = filtered.filter((product)=>product.rating >= filters.rating);
        }
        // Filter by seller
        if (filters.seller !== "all") {
            filtered = filtered.filter((product)=>product.seller === filters.seller);
        }
        // Filter by availability
        if (filters.inStock) {
            filtered = filtered.filter((product)=>product.stock > 0);
        }
        // Apply sorting
        switch(sortOption){
            case "price-asc":
                filtered.sort((a, b)=>a.price - b.price);
                break;
            case "price-desc":
                filtered.sort((a, b)=>b.price - a.price);
                break;
            case "rating":
                filtered.sort((a, b)=>b.rating - a.rating);
                break;
            case "newest":
                filtered.sort((a, b)=>new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "best-selling":
                filtered.sort((a, b)=>b.sales - a.sales);
                break;
            default:
                break;
        }
        return filtered;
    }, [
        products,
        filters,
        sortOption
    ]);
    return {
        filteredProducts,
        filters,
        setFilter,
        clearFilters,
        sortOption,
        setSortOption
    };
};
}),
"[project]/components/product/ProductPageClient.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductPageClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product/ProductGrid.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/Products.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$filters$2f$filterSlidbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/filters/filterSlidbar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Hooks$2f$useFilter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Hooks/useFilter.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ProductPageClient() {
    const { filteredProducts, filters, setFilter, clearFilters, sortOption, setSortOption } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Hooks$2f$useFilter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFilter"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductsData"]);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex min-h-screen bg-white dark:bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block w-96 flex-shrink-0 sticky top-24 bg-white dark:bg-gray-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$filters$2f$filterSlidbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    filters: filters,
                    setFilter: setFilter,
                    clearFilters: clearFilters,
                    sortOption: sortOption,
                    setSortOption: setSortOption,
                    products: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductsData"]
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductPageClient.jsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/product/ProductPageClient.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden absolute top-0 right-6 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-900 dark:text-white",
                    onClick: toggleMenu,
                    children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 24
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductPageClient.jsx",
                        lineNumber: 44,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                        size: 24
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductPageClient.jsx",
                        lineNumber: 44,
                        columnNumber: 43
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductPageClient.jsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/product/ProductPageClient.jsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden fixed inset-0 z-30 bg-black bg-opacity-10 flex justify-end",
                onClick: toggleMenu,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 p-6 shadow-lg overflow-y-auto",
                    onClick: (e)=>e.stopPropagation(),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$filters$2f$filterSlidbar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        filters: filters,
                        setFilter: setFilter,
                        clearFilters: clearFilters,
                        sortOption: sortOption,
                        setSortOption: setSortOption,
                        products: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductsData"]
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductPageClient.jsx",
                        lineNumber: 58,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductPageClient.jsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/product/ProductPageClient.jsx",
                lineNumber: 50,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 p-6 bg-white dark:bg-gray-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-lg",
                        children: "Loading products..."
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductPageClient.jsx",
                        lineNumber: 73,
                        columnNumber: 13
                    }, void 0),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        products: filteredProducts
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductPageClient.jsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductPageClient.jsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/product/ProductPageClient.jsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/product/ProductPageClient.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_98f125e1._.js.map