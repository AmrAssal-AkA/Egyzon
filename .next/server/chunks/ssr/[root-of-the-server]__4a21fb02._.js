module.exports = [
"[project]/.next-internal/server/app/products/@products/[productId]/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/app/products/not-found.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/products/not-found.jsx [app-rsc] (ecmascript)"));
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
"[project]/components/product/productDetailPage.jsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/product/productDetailPage.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/product/productDetailPage.jsx <module evaluation>", "default");
}),
"[project]/components/product/productDetailPage.jsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/product/productDetailPage.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/product/productDetailPage.jsx", "default");
}),
"[project]/components/product/productDetailPage.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$productDetailPage$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/product/productDetailPage.jsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$productDetailPage$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/product/productDetailPage.jsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$productDetailPage$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/products/[productId]/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/Products.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$productDetailPage$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product/productDetailPage.jsx [app-rsc] (ecmascript)");
;
;
;
;
async function ProductDetailPage({ params }) {
    const { productId } = await params;
    const product = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$Products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductsData"].find((p)=>p.id === productId);
    if (!product) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "md:m-70 mt-40 mb-30",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$productDetailPage$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            product: product
        }, void 0, false, {
            fileName: "[project]/app/products/[productId]/page.jsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/products/[productId]/page.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/products/[productId]/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/products/[productId]/page.jsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a21fb02._.js.map