"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: "3.0.3",
    info: {
        title: "Egyzon API",
        version: "1.0.0",
        description: "Swagger documentation for the Egyzon server routes and endpoints.",
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "Local development server",
        },
    ],
    tags: [
        { name: "Health", description: "Server health and status" },
        { name: "Auth", description: "Authentication and account management" },
        { name: "Products", description: "Product browsing and seller product actions" },
        { name: "Cart", description: "Cart management" },
        { name: "Wishlist", description: "Wishlist management" },
        { name: "Seller", description: "Seller onboarding and store setup" },
        { name: "Categories", description: "Category management" },
        { name: "Customer", description: "Customer account settings" },
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "Access_token",
            },
        },
        schemas: {
            ApiSuccessResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Request completed successfully" },
                    data: { nullable: true },
                },
            },
            ApiErrorResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Something went wrong" },
                    error: {},
                },
            },
            AuthTokens: {
                type: "object",
                properties: {
                    token: { type: "string" },
                    refreshToken: { type: "string" },
                },
            },
            RegisterRequest: {
                type: "object",
                required: ["FirstName", "LastName", "email", "password", "confirmPassword"],
                properties: {
                    FirstName: { type: "string", example: "Ahmed" },
                    LastName: { type: "string", example: "Ali" },
                    email: { type: "string", format: "email", example: "ahmed@example.com" },
                    password: { type: "string", format: "password", example: "password123" },
                    confirmPassword: { type: "string", format: "password", example: "password123" },
                },
            },
            LoginRequest: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email", example: "ahmed@example.com" },
                    password: { type: "string", format: "password", example: "password123" },
                },
            },
            OnboardingRequest: {
                type: "object",
                properties: {
                    phoneNumber: { type: "string", example: "+201001112223" },
                    address: {
                        type: "string",
                        example: "Cairo, Nasr City, Street 10",
                    },
                    userId: { type: "string", example: "66a1f2f3d4c5b6a7c8d9e0f1" },
                },
            },
            ForgetPasswordRequest: {
                type: "object",
                required: ["emailAddress"],
                properties: {
                    emailAddress: { type: "string", format: "email", example: "ahmed@example.com" },
                },
            },
            ResetPasswordRequest: {
                type: "object",
                required: ["newPassword", "confirmNewPassword"],
                properties: {
                    newPassword: { type: "string", format: "password", example: "Password_123" },
                    confirmNewPassword: { type: "string", format: "password", example: "Password_123" },
                },
            },
            ProductItem: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    productName: { type: "string" },
                    productDescription: { type: "string" },
                    price: { type: "number" },
                    discount: { type: "number" },
                    stock: { type: "number" },
                    category: { type: "string" },
                    imageUrl: { type: "string" },
                },
            },
            ProductCreateRequest: {
                type: "object",
                required: ["productName", "productDescription", "price", "category", "stock"],
                properties: {
                    productName: { type: "string", example: "Wireless Headphones" },
                    productDescription: { type: "string", example: "Noise-cancelling over-ear headphones." },
                    price: { type: "number", example: 199.99 },
                    discount: { type: "number", example: 15 },
                    category: { type: "string", example: "electronics" },
                    stock: { type: "number", example: 50 },
                    image: {
                        type: "array",
                        items: { type: "string", format: "binary" },
                    },
                },
            },
            ProductUpdateRequest: {
                type: "object",
                properties: {
                    productName: { type: "string" },
                    productDescription: { type: "string" },
                    price: { type: "number" },
                    discount: { type: "number" },
                    category: { type: "string" },
                    stock: { type: "number" },
                },
            },
            ProductListResponse: {
                type: "object",
                properties: {
                    products: {
                        type: "array",
                        items: { $ref: "#/components/schemas/ProductItem" },
                    },
                    page: { type: "number" },
                    limit: { type: "number" },
                    total: { type: "number" },
                },
            },
            CartItem: {
                type: "object",
                required: ["productId", "quantity", "price"],
                properties: {
                    productId: { type: "string", example: "66a1f2f3d4c5b6a7c8d9e0f1" },
                    quantity: { type: "number", example: 2 },
                    price: { type: "number", example: 299.99 },
                    name: { type: "string", example: "Wireless Headphones" },
                },
            },
            CartCreateRequest: {
                type: "object",
                required: ["items"],
                properties: {
                    items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/CartItem" },
                    },
                },
            },
            WishlistRequest: {
                type: "object",
                required: ["productId"],
                properties: {
                    productId: { type: "string", example: "66a1f2f3d4c5b6a7c8d9e0f1" },
                },
            },
            CategoryCreateRequest: {
                type: "object",
                required: ["name", "description"],
                properties: {
                    name: { type: "string", example: "Electronics" },
                    description: { type: "string", example: "Gadgets, devices, and accessories." },
                    image: { type: "string", format: "binary" },
                },
            },
            SellerApplyRequest: {
                type: "object",
                required: [
                    "storeName",
                    "commercialRegisterNumber",
                    "taxCardNumber",
                    "commercialRegisterImage",
                    "taxCardImage",
                ],
                properties: {
                    storeName: { type: "string", example: "Egyzon Store" },
                    commercialRegisterNumber: { type: "string", example: "CR-123456" },
                    taxCardNumber: { type: "string", example: "TC-987654" },
                    commercialRegisterImage: { type: "string", format: "binary" },
                    taxCardImage: { type: "string", format: "binary" },
                },
            },
            SellerSetupRequest: {
                type: "object",
                required: ["storeDescription", "storeType", "storeLogo", "storeBanner"],
                properties: {
                    storeDescription: { type: "string", example: "Modern curated products for everyday life." },
                    storeType: { type: "string", enum: ["physical", "online", "both"], example: "both" },
                    storephysicalAddress: { type: "string", example: "Downtown Cairo" },
                    storeOnlineAddress: { type: "string", example: "https://store.example.com" },
                    storeLogo: { type: "string", format: "binary" },
                    storeBanner: { type: "string", format: "binary" },
                },
            },
        },
    },
    paths: {
        "/": {
            get: {
                tags: ["Health"],
                summary: "Server health check",
                responses: {
                    200: {
                        description: "Server is running",
                        content: {
                            "text/plain": {
                                schema: { type: "string", example: "egyzon server is running" },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Get current authenticated user profile",
                security: [{ cookieAuth: [] }],
                responses: {
                    200: {
                        description: "User profile retrieved successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    401: { description: "Unauthorized" },
                    404: { description: "User not found" },
                },
            },
        },
        "/api/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/RegisterRequest" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "User created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/AuthTokens" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login and receive auth tokens",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/LoginRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Login successful",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/AuthTokens" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/onBoarding": {
            patch: {
                tags: ["Auth"],
                summary: "Complete customer onboarding / update user profile",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/OnboardingRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Onboarding completed successfully",
                    },
                    400: {
                        description: "User is already onboarded or user is not a customer",
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
        },
        "/api/auth/forget-password": {
            post: {
                tags: ["Auth"],
                summary: "Request a password reset email",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ForgetPasswordRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Reset password email sent successfully",
                    },
                    404: {
                        description: "Email address or user not found",
                    },
                },
            },
        },
        "/api/auth/reset-password": {
            patch: {
                tags: ["Auth"],
                summary: "Reset a password using a recovery token",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
                        },
                    },
                },
                parameters: [
                    {
                        name: "token",
                        in: "query",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Password reset successfully",
                    },
                    400: {
                        description: "Invalid, missing, or expired token",
                    },
                    404: {
                        description: "User or token not found",
                    },
                },
            },
        },
        "/api/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Refresh access token",
                responses: {
                    200: {
                        description: "Token refreshed successfully",
                    },
                },
            },
        },
        "/api/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Logout the current user",
                security: [{ cookieAuth: [] }],
                responses: {
                    200: {
                        description: "Logged out successfully",
                    },
                },
            },
        },
        "/api/auth/verify-email": {
            get: {
                tags: ["Auth"],
                summary: "Verify user email with token",
                security: [{ cookieAuth: [] }],
                parameters: [
                    {
                        name: "token",
                        in: "query",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Email verified successfully",
                    },
                    400: {
                        description: "Invalid or expired token",
                    },
                },
            },
        },
        "/api/auth/continue-with-google": {
            get: {
                tags: ["Auth"],
                summary: "Start Google OAuth sign-in",
                responses: {
                    302: {
                        description: "Redirects to Google authentication",
                    },
                },
            },
        },
        "/api/auth/google/callback": {
            get: {
                tags: ["Auth"],
                summary: "Google OAuth callback",
                responses: {
                    302: {
                        description: "Redirects after successful Google authentication",
                    },
                    401: {
                        description: "Google authentication failed",
                    },
                },
            },
        },
        "/api/product": {
            get: {
                tags: ["Products"],
                summary: "Get all products",
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 10 },
                    },
                ],
                responses: {
                    200: {
                        description: "Products retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/ProductListResponse" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/product/addProduct": {
            post: {
                tags: ["Products"],
                summary: "Create a product",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: { $ref: "#/components/schemas/ProductCreateRequest" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Product created successfully",
                    },
                },
            },
        },
        "/api/product/seller/product/{productId}": {
            patch: {
                tags: ["Products"],
                summary: "Update a seller product / apply discount",
                security: [{ cookieAuth: [] }],
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ProductUpdateRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Discount applied successfully",
                    },
                },
            },
        },
        "/api/product/{productId}": {
            get: {
                tags: ["Products"],
                summary: "Get product details by ID",
                parameters: [
                    {
                        name: "productId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Product retrieved successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Product ID not found",
                    },
                },
            },
        },
        "/api/cart": {
            get: {
                tags: ["Cart"],
                summary: "Get user cart",
                security: [{ cookieAuth: [] }],
                responses: {
                    200: {
                        description: "Cart retrieved successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    401: { description: "Unauthorized" },
                    404: { description: "Cart not found" },
                },
            },
            post: {
                tags: ["Cart"],
                summary: "Create a cart",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CartCreateRequest" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Cart created successfully",
                    },
                },
            },
        },
        "/api/cart/remove": {
            delete: {
                tags: ["Cart"],
                summary: "Remove the current user's cart",
                security: [{ cookieAuth: [] }],
                responses: {
                    200: {
                        description: "Cart removed successfully",
                    },
                    401: { description: "Unauthorized" },
                    404: { description: "Cart not found" },
                },
            },
        },
        "/api/wishlist": {
            get: {
                tags: ["Wishlist"],
                summary: "Get wishlist items",
                security: [{ cookieAuth: [] }],
                responses: {
                    200: {
                        description: "Wishlist retrieved successfully",
                    },
                },
            },
            post: {
                tags: ["Wishlist"],
                summary: "Add product to wishlist",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/WishlistRequest" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Product added to wishlist",
                    },
                },
            },
        },
        "/api/wishlist/remove": {
            delete: {
                tags: ["Wishlist"],
                summary: "Remove product from wishlist",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/WishlistRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Product removed from wishlist",
                    },
                },
            },
        },
        "/api/wishlist/move-to-cart": {
            post: {
                tags: ["Wishlist"],
                summary: "Move product from wishlist to cart",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/WishlistRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Product moved to cart successfully",
                    },
                    400: { description: "Product ID is required" },
                    401: { description: "Unauthorized" },
                },
            },
        },
        "/api/seller/apply": {
            post: {
                tags: ["Seller"],
                summary: "Apply to become a seller",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: { $ref: "#/components/schemas/SellerApplyRequest" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Request to join sent successfully",
                    },
                },
            },
        },
        "/api/seller/setup": {
            post: {
                tags: ["Seller"],
                summary: "Set up a seller store",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: { $ref: "#/components/schemas/SellerSetupRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Store setup successful",
                    },
                },
            },
        },
        "/api/category/addCategory": {
            post: {
                tags: ["Categories"],
                summary: "Create a category",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: { $ref: "#/components/schemas/CategoryCreateRequest" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Category created successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Forbidden",
                    },
                },
            },
        },
        "/api/customer/change-password": {
            put: {
                tags: ["Customer"],
                summary: "Change the current customer's password",
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Password changed successfully",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    400: {
                        description: "Validation failed",
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=swagger.js.map