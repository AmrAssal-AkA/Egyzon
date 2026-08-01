export declare const swaggerSpec: {
    readonly openapi: "3.0.3";
    readonly info: {
        readonly title: "Egyzon API";
        readonly version: "1.0.0";
        readonly description: "Swagger documentation for the Egyzon server routes and endpoints.";
    };
    readonly servers: readonly [{
        readonly url: "http://localhost:3000";
        readonly description: "Local development server";
    }];
    readonly tags: readonly [{
        readonly name: "Health";
        readonly description: "Server health and status";
    }, {
        readonly name: "Auth";
        readonly description: "Authentication and account management";
    }, {
        readonly name: "Products";
        readonly description: "Product browsing and seller product actions";
    }, {
        readonly name: "Cart";
        readonly description: "Cart creation";
    }, {
        readonly name: "Wishlist";
        readonly description: "Wishlist management";
    }, {
        readonly name: "Seller";
        readonly description: "Seller onboarding and store setup";
    }];
    readonly components: {
        readonly securitySchemes: {
            readonly cookieAuth: {
                readonly type: "apiKey";
                readonly in: "cookie";
                readonly name: "Access_token";
            };
        };
        readonly schemas: {
            readonly ApiSuccessResponse: {
                readonly type: "object";
                readonly properties: {
                    readonly success: {
                        readonly type: "boolean";
                        readonly example: true;
                    };
                    readonly message: {
                        readonly type: "string";
                        readonly example: "Request completed successfully";
                    };
                    readonly data: {
                        readonly nullable: true;
                    };
                };
            };
            readonly ApiErrorResponse: {
                readonly type: "object";
                readonly properties: {
                    readonly success: {
                        readonly type: "boolean";
                        readonly example: false;
                    };
                    readonly message: {
                        readonly type: "string";
                        readonly example: "Something went wrong";
                    };
                    readonly error: {};
                };
            };
            readonly AuthTokens: {
                readonly type: "object";
                readonly properties: {
                    readonly token: {
                        readonly type: "string";
                    };
                    readonly refreshToken: {
                        readonly type: "string";
                    };
                };
            };
            readonly RegisterRequest: {
                readonly type: "object";
                readonly required: readonly ["FirstName", "LastName", "email", "password"];
                readonly properties: {
                    readonly FirstName: {
                        readonly type: "string";
                        readonly example: "Ahmed";
                    };
                    readonly LastName: {
                        readonly type: "string";
                        readonly example: "Ali";
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                        readonly example: "ahmed@example.com";
                    };
                    readonly password: {
                        readonly type: "string";
                        readonly format: "password";
                        readonly example: "password123";
                    };
                };
            };
            readonly LoginRequest: {
                readonly type: "object";
                readonly required: readonly ["email", "password"];
                readonly properties: {
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                        readonly example: "ahmed@example.com";
                    };
                    readonly password: {
                        readonly type: "string";
                        readonly format: "password";
                        readonly example: "password123";
                    };
                };
            };
            readonly OnboardingRequest: {
                readonly type: "object";
                readonly properties: {
                    readonly phoneNumber: {
                        readonly type: "string";
                        readonly example: "+201001112223";
                    };
                    readonly address: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                        readonly example: readonly ["Cairo", "Nasr City", "Street 10"];
                    };
                    readonly isBlocked: {
                        readonly type: "boolean";
                    };
                };
            };
            readonly ProductItem: {
                readonly type: "object";
                readonly properties: {
                    readonly productName: {
                        readonly type: "string";
                    };
                    readonly productDescription: {
                        readonly type: "string";
                    };
                    readonly price: {
                        readonly type: "number";
                    };
                    readonly discount: {
                        readonly type: "number";
                    };
                    readonly stock: {
                        readonly type: "number";
                    };
                    readonly category: {
                        readonly type: "string";
                    };
                    readonly imageUrl: {
                        readonly type: "string";
                    };
                };
            };
            readonly ProductCreateRequest: {
                readonly type: "object";
                readonly required: readonly ["productName", "productDescription", "price", "category", "stock"];
                readonly properties: {
                    readonly productName: {
                        readonly type: "string";
                        readonly example: "Wireless Headphones";
                    };
                    readonly productDescription: {
                        readonly type: "string";
                        readonly example: "Noise-cancelling over-ear headphones.";
                    };
                    readonly price: {
                        readonly type: "number";
                        readonly example: 199.99;
                    };
                    readonly discount: {
                        readonly type: "number";
                        readonly example: 15;
                    };
                    readonly category: {
                        readonly type: "string";
                        readonly example: "electronics";
                    };
                    readonly stock: {
                        readonly type: "number";
                        readonly example: 50;
                    };
                    readonly image: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly format: "binary";
                        };
                    };
                };
            };
            readonly ProductUpdateRequest: {
                readonly type: "object";
                readonly properties: {
                    readonly productName: {
                        readonly type: "string";
                    };
                    readonly productDescription: {
                        readonly type: "string";
                    };
                    readonly price: {
                        readonly type: "number";
                    };
                    readonly discount: {
                        readonly type: "number";
                    };
                    readonly category: {
                        readonly type: "string";
                    };
                    readonly stock: {
                        readonly type: "number";
                    };
                };
            };
            readonly ProductListResponse: {
                readonly type: "object";
                readonly properties: {
                    readonly products: {
                        readonly type: "array";
                        readonly items: {
                            readonly $ref: "#/components/schemas/ProductItem";
                        };
                    };
                    readonly page: {
                        readonly type: "number";
                    };
                    readonly limit: {
                        readonly type: "number";
                    };
                    readonly total: {
                        readonly type: "number";
                    };
                };
            };
            readonly CartItem: {
                readonly type: "object";
                readonly required: readonly ["productId", "quantity", "price"];
                readonly properties: {
                    readonly productId: {
                        readonly type: "string";
                        readonly example: "66a1f2f3d4c5b6a7c8d9e0f1";
                    };
                    readonly quantity: {
                        readonly type: "number";
                        readonly example: 2;
                    };
                    readonly price: {
                        readonly type: "number";
                        readonly example: 299.99;
                    };
                };
            };
            readonly CartCreateRequest: {
                readonly type: "object";
                readonly required: readonly ["items"];
                readonly properties: {
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly $ref: "#/components/schemas/CartItem";
                        };
                    };
                };
            };
            readonly WishlistRequest: {
                readonly type: "object";
                readonly properties: {
                    readonly productId: {
                        readonly type: "string";
                        readonly example: "66a1f2f3d4c5b6a7c8d9e0f1";
                    };
                };
            };
            readonly SellerApplyRequest: {
                readonly type: "object";
                readonly required: readonly ["storeName", "commercialRegisterNumber", "taxCardNumber", "contary", "commercialRegisterImage", "taxCardImage"];
                readonly properties: {
                    readonly storeName: {
                        readonly type: "string";
                        readonly example: "Egyzon Store";
                    };
                    readonly commercialRegisterNumber: {
                        readonly type: "string";
                        readonly example: "CR-123456";
                    };
                    readonly taxCardNumber: {
                        readonly type: "string";
                        readonly example: "TC-987654";
                    };
                    readonly contary: {
                        readonly type: "string";
                        readonly example: "Egypt";
                    };
                    readonly commercialRegisterImage: {
                        readonly type: "string";
                        readonly format: "binary";
                    };
                    readonly taxCardImage: {
                        readonly type: "string";
                        readonly format: "binary";
                    };
                };
            };
            readonly SellerSetupRequest: {
                readonly type: "object";
                readonly required: readonly ["storeDescription", "storeType", "storephysicalAddress", "storeOnlineAddress", "storeLogo"];
                readonly properties: {
                    readonly storeDescription: {
                        readonly type: "string";
                        readonly example: "Modern curated products for everyday life.";
                    };
                    readonly storeType: {
                        readonly type: "string";
                        readonly enum: readonly ["physical", "online", "both"];
                        readonly example: "both";
                    };
                    readonly storephysicalAddress: {
                        readonly type: "string";
                        readonly example: "Downtown Cairo";
                    };
                    readonly storeOnlineAddress: {
                        readonly type: "string";
                        readonly example: "https://store.example.com";
                    };
                    readonly storeLogo: {
                        readonly type: "string";
                        readonly format: "binary";
                    };
                    readonly storeBanner: {
                        readonly type: "string";
                        readonly format: "binary";
                    };
                };
            };
        };
    };
    readonly paths: {
        readonly "/": {
            readonly get: {
                readonly tags: readonly ["Health"];
                readonly summary: "Server health check";
                readonly responses: {
                    readonly 200: {
                        readonly description: "Server is running";
                        readonly content: {
                            readonly "text/plain": {
                                readonly schema: {
                                    readonly type: "string";
                                    readonly example: "egyzon server is running";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/register": {
            readonly post: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Register a new user";
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/RegisterRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 201: {
                        readonly description: "User created successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/AuthTokens";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/login": {
            readonly post: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Login and receive auth tokens";
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/LoginRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Login successful";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/AuthTokens";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/onBoarding": {
            readonly patch: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Complete customer onboarding";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/OnboardingRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Onboarding completed successfully";
                    };
                };
            };
        };
        readonly "/api/auth/refresh": {
            readonly post: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Refresh access token";
                readonly responses: {
                    readonly 200: {
                        readonly description: "Token refreshed successfully";
                    };
                };
            };
        };
        readonly "/api/auth/logout": {
            readonly post: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Logout the current user";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Logged out successfully";
                    };
                };
            };
        };
        readonly "/api/auth/verify-email": {
            readonly get: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Verify user email with token";
                readonly parameters: readonly [{
                    readonly name: "token";
                    readonly in: "query";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Email verified successfully";
                    };
                };
            };
        };
        readonly "/api/product": {
            readonly get: {
                readonly tags: readonly ["Products"];
                readonly summary: "Get all products";
                readonly parameters: readonly [{
                    readonly name: "page";
                    readonly in: "query";
                    readonly schema: {
                        readonly type: "number";
                        readonly default: 1;
                    };
                }, {
                    readonly name: "limit";
                    readonly in: "query";
                    readonly schema: {
                        readonly type: "number";
                        readonly default: 10;
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Products retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/ProductListResponse";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/product/addProduct": {
            readonly post: {
                readonly tags: readonly ["Products"];
                readonly summary: "Create a product";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "multipart/form-data": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/ProductCreateRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 201: {
                        readonly description: "Product created successfully";
                    };
                };
            };
        };
        readonly "/api/product/seller/product/{productId}": {
            readonly patch: {
                readonly tags: readonly ["Products"];
                readonly summary: "Update a seller product";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "productId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/ProductUpdateRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Discount applied successfully";
                    };
                };
            };
        };
        readonly "/api/cart": {
            readonly post: {
                readonly tags: readonly ["Cart"];
                readonly summary: "Create a cart";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/CartCreateRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 201: {
                        readonly description: "Cart created successfully";
                    };
                };
            };
        };
        readonly "/api/wishlist": {
            readonly get: {
                readonly tags: readonly ["Wishlist"];
                readonly summary: "Get wishlist items";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Wishlist retrieved successfully";
                    };
                };
            };
            readonly post: {
                readonly tags: readonly ["Wishlist"];
                readonly summary: "Add product to wishlist";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/WishlistRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 201: {
                        readonly description: "Product added to wishlist";
                    };
                };
            };
        };
        readonly "/api/wishlist/remove": {
            readonly delete: {
                readonly tags: readonly ["Wishlist"];
                readonly summary: "Remove product from wishlist";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/WishlistRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Product removed from wishlist";
                    };
                };
            };
        };
        readonly "/api/seller/apply": {
            readonly post: {
                readonly tags: readonly ["Seller"];
                readonly summary: "Apply to become a seller";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "multipart/form-data": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/SellerApplyRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 201: {
                        readonly description: "Request to join sent successfully";
                    };
                };
            };
        };
        readonly "/api/seller/setup": {
            readonly post: {
                readonly tags: readonly ["Seller"];
                readonly summary: "Set up a seller store";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "multipart/form-data": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/SellerSetupRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Store setup successful";
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=swagger.d.ts.map