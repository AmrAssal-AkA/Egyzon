export declare const swaggerSpec: {
    readonly openapi: "3.0.3";
    readonly info: {
        readonly title: "Egyzon API";
        readonly version: "1.0.0";
        readonly description: "Swagger documentation for the Egyzon server routes and endpoints.";
    };
    readonly servers: readonly [{
        readonly url: "http://localhost:8080";
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
        readonly description: "Cart management";
    }, {
        readonly name: "Wishlist";
        readonly description: "Wishlist management";
    }, {
        readonly name: "Seller";
        readonly description: "Seller onboarding and store setup";
    }, {
        readonly name: "Categories";
        readonly description: "Category management";
    }, {
        readonly name: "Customer";
        readonly description: "Customer account settings";
    }, {
        readonly name: "Admin";
        readonly description: "Admin login and seller application review";
    }];
    readonly components: {
        readonly securitySchemes: {
            readonly cookieAuth: {
                readonly type: "apiKey";
                readonly in: "cookie";
                readonly name: "Access_token";
            };
            readonly bearerAuth: {
                readonly type: "http";
                readonly scheme: "bearer";
                readonly bearerFormat: "JWT";
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
            readonly RefreshResponseData: {
                readonly type: "object";
                readonly properties: {
                    readonly accessToken: {
                        readonly type: "string";
                    };
                };
            };
            readonly OnboardingResponseData: {
                readonly type: "object";
                readonly properties: {
                    readonly customerId: {
                        readonly type: "string";
                    };
                    readonly phoneNumber: {
                        readonly type: "string";
                    };
                    readonly address: {
                        readonly type: "string";
                    };
                };
            };
            readonly VerifyEmailResponseData: {
                readonly type: "object";
                readonly properties: {
                    readonly isVerified: {
                        readonly type: "boolean";
                    };
                };
            };
            readonly ForgetPasswordResponseData: {
                readonly type: "object";
                readonly properties: {
                    readonly token: {
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
                        readonly example: "Password123";
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
            readonly AdminLoginRequest: {
                readonly type: "object";
                readonly required: readonly ["email", "password"];
                readonly properties: {
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                        readonly example: "admin@egyzon.com";
                    };
                    readonly password: {
                        readonly type: "string";
                        readonly format: "password";
                        readonly example: "AdminPassword123";
                    };
                };
            };
            readonly UserSummary: {
                readonly type: "object";
                readonly properties: {
                    readonly _id: {
                        readonly type: "string";
                    };
                    readonly FirstName: {
                        readonly type: "string";
                    };
                    readonly LastName: {
                        readonly type: "string";
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                    };
                    readonly role: {
                        readonly type: "string";
                        readonly enum: readonly ["customer", "seller", "admin"];
                    };
                    readonly isBlocked: {
                        readonly type: "boolean";
                    };
                };
            };
            readonly OnboardingRequest: {
                readonly type: "object";
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
                    readonly phoneNumber: {
                        readonly type: "string";
                        readonly example: "+201001112223";
                    };
                    readonly address: {
                        readonly type: "string";
                        readonly example: "Cairo, Nasr City, Street 10";
                    };
                };
            };
            readonly ForgetPasswordRequest: {
                readonly type: "object";
                readonly required: readonly ["emailAddress"];
                readonly properties: {
                    readonly emailAddress: {
                        readonly type: "string";
                        readonly format: "email";
                        readonly example: "ahmed@example.com";
                    };
                };
            };
            readonly ResetPasswordRequest: {
                readonly type: "object";
                readonly required: readonly ["newPassword", "confirmNewPassword"];
                readonly properties: {
                    readonly newPassword: {
                        readonly type: "string";
                        readonly format: "password";
                        readonly example: "Password_123";
                    };
                    readonly confirmNewPassword: {
                        readonly type: "string";
                        readonly format: "password";
                        readonly example: "Password_123";
                    };
                };
            };
            readonly ProductItem: {
                readonly type: "object";
                readonly properties: {
                    readonly _id: {
                        readonly type: "string";
                    };
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
                    readonly discount: {
                        readonly type: "number";
                    };
                    readonly productName: {
                        readonly type: "string";
                    };
                    readonly productDescription: {
                        readonly type: "string";
                    };
                    readonly price: {
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
                    readonly name: {
                        readonly type: "string";
                        readonly example: "Wireless Headphones";
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
            readonly CartResponse: {
                readonly type: "object";
                readonly properties: {
                    readonly cartId: {
                        readonly type: "string";
                    };
                    readonly userId: {
                        readonly type: "string";
                    };
                    readonly userCartKey: {
                        readonly type: "string";
                    };
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly $ref: "#/components/schemas/CartItem";
                        };
                    };
                    readonly totalPrice: {
                        readonly type: "number";
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                };
            };
            readonly WishlistRequest: {
                readonly type: "object";
                readonly required: readonly ["productId"];
                readonly properties: {
                    readonly productId: {
                        readonly type: "string";
                        readonly example: "66a1f2f3d4c5b6a7c8d9e0f1";
                    };
                };
            };
            readonly CategoryCreateRequest: {
                readonly type: "object";
                readonly required: readonly ["name", "description", "image"];
                readonly properties: {
                    readonly name: {
                        readonly type: "string";
                        readonly example: "Electronics";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly example: "Gadgets, devices, and accessories.";
                    };
                    readonly image: {
                        readonly type: "string";
                        readonly format: "binary";
                    };
                };
            };
            readonly SellerApplyRequest: {
                readonly type: "object";
                readonly required: readonly ["storeName", "commercialRegisterNumber", "taxCardNumber", "commercialRegisterImage", "taxCardImage"];
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
                readonly required: readonly ["storeDescription", "storeType", "storeLogo", "storeBanner"];
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
            readonly AdminAdditionalDocumentsRequest: {
                readonly type: "object";
                readonly required: readonly ["message"];
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly example: "Please upload a clearer tax card image and add your business address.";
                    };
                };
            };
            readonly SellerApplicationSummary: {
                readonly type: "object";
                readonly properties: {
                    readonly _id: {
                        readonly type: "string";
                    };
                    readonly commercialRegisterNumber: {
                        readonly type: "string";
                    };
                    readonly taxCardNumber: {
                        readonly type: "string";
                    };
                    readonly storeName: {
                        readonly type: "string";
                    };
                    readonly applicantStatus: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "under-review", "additional_docs_requested", "approved", "rejected"];
                    };
                    readonly notes: {
                        readonly type: "string";
                    };
                    readonly user: {
                        readonly type: "object";
                        readonly properties: {
                            readonly _id: {
                                readonly type: "string";
                            };
                            readonly FirstName: {
                                readonly type: "string";
                            };
                            readonly LastName: {
                                readonly type: "string";
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly format: "email";
                            };
                        };
                    };
                };
            };
            readonly SellerApplicationListResponse: {
                readonly type: "array";
                readonly items: {
                    readonly $ref: "#/components/schemas/SellerApplicationSummary";
                };
            };
            readonly AdminSellerSummary: {
                readonly type: "object";
                readonly properties: {
                    readonly _id: {
                        readonly type: "string";
                    };
                    readonly commercialRegisterNumber: {
                        readonly type: "string";
                    };
                    readonly taxCardNumber: {
                        readonly type: "string";
                    };
                    readonly storeName: {
                        readonly type: "string";
                    };
                    readonly applicantStatus: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "under-review", "additional_docs_requested", "approved", "rejected"];
                    };
                    readonly notes: {
                        readonly type: "string";
                    };
                    readonly storeManagement: {
                        readonly type: "object";
                        readonly properties: {
                            readonly storeLogo: {
                                readonly type: "string";
                            };
                            readonly storeBanner: {
                                readonly type: "string";
                            };
                            readonly storeDescription: {
                                readonly type: "string";
                            };
                            readonly storeType: {
                                readonly type: "string";
                                readonly enum: readonly ["physical", "online", "both"];
                            };
                            readonly storephysicalAddress: {
                                readonly type: "string";
                            };
                            readonly storeOnlineAddress: {
                                readonly type: "string";
                            };
                        };
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                };
            };
            readonly AdminSellerListResponse: {
                readonly type: "object";
                readonly properties: {
                    readonly sellers: {
                        readonly type: "array";
                        readonly items: {
                            readonly $ref: "#/components/schemas/AdminSellerSummary";
                        };
                    };
                    readonly pagination: {
                        readonly type: "object";
                        readonly properties: {
                            readonly page: {
                                readonly type: "integer";
                                readonly example: 1;
                            };
                            readonly limit: {
                                readonly type: "integer";
                                readonly example: 10;
                            };
                            readonly total: {
                                readonly type: "integer";
                                readonly example: 42;
                            };
                            readonly totalPages: {
                                readonly type: "integer";
                                readonly example: 5;
                            };
                        };
                    };
                };
            };
            readonly AdminUserListResponse: {
                readonly type: "array";
                readonly items: {
                    readonly $ref: "#/components/schemas/UserSummary";
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
        readonly "/api/auth/me": {
            readonly get: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Get current authenticated user profile";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "User profile retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
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
                    readonly 409: {
                        readonly description: "User already exists";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 500: {
                        readonly description: "Internal Server Error";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
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
                    readonly 400: {
                        readonly description: "Account registered with Google";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Invalid password";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Account has been blocked";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
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
                readonly summary: "Complete customer onboarding / update user profile";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
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
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/OnboardingResponseData";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "User is already onboarded or user is not a customer";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/forget-password": {
            readonly post: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Request a password reset email";
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/ForgetPasswordRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Reset password email sent successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/ForgetPasswordResponseData";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "Email address or user not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/reset-password": {
            readonly patch: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Reset a password using a recovery token";
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/ResetPasswordRequest";
                            };
                        };
                    };
                };
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
                        readonly description: "Password reset successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Invalid, missing, or expired token";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User or token not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/refresh": {
            readonly post: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Refresh access token using refresh_token cookie";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Token refreshed successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/RefreshResponseData";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Invalid refresh token";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "Refresh token not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
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
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Logged out successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/verify-email": {
            readonly get: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Verify user email with token";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
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
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/VerifyEmailResponseData";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Invalid or expired token";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/auth/continue-with-google": {
            readonly get: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Start Google OAuth sign-in";
                readonly responses: {
                    readonly 302: {
                        readonly description: "Redirects to Google authentication";
                    };
                };
            };
        };
        readonly "/api/auth/google/callback": {
            readonly get: {
                readonly tags: readonly ["Auth"];
                readonly summary: "Google OAuth callback";
                readonly responses: {
                    readonly 302: {
                        readonly description: "Redirects after successful Google authentication";
                    };
                    readonly 401: {
                        readonly description: "Google authentication failed";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/product": {
            readonly get: {
                readonly tags: readonly ["Products"];
                readonly summary: "Get all products with pagination";
                readonly parameters: readonly [{
                    readonly name: "page";
                    readonly in: "query";
                    readonly required: false;
                    readonly schema: {
                        readonly type: "integer";
                        readonly default: 1;
                    };
                }, {
                    readonly name: "limit";
                    readonly in: "query";
                    readonly required: false;
                    readonly schema: {
                        readonly type: "integer";
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
                readonly summary: "Create a product (Seller only)";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
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
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Image file required or upload failed";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/product/seller/product/{productId}": {
            readonly patch: {
                readonly tags: readonly ["Products"];
                readonly summary: "Update seller product / apply discount";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
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
                        readonly description: "Product updated / discount applied successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/product/{productId}": {
            readonly get: {
                readonly tags: readonly ["Products"];
                readonly summary: "Get product details by ID";
                readonly parameters: readonly [{
                    readonly name: "productId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Product retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/ProductItem";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Product ID not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "Product not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/cart": {
            readonly get: {
                readonly tags: readonly ["Cart"];
                readonly summary: "Get user cart";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Cart retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/CartResponse";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "Cart not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
            readonly post: {
                readonly tags: readonly ["Cart"];
                readonly summary: "Create a cart";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
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
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/CartResponse";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Items are required and should be a non-empty array";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 409: {
                        readonly description: "Cart already exists for this user";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/cart/remove": {
            readonly delete: {
                readonly tags: readonly ["Cart"];
                readonly summary: "Remove the current user's cart";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Cart removed successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "Cart not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
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
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Wishlist retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
            readonly post: {
                readonly tags: readonly ["Wishlist"];
                readonly summary: "Add product to wishlist";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
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
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Product ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
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
                }, {
                    readonly bearerAuth: readonly [];
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
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Product ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/wishlist/move-to-cart": {
            readonly post: {
                readonly tags: readonly ["Wishlist"];
                readonly summary: "Move product from wishlist to cart";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
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
                        readonly description: "Product moved to cart successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Product ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
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
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "multipart/form-data": {
                            readonly schema: {
                                readonly type: "object";
                                readonly required: readonly ["storeName", "commercialRegisterNumber", "taxCardNumber", "commercialRegisterImage", "taxCardImage"];
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
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Request sent successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "All fields and images are required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
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
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "multipart/form-data": {
                            readonly schema: {
                                readonly type: "object";
                                readonly required: readonly ["storeDescription", "storeType", "storeLogo", "storeBanner"];
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
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Store setup successful";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Bad request or missing required fields";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/category/addCategory": {
            readonly post: {
                readonly tags: readonly ["Categories"];
                readonly summary: "Create a category";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "multipart/form-data": {
                            readonly schema: {
                                readonly type: "object";
                                readonly required: readonly ["name", "description", "image"];
                                readonly properties: {
                                    readonly name: {
                                        readonly type: "string";
                                        readonly example: "Electronics";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly example: "Gadgets, devices, and accessories.";
                                    };
                                    readonly image: {
                                        readonly type: "string";
                                        readonly format: "binary";
                                    };
                                };
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 201: {
                        readonly description: "Category created successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Category name, description, and image are required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/customer/change-password": {
            readonly put: {
                readonly tags: readonly ["Customer"];
                readonly summary: "Change the current customer's password";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/ResetPasswordRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Password changed successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Validation failed or passwords do not match";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/login": {
            readonly post: {
                readonly tags: readonly ["Admin"];
                readonly summary: "Login as an admin";
                readonly requestBody: {
                    readonly required: true;
                    readonly content: {
                        readonly "application/json": {
                            readonly schema: {
                                readonly $ref: "#/components/schemas/AdminLoginRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Admin logged in successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Invalid email or password";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Access denied";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/user": {
            readonly get: {
                readonly tags: readonly ["Admin"];
                readonly summary: "List all users";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Users retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/AdminUserListResponse";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/promoteUserToAdmin/{userId}": {
            readonly patch: {
                readonly tags: readonly ["Admin"];
                readonly summary: "Promote a customer or seller to admin";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "userId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "User promoted to admin successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "User ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/BlockTheUser/{userId}": {
            readonly patch: {
                readonly tags: readonly ["Admin"];
                readonly summary: "Block a user";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "userId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "User blocked successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "User ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/acivateUser/{userId}": {
            readonly patch: {
                readonly tags: readonly ["Admin"];
                readonly summary: "Activate a user";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "userId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "User activated successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "User ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/seller-applications/pending": {
            readonly get: {
                readonly tags: readonly ["Admin"];
                readonly summary: "List pending seller applications";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Pending seller applications retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/SellerApplicationListResponse";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/allSellers": {
            readonly get: {
                readonly tags: readonly ["Admin"];
                readonly summary: "List all sellers with pagination";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "page";
                    readonly in: "query";
                    readonly required: false;
                    readonly schema: {
                        readonly type: "integer";
                        readonly minimum: 1;
                        readonly default: 1;
                    };
                }, {
                    readonly name: "limit";
                    readonly in: "query";
                    readonly required: false;
                    readonly schema: {
                        readonly type: "integer";
                        readonly minimum: 1;
                        readonly default: 10;
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Sellers retrieved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly allOf: readonly [{
                                        readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly data: {
                                                readonly $ref: "#/components/schemas/AdminSellerListResponse";
                                            };
                                        };
                                    }];
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/seller-applications/{sellerId}/approve": {
            readonly post: {
                readonly tags: readonly ["Admin"];
                readonly summary: "Approve a seller application";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "sellerId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Seller approved successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Seller ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found or no pending application found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/seller-applications/{sellerId}/request-additional-documents": {
            readonly post: {
                readonly tags: readonly ["Admin"];
                readonly summary: "Request additional documents from a seller";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "sellerId";
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
                                readonly $ref: "#/components/schemas/AdminAdditionalDocumentsRequest";
                            };
                        };
                    };
                };
                readonly responses: {
                    readonly 200: {
                        readonly description: "Request for additional documents sent successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Seller ID or message is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "No pending seller application found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly "/api/admin/seller-applications/{sellerId}/reject": {
            readonly post: {
                readonly tags: readonly ["Admin"];
                readonly summary: "Reject a seller application";
                readonly security: readonly [{
                    readonly cookieAuth: readonly [];
                }, {
                    readonly bearerAuth: readonly [];
                }];
                readonly parameters: readonly [{
                    readonly name: "sellerId";
                    readonly in: "path";
                    readonly required: true;
                    readonly schema: {
                        readonly type: "string";
                    };
                }];
                readonly responses: {
                    readonly 200: {
                        readonly description: "Seller rejected successfully";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiSuccessResponse";
                                };
                            };
                        };
                    };
                    readonly 400: {
                        readonly description: "Seller ID is required";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 401: {
                        readonly description: "Unauthorized";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 403: {
                        readonly description: "Forbidden";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                    readonly 404: {
                        readonly description: "User not found or no pending application found";
                        readonly content: {
                            readonly "application/json": {
                                readonly schema: {
                                    readonly $ref: "#/components/schemas/ApiErrorResponse";
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=swagger.d.ts.map