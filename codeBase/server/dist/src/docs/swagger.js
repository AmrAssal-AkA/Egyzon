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
        {
            name: "Products",
            description: "Product browsing and seller product actions",
        },
        { name: "Cart", description: "Cart management" },
        { name: "Orders", description: "Order placement" },
        { name: "Wishlist", description: "Wishlist management" },
        { name: "Seller", description: "Seller onboarding and store setup" },
        { name: "Categories", description: "Category management" },
        { name: "Customer", description: "Customer account settings" },
        { name: "Admin", description: "Admin login and seller application review" },
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "Access_token",
            },
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            ApiSuccessResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    message: {
                        type: "string",
                        example: "Request completed successfully",
                    },
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
            RefreshResponseData: {
                type: "object",
                properties: {
                    accessToken: { type: "string" },
                },
            },
            OnboardingResponseData: {
                type: "object",
                properties: {
                    customerId: { type: "string" },
                    phoneNumber: { type: "string" },
                    address: { type: "string" },
                },
            },
            OrderAddress: {
                type: "object",
                required: ["address1", "city", "state", "postalCode", "country"],
                properties: {
                    address1: { type: "string", example: "12 Nile Street" },
                    address2: { type: "string", example: "Apartment 4B" },
                    city: { type: "string", example: "Cairo" },
                    state: { type: "string", example: "Cairo Governorate" },
                    postalCode: { type: "string", example: "11511" },
                    country: { type: "string", example: "Egypt" },
                },
            },
            VerifyEmailResponseData: {
                type: "object",
                properties: {
                    isVerified: { type: "boolean" },
                },
            },
            ForgetPasswordResponseData: {
                type: "object",
                properties: {
                    token: { type: "string" },
                },
            },
            RegisterRequest: {
                type: "object",
                required: ["FirstName", "LastName", "email", "password"],
                properties: {
                    FirstName: { type: "string", example: "Ahmed" },
                    LastName: { type: "string", example: "Ali" },
                    email: {
                        type: "string",
                        format: "email",
                        example: "ahmed@example.com",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        example: "Password123",
                    },
                },
            },
            LoginRequest: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                        example: "ahmed@example.com",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        example: "password123",
                    },
                },
            },
            AdminLoginRequest: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                        example: "admin@egyzon.com",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        example: "AdminPassword123",
                    },
                },
            },
            UserSummary: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    FirstName: { type: "string" },
                    LastName: { type: "string" },
                    email: { type: "string", format: "email" },
                    role: { type: "string", enum: ["customer", "seller", "admin"] },
                    isBlocked: { type: "boolean" },
                },
            },
            OnboardingRequest: {
                type: "object",
                properties: {
                    FirstName: { type: "string", example: "Ahmed" },
                    LastName: { type: "string", example: "Ali" },
                    email: {
                        type: "string",
                        format: "email",
                        example: "ahmed@example.com",
                    },
                    phoneNumber: { type: "string", example: "+201001112223" },
                    address: {
                        type: "string",
                        example: "Cairo, Nasr City, Street 10",
                    },
                },
            },
            ForgetPasswordRequest: {
                type: "object",
                required: ["emailAddress"],
                properties: {
                    emailAddress: {
                        type: "string",
                        format: "email",
                        example: "ahmed@example.com",
                    },
                },
            },
            ResetPasswordRequest: {
                type: "object",
                required: ["newPassword", "confirmNewPassword"],
                properties: {
                    newPassword: {
                        type: "string",
                        format: "password",
                        example: "Password_123",
                    },
                    confirmNewPassword: {
                        type: "string",
                        format: "password",
                        example: "Password_123",
                    },
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
                required: [
                    "productName",
                    "productDescription",
                    "price",
                    "category",
                    "stock",
                ],
                properties: {
                    productName: { type: "string", example: "Wireless Headphones" },
                    productDescription: {
                        type: "string",
                        example: "Noise-cancelling over-ear headphones.",
                    },
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
                required: ["discount"],
                properties: {
                    discount: { type: "number", minimum: 0, maximum: 100, example: 15 },
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
            SellerProductListResponse: {
                type: "array",
                items: { $ref: "#/components/schemas/ProductItem" },
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
            CartResponse: {
                type: "object",
                properties: {
                    cartId: { type: "string" },
                    userId: { type: "string" },
                    userCartKey: { type: "string" },
                    items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/CartItem" },
                    },
                    totalPrice: { type: "number" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            OrderRequest: {
                type: "object",
                required: ["shippingAddress", "paymentMethod", "Address"],
                properties: {
                    shippingAddress: {
                        type: "string",
                        example: "Cairo, Nasr City, Street 10",
                    },
                    paymentMethod: {
                        type: "string",
                        enum: ["cashOnDelivery", "creditCard"],
                        example: "cashOnDelivery",
                    },
                    notes: {
                        type: "string",
                        example: "Leave the package at the front desk.",
                    },
                    Address: { $ref: "#/components/schemas/OrderAddress" },
                    phoneNumber: {
                        type: "string",
                        example: "+201001112223",
                    },
                },
            },
            OrderItem: {
                type: "object",
                properties: {
                    product: { type: "string" },
                    quantity: { type: "number" },
                    unitPrice: { type: "number" },
                    subtotal: { type: "number" },
                },
            },
            OrderResponse: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    orderNumber: { type: "string" },
                    customer: { type: "string" },
                    orderDate: { type: "string", format: "date-time" },
                    orderStatus: {
                        type: "string",
                        enum: [
                            "pending",
                            "processing",
                            "shipped",
                            "delivered",
                            "cancelled",
                        ],
                    },
                    subTotal: { type: "number" },
                    discount: { type: "number" },
                    shippingFee: { type: "number" },
                    taxAmount: { type: "number" },
                    totalAmount: { type: "number" },
                    paymentStatus: {
                        type: "string",
                        enum: ["pending", "paid", "failed", "refunded"],
                    },
                    paymentMethod: {
                        type: "object",
                        properties: {
                            method: {
                                type: "string",
                                enum: ["cashOnDelivery", "creditCard"],
                            },
                            details: { type: "string" },
                        },
                    },
                    notes: { type: "string" },
                    orderItems: {
                        type: "array",
                        items: { $ref: "#/components/schemas/OrderItem" },
                    },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
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
                required: ["description", "image"],
                properties: {
                    categoryName: { type: "string", example: "Electronics" },
                    name: { type: "string", example: "Electronics" },
                    description: {
                        type: "string",
                        example: "Gadgets, devices, and accessories.",
                    },
                    image: { type: "string", format: "binary" },
                },
                anyOf: [{ required: ["categoryName"] }, { required: ["name"] }],
            },
            AddProductToCategoryRequest: {
                type: "object",
                required: ["categoryId", "productId"],
                properties: {
                    categoryId: { type: "string", example: "66a1f2f3d4c5b6a7c8d9e0f1" },
                    productId: { type: "string", example: "66a1f2f3d4c5b6a7c8d9e0f2" },
                },
            },
            CategoryItem: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    categoryName: { type: "string", example: "Electronics" },
                    description: {
                        type: "string",
                        example: "Gadgets, devices, and accessories.",
                    },
                    imageUrl: {
                        type: "string",
                        example: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                    },
                    Products: {
                        type: "array",
                        items: { type: "string" },
                    },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            CategoryListResponse: {
                type: "array",
                items: { $ref: "#/components/schemas/CategoryItem" },
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
                    storeDescription: {
                        type: "string",
                        example: "Modern curated products for everyday life.",
                    },
                    storeType: {
                        type: "string",
                        enum: ["physical", "online", "both"],
                        example: "both",
                    },
                    storephysicalAddress: { type: "string", example: "Downtown Cairo" },
                    storeOnlineAddress: {
                        type: "string",
                        example: "https://store.example.com",
                    },
                    storeLogo: { type: "string", format: "binary" },
                    storeBanner: { type: "string", format: "binary" },
                },
            },
            SellerTotalProductsResponse: {
                type: "object",
                properties: {
                    totalProductCounts: { type: "number", example: 12 },
                },
            },
            SellerTotalOrdersResponse: {
                type: "object",
                properties: {
                    totalOrders: { type: "number", example: 48 },
                },
            },
            SellerRevenueResponse: {
                type: "object",
                properties: {
                    totalRevenue: { type: "number", example: 12500 },
                    revenueAfterPlatformFee: { type: "number", example: 11250 },
                },
            },
            SellerTopSellingProductItem: {
                type: "object",
                properties: {
                    productId: { type: "string" },
                    revenue: { type: "number", example: 2500 },
                },
            },
            SellerTopSellingProductsResponse: {
                type: "array",
                items: { $ref: "#/components/schemas/SellerTopSellingProductItem" },
            },
            SellerOrderListResponse: {
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: true,
                },
            },
            SellerInventoryValueResponse: {
                type: "object",
                properties: {
                    totalInventoryValue: { type: "number", example: 18500 },
                },
            },
            PlatformFeeResponse: {
                type: "object",
                properties: {
                    PlatformFeePercentage: { type: "number", example: 10 },
                    updatedBy: { type: "string" },
                    updateAt: { type: "string", format: "date-time" },
                },
            },
            SetPlatformFeeRequest: {
                type: "object",
                required: ["feePercentage"],
                properties: {
                    feePercentage: { type: "number", example: 10 },
                },
            },
            AdminAdditionalDocumentsRequest: {
                type: "object",
                required: ["message"],
                properties: {
                    message: {
                        type: "string",
                        example: "Please upload a clearer tax card image and add your business address.",
                    },
                },
            },
            SellerApplicationSummary: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    commercialRegisterNumber: { type: "string" },
                    taxCardNumber: { type: "string" },
                    storeName: { type: "string" },
                    applicantStatus: {
                        type: "string",
                        enum: [
                            "pending",
                            "under-review",
                            "additional_docs_requested",
                            "approved",
                            "rejected",
                        ],
                    },
                    notes: { type: "string" },
                    user: {
                        type: "object",
                        properties: {
                            _id: { type: "string" },
                            FirstName: { type: "string" },
                            LastName: { type: "string" },
                            email: { type: "string", format: "email" },
                        },
                    },
                },
            },
            SellerApplicationListResponse: {
                type: "array",
                items: { $ref: "#/components/schemas/SellerApplicationSummary" },
            },
            AdminSellerSummary: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    commercialRegisterNumber: { type: "string" },
                    taxCardNumber: { type: "string" },
                    storeName: { type: "string" },
                    applicantStatus: {
                        type: "string",
                        enum: [
                            "pending",
                            "under-review",
                            "additional_docs_requested",
                            "approved",
                            "rejected",
                        ],
                    },
                    notes: { type: "string" },
                    storeManagement: {
                        type: "object",
                        properties: {
                            storeLogo: { type: "string" },
                            storeBanner: { type: "string" },
                            storeDescription: { type: "string" },
                            storeType: {
                                type: "string",
                                enum: ["physical", "online", "both"],
                            },
                            storephysicalAddress: { type: "string" },
                            storeOnlineAddress: { type: "string" },
                        },
                    },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            AdminSellerListResponse: {
                type: "object",
                properties: {
                    sellers: {
                        type: "array",
                        items: { $ref: "#/components/schemas/AdminSellerSummary" },
                    },
                    pagination: {
                        type: "object",
                        properties: {
                            page: { type: "integer", example: 1 },
                            limit: { type: "integer", example: 10 },
                            total: { type: "integer", example: 42 },
                            totalPages: { type: "integer", example: 5 },
                        },
                    },
                },
            },
            AdminUserListResponse: {
                type: "array",
                items: { $ref: "#/components/schemas/UserSummary" },
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
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "User profile retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/UserSummary" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
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
                    409: {
                        description: "User already exists",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    500: {
                        description: "Internal Server Error",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
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
                    400: {
                        description: "Account registered with Google",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Invalid password",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Account has been blocked",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
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
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/OnboardingResponseData",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "User is already onboarded or user is not a customer",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
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
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/ForgetPasswordResponseData",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    404: {
                        description: "Email address or user not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Invalid, missing, or expired token",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User or token not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Refresh access token using refresh_token cookie",
                security: [{ cookieAuth: [] }],
                responses: {
                    200: {
                        description: "Token refreshed successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/RefreshResponseData",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    403: {
                        description: "Invalid refresh token",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Refresh token not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Logout the current user",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Logged out successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/verify-email": {
            get: {
                tags: ["Auth"],
                summary: "Verify user email with token",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/VerifyEmailResponseData",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "Invalid or expired token",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/product": {
            get: {
                tags: ["Products"],
                summary: "Get all products with pagination",
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        required: false,
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "limit",
                        in: "query",
                        required: false,
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
                                                data: {
                                                    $ref: "#/components/schemas/ProductListResponse",
                                                },
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
                summary: "Create a product (Seller only)",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Image file required or upload failed",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/product/seller/product/{productId}": {
            patch: {
                tags: ["Products"],
                summary: "Apply a discount to a seller product",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        description: "Product updated / discount applied successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["Products"],
                summary: "Delete a seller product",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        description: "Product deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/ProductItem" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Unauthorized to delete this product",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Product not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
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
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/ProductItem" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "Product ID not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Product not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/product/seller/products": {
            get: {
                tags: ["Products"],
                summary: "Get the authenticated seller's products",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Seller products retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerProductListResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/cart": {
            get: {
                tags: ["Cart"],
                summary: "Get user cart",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Cart retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/CartResponse" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Cart not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Cart"],
                summary: "Create a cart",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/CartResponse" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "Items are required and should be a non-empty array",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    409: {
                        description: "Cart already exists for this user",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/cart/remove": {
            delete: {
                tags: ["Cart"],
                summary: "Remove the current user's cart",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Cart removed successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Cart not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/wishlist": {
            get: {
                tags: ["Wishlist"],
                summary: "Get wishlist items",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Wishlist retrieved successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Wishlist"],
                summary: "Add product to wishlist",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Product ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/wishlist/remove": {
            delete: {
                tags: ["Wishlist"],
                summary: "Remove product from wishlist",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Product ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/wishlist/move-to-cart": {
            post: {
                tags: ["Wishlist"],
                summary: "Move product from wishlist to cart",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Product ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/apply": {
            post: {
                tags: ["Seller"],
                summary: "Apply to become a seller",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
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
                                    commercialRegisterNumber: {
                                        type: "string",
                                        example: "CR-123456",
                                    },
                                    taxCardNumber: { type: "string", example: "TC-987654" },
                                    commercialRegisterImage: { type: "string", format: "binary" },
                                    taxCardImage: { type: "string", format: "binary" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Request sent successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "All fields and images are required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/setup": {
            post: {
                tags: ["Seller"],
                summary: "Set up a seller store",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                required: [
                                    "storeDescription",
                                    "storeType",
                                    "storeLogo",
                                    "storeBanner",
                                ],
                                properties: {
                                    storeDescription: {
                                        type: "string",
                                        example: "Modern curated products for everyday life.",
                                    },
                                    storeType: {
                                        type: "string",
                                        enum: ["physical", "online", "both"],
                                        example: "both",
                                    },
                                    storephysicalAddress: {
                                        type: "string",
                                        example: "Downtown Cairo",
                                    },
                                    storeOnlineAddress: {
                                        type: "string",
                                        example: "https://store.example.com",
                                    },
                                    storeLogo: { type: "string", format: "binary" },
                                    storeBanner: { type: "string", format: "binary" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Store setup successful",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Bad request or missing required fields",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/total-products": {
            get: {
                tags: ["Seller"],
                summary: "Get the authenticated seller's total product count",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Total products fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerTotalProductsResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/total-orders": {
            get: {
                tags: ["Seller"],
                summary: "Get the authenticated seller's total order count",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Total orders fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerTotalOrdersResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/total-revenue": {
            get: {
                tags: ["Seller"],
                summary: "Get the authenticated seller's revenue summary",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Total revenue fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerRevenueResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/total-selling-product": {
            get: {
                tags: ["Seller"],
                summary: "Get the authenticated seller's top selling products",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Top selling products fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerTopSellingProductsResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/getAllOrders": {
            get: {
                tags: ["Seller"],
                summary: "Get all orders containing the authenticated seller's products",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "All orders fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerOrderListResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/seller/totalInventoryValue": {
            get: {
                tags: ["Seller"],
                summary: "Get the authenticated seller's total inventory value",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Total inventory value fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerInventoryValueResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/category/addCategory": {
            post: {
                tags: ["Categories"],
                summary: "Create a category",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Category name, description, and image are required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/category/getAllCategories": {
            get: {
                tags: ["Categories"],
                summary: "List all categories",
                responses: {
                    200: {
                        description: "Categories retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/CategoryListResponse",
                                                },
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
        "/api/category/getProductsByCategory/{categoryId}": {
            get: {
                tags: ["Categories"],
                summary: "Get products in a category",
                parameters: [
                    {
                        name: "categoryId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Products fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    type: "array",
                                                    items: { $ref: "#/components/schemas/ProductItem" },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "Category ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Category not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/category/addProductToCategory": {
            post: {
                tags: ["Categories"],
                summary: "Attach an existing product to a category",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AddProductToCategoryRequest",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Product added to category successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/CategoryItem" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "Category ID and Product ID are required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Category or product not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/setPlatformFee": {
            post: {
                tags: ["Admin"],
                summary: "Set the platform fee percentage",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/SetPlatformFeeRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Platform fee updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/PlatformFeeResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "Invalid or missing fee percentage",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Admin not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/getPlatformFee": {
            get: {
                tags: ["Admin"],
                summary: "Get the current platform fee configuration",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Platform fee retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/PlatformFeeResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Platform configuration not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/customer/change-password": {
            put: {
                tags: ["Customer"],
                summary: "Change the current customer's password",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
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
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Validation failed or passwords do not match",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/order/placeOrder": {
            post: {
                tags: ["Orders"],
                summary: "Place a new order from the current customer's cart",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/OrderRequest" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Order placed successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: { $ref: "#/components/schemas/OrderResponse" },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    400: {
                        description: "Cart is empty or request validation failed",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "Product not found while placing order",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/login": {
            post: {
                tags: ["Admin"],
                summary: "Login as an admin",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AdminLoginRequest" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Admin logged in successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Invalid email or password",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Access denied",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/user": {
            get: {
                tags: ["Admin"],
                summary: "List all users",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Users retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/AdminUserListResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/promoteUserToAdmin/{userId}": {
            patch: {
                tags: ["Admin"],
                summary: "Promote a customer or seller to admin",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "User promoted to admin successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "User ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/BlockTheUser/{userId}": {
            patch: {
                tags: ["Admin"],
                summary: "Block a user",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "User blocked successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "User ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/acivateUser/{userId}": {
            patch: {
                tags: ["Admin"],
                summary: "Activate a user",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "User activated successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "User ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/seller-applications/pending": {
            get: {
                tags: ["Admin"],
                summary: "List pending seller applications",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Pending seller applications retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/SellerApplicationListResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/allSellers": {
            get: {
                tags: ["Admin"],
                summary: "List all sellers with pagination",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        required: false,
                        schema: { type: "integer", minimum: 1, default: 1 },
                    },
                    {
                        name: "limit",
                        in: "query",
                        required: false,
                        schema: { type: "integer", minimum: 1, default: 10 },
                    },
                ],
                responses: {
                    200: {
                        description: "Sellers retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    allOf: [
                                        { $ref: "#/components/schemas/ApiSuccessResponse" },
                                        {
                                            type: "object",
                                            properties: {
                                                data: {
                                                    $ref: "#/components/schemas/AdminSellerListResponse",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/seller-applications/{sellerId}/approve": {
            post: {
                tags: ["Admin"],
                summary: "Approve a seller application",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                parameters: [
                    {
                        name: "sellerId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Seller approved successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Seller ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found or no pending application found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/seller-applications/{sellerId}/request-additional-documents": {
            post: {
                tags: ["Admin"],
                summary: "Request additional documents from a seller",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                parameters: [
                    {
                        name: "sellerId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AdminAdditionalDocumentsRequest",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Request for additional documents sent successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Seller ID or message is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "No pending seller application found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/seller-applications/{sellerId}/reject": {
            post: {
                tags: ["Admin"],
                summary: "Reject a seller application",
                security: [{ cookieAuth: [] }, { bearerAuth: [] }],
                parameters: [
                    {
                        name: "sellerId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Seller rejected successfully",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiSuccessResponse" },
                            },
                        },
                    },
                    400: {
                        description: "Seller ID is required",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    403: {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                    404: {
                        description: "User not found or no pending application found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
                            },
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=swagger.js.map