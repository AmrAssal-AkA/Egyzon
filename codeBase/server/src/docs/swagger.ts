export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Egyzon API",
    version: "1.0.0",
    description:
      "Swagger documentation for the Egyzon server routes and endpoints.",
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
    {
      name: "Notifications",
      description: "User notification retrieval and read-state management",
    },
    { name: "Seller", description: "Seller onboarding and store setup" },
    { name: "Categories", description: "Category management" },
    { name: "Customer", description: "Customer account settings" },
    { name: "Admin", description: "Admin login and seller application review" },
    {
      name: "Payment",
      description: "Payment processing and Paymob integration webhooks",
    },
    {
      name: "Wallet",
      description: "Seller wallet balance and fund withdrawals",
    },
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
      CustomerOrderHistoryOrder: {
        type: "object",
        properties: {
          _id: { type: "string" },
          orderNumber: { type: "string", example: "ORD-20260825-1234" },
          orderDate: { type: "string", format: "date-time" },
          totalAmount: { type: "number", example: 450 },
          status: {
            type: "string",
            enum: [
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
            ],
            example: "delivered",
          },
        },
      },
      CustomerOrderHistoryData: {
        type: "object",
        properties: {
          _id: { type: "string" },
          FirstName: { type: "string", example: "Ahmed" },
          LastName: { type: "string", example: "Ali" },
          email: {
            type: "string",
            format: "email",
            example: "customer@example.com",
          },
          role: { type: "string", example: "customer" },
          phoneNumber: { type: "string", example: "+201001112223" },
          address: {
            type: "array",
            items: { type: "string" },
          },
          orders: {
            type: "array",
            items: { $ref: "#/components/schemas/CustomerOrderHistoryOrder" },
          },
          wishlist: {
            type: "array",
            items: { type: "string" },
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
          AvgRating: { type: "number" },
          sku: { type: "string" },
          status: { type: "string", enum: ["active", "inactive"] },
          category: { type: "string" },
          imageUrl: {
            type: "array",
            items: { type: "string" },
          },
          sellerId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
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
      ProductModifyRequest: {
        type: "object",
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
      ProductSearchResponse: {
        type: "object",
        properties: {
          products: {
            type: "array",
            items: { $ref: "#/components/schemas/ProductItem" },
          },
          total: { type: "integer", example: 42 },
          totalPages: { type: "integer", example: 5 },
          currentPage: { type: "integer", example: 1 },
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
      BillingData: {
        type: "object",
        required: ["firstName", "lastName", "email", "phoneNumber"],
        properties: {
          firstName: { type: "string", example: "John" },
          lastName: { type: "string", example: "Doe" },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          phoneNumber: { type: "string", example: "+201001112223" },
          apartment: { type: "string", example: "4B" },
          floor: { type: "string", example: "4" },
          street: { type: "string", example: "12 Nile St" },
          building: { type: "string", example: "10" },
          city: { type: "string", example: "Cairo" },
          state: { type: "string", example: "Cairo Governorate" },
          country: { type: "string", example: "Egypt" },
          postalCode: { type: "string", example: "11511" },
        },
      },
      OrderRequest: {
        type: "object",
        required: ["shippingAddress", "paymentMethod", "address"],
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
          address: { $ref: "#/components/schemas/OrderAddress" },
          Address: { $ref: "#/components/schemas/OrderAddress" },
          billingData: { $ref: "#/components/schemas/BillingData" },
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
          payment: { type: "string" },
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
          address: { $ref: "#/components/schemas/OrderAddress" },
          notes: { type: "string" },
          orderItems: {
            type: "array",
            items: { $ref: "#/components/schemas/OrderItem" },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      PlaceOrderResponseData: {
        type: "object",
        properties: {
          order: { $ref: "#/components/schemas/OrderResponse" },
          paymentUrl: {
            type: "string",
            example:
              "https://accept.paymob.com/acceptance/iframes/12345?payment_token=...",
          },
        },
      },
      CustomerOrderListResponse: {
        type: "array",
        items: { $ref: "#/components/schemas/OrderResponse" },
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
        },
      },
      SellerTopSellingProductItem: {
        type: "object",
        properties: {
          productId: { type: "string", example: "66a1f2f3d4c5b6a7c8d9e0f1" },
          name: { type: "string", example: "Wireless Headphones" },
          image: {
            type: "string",
            nullable: true,
            example: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
          },
          sales: { type: "number", example: 25 },
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
      SellerChangeOrderStatusRequest: {
        type: "object",
        required: ["orderId", "newStatus"],
        properties: {
          orderId: { type: "string", example: "66a1f2f3d4c5b6a7c8d9e0f1" },
          newStatus: {
            type: "string",
            enum: ["pending", "processing", "shipped"],
            example: "processing",
          },
        },
      },
      SellerWalletBalanceResponse: {
        type: "object",
        properties: {
          balance: { type: "number", example: 12500 },
        },
      },
      SellerAvgOrderValueResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              avgOrderValue: { type: "number", example: 450.5 },
              changePercent: { type: "number", example: 0 },
              message: {
                type: "string",
                example: "Average Order Value calculated successfully",
              },
            },
          },
        },
      },
      SellerSalesByCategoryResponse: {
        type: "object",
        additionalProperties: {
          type: "number",
        },
        example: {
          Electronics: 12500,
          Clothing: 4500,
        },
      },
      AnalyticalDataPoint: {
        type: "object",
        properties: {
          label: { type: "string", example: "2026-08-25" },
          date: { type: "string", example: "2026-08-25" },
          revenue: { type: "number", example: 2100 },
          orders: { type: "integer", example: 5 },
        },
      },
      SellerSalesPerformanceResponse: {
        type: "object",
        properties: {
          timeframe: {
            type: "string",
            enum: ["7days", "30days", "12months"],
            example: "7days",
          },
          totalRevenue: { type: "number", example: 15420.5 },
          totalOrders: { type: "integer", example: 35 },
          AverageOrderValue: { type: "number", example: 440.6 },
          revenueChangePercent: { type: "number", example: 12.5 },
          series: {
            type: "array",
            items: { $ref: "#/components/schemas/AnalyticalDataPoint" },
          },
          peak: {
            type: "object",
            properties: {
              label: { type: "string", example: "2026-08-25" },
              date: { type: "string", example: "2026-08-25" },
              revenue: { type: "number", example: 2100 },
            },
          },
        },
      },
      PaymentItem: {
        type: "object",
        properties: {
          _id: { type: "string" },
          transactionId: { type: "string", example: "12345678" },
          paymobOrderId: { type: "number", example: 98765432 },
          amount: { type: "number", example: 500 },
          currency: { type: "string", example: "EGP" },
          paymentMethod: { type: "string", example: "card" },
          paymentStatus: {
            type: "string",
            enum: ["pending", "paid", "failed", "refunded"],
            example: "paid",
          },
          paymentDate: { type: "string", format: "date-time" },
          gateway: { type: "string", example: "paymob" },
          gatewayResponse: { type: "string" },
          refundAmount: { type: "number", example: 0 },
          cardLast4: { type: "string", example: "1234" },
          cardBrand: { type: "string", example: "MasterCard" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      PaymobWebhookResponseData: {
        type: "object",
        properties: {
          payment: { $ref: "#/components/schemas/PaymentItem" },
          order: { $ref: "#/components/schemas/OrderResponse" },
        },
      },
      PlatformFeeResponse: {
        type: "object",
        properties: {
          PlatformFeePercentage: { type: "number", example: 10 },
          taxRate: { type: "number", example: 14 },
          updatedBy: { type: "string" },
          updateAt: { type: "string", format: "date-time" },
        },
      },
      SetPlatformFeeRequest: {
        type: "object",
        required: ["feePercentage", "taxRate"],
        properties: {
          feePercentage: { type: "number", example: 10 },
          taxRate: { type: "number", example: 14 },
        },
      },
      AdminAdditionalDocumentsRequest: {
        type: "object",
        required: ["message"],
        properties: {
          message: {
            type: "string",
            example:
              "Please upload a clearer tax card image and add your business address.",
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
      NotificationItem: {
        type: "object",
        properties: {
          _id: { type: "string" },
          user: { type: "string" },
          type: {
            type: "string",
            enum: ["info", "warning", "error", "success"],
          },
          message: { type: "string" },
          isRead: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      NotificationListResponse: {
        type: "array",
        items: { $ref: "#/components/schemas/NotificationItem" },
      },
      NotificationBulkActionResponse: {
        type: "object",
        additionalProperties: true,
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
      AdminActiveSellerCountsResponse: {
        type: "object",
        properties: {
          totalSellersActive: { type: "integer", example: 12 },
          growth: {
            type: "number",
            nullable: true,
            example: 15.5,
            description:
              "Percentage growth of active sellers over the last 30 days (null if no previous data)",
          },
        },
      },
      AdminPendingSellerCountsResponse: {
        type: "object",
        properties: {
          totalSellersPending: { type: "integer", example: 4 },
        },
      },
      ProductStockUpdateRequest: {
        type: "object",
        required: ["newStock"],
        properties: {
          newStock: {
            type: "integer",
            minimum: 0,
            example: 50,
            description: "Updated stock quantity for the product",
          },
        },
      },
      SellerStoreDetailsResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            commercialRegisterNumber: { type: "string" },
            taxCardNumber: { type: "string" },
            storeName: { type: "string" },
            applicantStatus: { type: "string" },
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
          },
        },
      },
      AdminSellerProductsCategoryResponse: {
        type: "object",
        properties: {
          total: { type: "integer", example: 45 },
          categories: {
            type: "array",
            items: {
              type: "object",
              properties: {
                categoryId: {
                  type: "string",
                  example: "66a1f2f3d4c5b6a7c8d9e0f1",
                },
                categoryName: { type: "string", example: "Electronics" },
                sellerCount: { type: "integer", example: 12 },
                percentage: { type: "number", example: 26.67 },
              },
            },
          },
        },
      },
      AdminTotalRevenueResponse: {
        type: "number",
        example: 154000,
        description:
          "Total revenue calculated across all completed orders on the platform",
      },
      AdminRevenueGrowthResponse: {
        type: "object",
        properties: {
          timeframe: {
            type: "string",
            enum: ["7days", "30days", "12months"],
            example: "7days",
          },
          totalRevenue: { type: "number", example: 154000.5 },
          totalOrders: { type: "integer", example: 350 },
          AverageOrderValue: { type: "number", example: 440 },
          revenueChangePercent: { type: "number", example: 12.5 },
          series: {
            type: "array",
            items: { $ref: "#/components/schemas/AnalyticalDataPoint" },
          },
          peak: {
            type: "object",
            properties: {
              label: { type: "string", example: "2026-08-25" },
              date: { type: "string", example: "2026-08-25" },
              revenue: { type: "number", example: 21000 },
            },
          },
        },
      },
      AdminTotalOrdersResponse: {
        type: "object",
        properties: {
          orders: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string", example: "64b1f2c3d4e5f6a7b8c9d0e1" },
                orderNumber: {
                  type: "string",
                  example: "ORD-a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6",
                },
                customer: {
                  type: "object",
                  nullable: true,
                  properties: {
                    _id: {
                      type: "string",
                      example: "64b1f2c3d4e5f6a7b8c9d0e2",
                    },
                    FirstName: { type: "string", example: "Ahmed" },
                    LastName: { type: "string", example: "Hassan" },
                    email: {
                      type: "string",
                      example: "ahmed.hassan@example.com",
                    },
                  },
                },
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
                  example: "delivered",
                },
                subTotal: { type: "number", example: 49999 },
                discount: { type: "number", example: 0 },
                shippingFee: { type: "number", example: 50 },
                taxAmount: { type: "number", example: 0 },
                totalAmount: { type: "number", example: 50049 },
                paymentStatus: {
                  type: "string",
                  enum: ["pending", "paid", "failed", "refunded"],
                  example: "paid",
                },
                payment: { type: "string", nullable: true },
                paymentMethod: {
                  type: "object",
                  properties: {
                    method: {
                      type: "string",
                      enum: ["cashOnDelivery", "creditCard"],
                      example: "creditCard",
                    },
                    details: { type: "string", nullable: true },
                  },
                },
                address: { $ref: "#/components/schemas/OrderAddress" },
                notes: { type: "string", example: "" },
                orderItems: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "64b1f2c3d4e5f6a7b8c9d0e3",
                      },
                      product: {
                        type: "object",
                        nullable: true,
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b1f2c3d4e5f6a7b8c9d0e4",
                          },
                          productName: {
                            type: "string",
                            example: "PlayStation 5 Slim",
                          },
                          imageUrl: {
                            type: "string",
                            example:
                              "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
                          },
                          category: { type: "string", example: "Gaming" },
                        },
                      },
                      seller: {
                        type: "object",
                        nullable: true,
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b1f2c3d4e5f6a7b8c9d0e5",
                          },
                          storeName: {
                            type: "string",
                            example: "Gaming Hub",
                          },
                          email: {
                            type: "string",
                            example: "seller@example.com",
                          },
                        },
                      },
                      quantity: { type: "integer", example: 1 },
                      unitPrice: { type: "number", example: 49999 },
                      discount: { type: "number", example: 0 },
                      total: { type: "number", example: 49999 },
                    },
                  },
                },
                platformFee: { type: "number", example: 500 },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          },
          pagination: {
            type: "object",
            properties: {
              page: { type: "integer", example: 1 },
              limit: { type: "integer", example: 10 },
              total: { type: "integer", example: 45 },
              totalPage: { type: "integer", example: 5 },
            },
          },
        },
      },
      AddBankAccountRequest: {
        type: "object",
        required: ["fullName", "bankCardNumber", "bankCode"],
        properties: {
          issuer: {
            type: "string",
            enum: ["bank_card", "instant_bank"],
            default: "bank_card",
            example: "bank_card",
            description: "Payment issuer type",
          },
          fullName: {
            type: "string",
            example: "Ahmed Hassan",
            description:
              "Full name matching the bank account holder (min 3 characters)",
          },
          bankCardNumber: {
            type: "string",
            example: "1234567890123456",
            description: "Bank card or account number (numeric, 10-34 digits)",
          },
          bankCode: {
            type: "string",
            enum: ["CIB", "MISR", "NBE", "QNB", "AAIB"],
            example: "CIB",
            description: "Supported Egyptian bank code",
          },
        },
      },
      BankAccountData: {
        type: "object",
        properties: {
          issuer: {
            type: "string",
            enum: ["bank_card", "instant_bank"],
            example: "bank_card",
          },
          fullName: { type: "string", example: "Ahmed Hassan" },
          last4: { type: "string", example: "3456" },
          BankCode: {
            type: "string",
            enum: ["CIB", "MISR", "NBE", "QNB", "AAIB"],
            example: "CIB",
          },
          status: {
            type: "string",
            enum: ["pending_verification", "verified", "rejected"],
            example: "pending_verification",
          },
        },
      },
      WalletWithdrawRequest: {
        type: "object",
        required: ["amount"],
        properties: {
          amount: {
            type: "number",
            minimum: 1,
            example: 500,
            description: "Amount to withdraw from seller wallet in EGP",
          },
        },
      },
      WalletWithdrawResponseData: {
        type: "object",
        properties: {
          updatedWallet: {
            type: "object",
            properties: {
              wallet: {
                type: "object",
                properties: {
                  _id: { type: "string", example: "66d1f2e3a4b5c6d7e8f9a0b1" },
                  seller: {
                    type: "string",
                    example: "66d1f2e3a4b5c6d7e8f9a0b2",
                  },
                  balance: { type: "number", example: 2500 },
                  currency: { type: "string", example: "EGP" },
                  transactionHistory: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        TransactionId: {
                          type: "string",
                          example: "TXN-b1c2d3e4-f5a6",
                        },
                        transactionType: {
                          type: "string",
                          example: "withdrawal",
                        },
                        amount: { type: "number", example: 500 },
                        currency: { type: "string", example: "EGP" },
                        status: { type: "string", example: "pending" },
                        withdrawalId: {
                          type: "string",
                          example: "66d1f2e3a4b5c6d7e8f9a0b3",
                        },
                        date: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
              bankAccount: {
                type: "object",
                properties: {
                  issuer: { type: "string", example: "bank_card" },
                  fullName: { type: "string", example: "Ahmed Hassan" },
                  last4: { type: "string", example: "3456" },
                  bankCode: { type: "string", example: "CIB" },
                },
              },
            },
          },
        },
      },
      AdminVerifyBankAccountRequest: {
        type: "object",
        required: ["decision"],
        properties: {
          decision: {
            type: "string",
            enum: ["verified", "rejected"],
            example: "verified",
            description:
              "Decision to approve or reject the seller bank account",
          },
        },
      },
      WalletTransactionItem: {
        type: "object",
        properties: {
          TransactionId: { type: "string", example: "TXN-b1c2d3e4-f5a6" },
          transactionType: {
            type: "string",
            enum: ["sale", "refund", "withdrawal", "deposit"],
            example: "withdrawal",
          },
          amount: { type: "number", example: 500 },
          currency: { type: "string", example: "EGP" },
          status: {
            type: "string",
            enum: ["pending", "completed", "failed", "cancelled"],
            example: "completed",
          },
          withdrawalId: {
            type: "string",
            nullable: true,
            example: "66d1f2e3a4b5c6d7e8f9a0b3",
          },
          date: { type: "string", format: "date-time" },
        },
      },
      WalletTransactionHistoryResponseData: {
        type: "object",
        properties: {
          transactionHistory: {
            type: "object",
            properties: {
              transactions: {
                type: "array",
                items: { $ref: "#/components/schemas/WalletTransactionItem" },
              },
              totalTransactions: { type: "integer", example: 15 },
              currentPage: { type: "integer", example: 1 },
              totalPages: { type: "integer", example: 2 },
            },
          },
        },
      },
      AdminApproveWithdrawalRequest: {
        type: "object",
        required: ["decision"],
        properties: {
          decision: {
            type: "string",
            enum: ["approved", "rejected"],
            example: "approved",
            description:
              "Decision to approve or reject the seller withdrawal request",
          },
        },
      },
      AdminSellerWithdrawalRequestsResponseData: {
        type: "object",
        properties: {
          withdrawalRequests: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string", example: "66d1f2e3a4b5c6d7e8f9a0b1" },
                seller: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "66d1f2e3a4b5c6d7e8f9a0b2",
                    },
                    FirstName: { type: "string", example: "Ahmed" },
                    LastName: { type: "string", example: "Ali" },
                    email: { type: "string", example: "seller@example.com" },
                    storeName: { type: "string", example: "Cairo Tech" },
                    bankAccount: {
                      $ref: "#/components/schemas/BankAccountData",
                    },
                  },
                },
                balance: { type: "number", example: 8500 },
                currency: { type: "string", example: "EGP" },
                transactionHistory: {
                  $ref: "#/components/schemas/WalletTransactionItem",
                },
              },
            },
          },
          pagination: {
            type: "object",
            properties: {
              page: { type: "integer", example: 1 },
              limit: { type: "integer", example: 10 },
              total: { type: "integer", example: 5 },
              totalPages: { type: "integer", example: 1 },
            },
          },
        },
      },
      AdminTotalSalesResponseData: {
        type: "object",
        properties: {
          totalSales: {
            type: "number",
            example: 125430.5,
            description: "Total gross sales across all orders on the platform",
          },
        },
      },
      AdminWithdrawalCompletedCountResponseData: {
        type: "object",
        properties: {
          completedCount: {
            type: "integer",
            example: 24,
            description: "Total number of completed seller withdrawal requests",
          },
        },
      },
      AdminWithdrawalPendingCountResponseData: {
        type: "object",
        properties: {
          pendingCount: {
            type: "integer",
            example: 5,
            description: "Total number of pending seller withdrawal requests",
          },
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
    "/api/product/seller/{productId}": {
      put: {
        tags: ["Products"],
        summary: "Update seller product details",
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
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/ProductModifyRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Product updated successfully",
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
            description: "Bad Request",
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
            description: "Product not found",
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
    "/api/product/search": {
      get: {
        tags: ["Products"],
        summary: "Search products",
        description:
          "Search products with text query, category filter, sorting, and pagination.",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            schema: { type: "string" },
            description: "Search keyword query",
            example: "wireless headphones",
          },
          {
            name: "category",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Filter by category ID or name",
            example: "electronics",
          },
          {
            name: "sort",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: [
                "price:asc",
                "price:desc",
                "productName:asc",
                "productName:desc",
                "createdAt:asc",
                "createdAt:desc",
              ],
            },
            description:
              "Sort field and order formatted as field:order (e.g. price:asc, price:desc, productName:asc, createdAt:desc)",
            example: "price:asc",
          },
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, default: 1 },
            example: 1,
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 100, default: 10 },
            example: 10,
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
                          $ref: "#/components/schemas/ProductSearchResponse",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Query parameter is required and must be a string",
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
    "/api/product/seller/product/{productId}/stock": {
      patch: {
        tags: ["Products"],
        summary: "Update product stock quantity (Seller only)",
        description:
          "Allows an authenticated seller to update the stock count of their product.",
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
              schema: {
                $ref: "#/components/schemas/ProductStockUpdateRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Stock updated successfully",
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
            description: "Bad Request - New stock value is required",
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
            description:
              "Forbidden - You are not authorized to access this resource",
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
    "/api/notifications": {
      get: {
        tags: ["Notifications"],
        summary: "Get the current user's notifications",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Notifications retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/NotificationListResponse",
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
        },
      },
    },
    "/api/notifications/{id}/markAsRead": {
      patch: {
        tags: ["Notifications"],
        summary: "Mark a notification as read",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Notification marked as read successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: { $ref: "#/components/schemas/NotificationItem" },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Notification ID is required",
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
            description: "Notification not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/notifications/markAllAsRead": {
      patch: {
        tags: ["Notifications"],
        summary: "Mark all notifications as read for the current user",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "All notifications marked as read successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/NotificationBulkActionResponse",
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
        },
      },
    },
    "/api/notifications/clear": {
      delete: {
        tags: ["Notifications"],
        summary: "Clear all notifications for the current user",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "All notifications cleared successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/NotificationBulkActionResponse",
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
    "/api/seller/getAllOrders": {
      get: {
        tags: ["Seller"],
        summary:
          "Get all orders containing the authenticated seller's products",
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
    "/api/seller/change-order-status": {
      patch: {
        tags: ["Seller"],
        summary: "Update the status of an order containing seller's products",
        description:
          "Allows a seller to update an order status to pending, processing, or shipped.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SellerChangeOrderStatusRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Order status updated successfully",
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
            description: "Bad Request",
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
            description: "Order or seller not found",
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
    "/api/seller/avg-order-value": {
      get: {
        tags: ["Seller"],
        summary:
          "Get the authenticated seller's average order value / total revenue",
        description:
          "Retrieves the revenue calculation and order metrics for the authenticated seller.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Average order value fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/SellerAvgOrderValueResponse",
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
            description:
              "Forbidden - You are not authorized to access this resource",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Seller not found",
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
    "/api/seller/sales-performance-indicator": {
      get: {
        tags: ["Seller"],
        summary:
          "Get the authenticated seller's sales performance indicator analytics",
        description:
          "Retrieves revenue, order count, series trends, and peak metrics over a timeframe (7days, 30days, 12months). Emits real-time updates through Socket.IO.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "timeframe",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["7days", "30days", "12months"],
              default: "7days",
            },
            example: "7days",
          },
        ],
        responses: {
          200: {
            description: "Sales performance indicator fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/SellerSalesPerformanceResponse",
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
            description:
              "Forbidden - You are not authorized to access this resource",
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
    "/api/seller/get-salses-by-category": {
      get: {
        tags: ["Seller"],
        summary: "Get the authenticated seller's sales grouped by category",
        description:
          "Retrieves total sales revenue breakdown by category for the authenticated seller.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Sales by category fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/SellerSalesByCategoryResponse",
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
            description:
              "Forbidden - You are not authorized to access this resource",
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
    "/api/seller/getStoreDetails/{sellerId}": {
      get: {
        tags: ["Seller"],
        summary: "Get seller storefront details by seller ID",
        description:
          "Retrieves the storefront configuration and store management details for a specific seller by their ID.",
        security: [],
        parameters: [
          {
            name: "sellerId",
            in: "path",
            required: true,
            description: "ID of the seller to fetch store details for",
            schema: {
              type: "string",
              example: "66a1f2f3d4c5b6a7c8d9e0f1",
            },
          },
        ],
        responses: {
          200: {
            description: "Store details fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/SellerStoreDetailsResponse",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Bad Request - Seller ID is required",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Seller not found",
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
    "/api/seller/add-bank-account": {
      post: {
        tags: ["Seller"],
        summary: "Add or link seller bank account",
        description:
          "Allows an authenticated seller to link their bank card or account for fund withdrawals. The account starts in pending_verification status.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AddBankAccountRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Bank account added successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminSellerSummary",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Validation error or missing bank card/bank code",
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
            description:
              "Forbidden - You are not authorized to access this resource",
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
    "/api/seller/get-bank-account": {
      get: {
        tags: ["Seller"],
        summary: "Get linked seller bank account",
        description:
          "Retrieves masked bank account details and verification status for the authenticated seller.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Bank account fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/BankAccountData",
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
            description:
              "Forbidden - You are not authorized to access this resource",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Bank account not found",
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
    "/api/seller/remove-bank-account": {
      delete: {
        tags: ["Seller"],
        summary: "Remove seller bank account",
        description:
          "Allows an authenticated seller to unlink and remove their bank account.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Bank account removed successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminSellerSummary",
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
            description:
              "Forbidden - You are not authorized to access this resource",
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
    "/api/wallet/balance": {
      get: {
        tags: ["Wallet"],
        summary: "Get seller wallet balance",
        description:
          "Retrieves the available, withdrawable balance for the authenticated seller calculated from delivered orders older than 2 days minus completed withdrawals.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Wallet balance retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/SellerWalletBalanceResponse",
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
            description: "Forbidden - Unauthorized access or not a seller",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Seller not found",
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
    "/api/wallet/withdraw": {
      post: {
        tags: ["Wallet"],
        summary: "Withdraw funds from seller wallet",
        description:
          "Submits a withdrawal request for the authenticated seller. Requires a linked and verified bank account and sufficient wallet balance.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/WalletWithdrawRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Withdrawal request submitted successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/WalletWithdrawResponseData",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description:
              "Invalid withdrawal amount, bank account not linked/verified, or insufficient balance",
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
            description: "Forbidden - Unauthorized access or not a seller",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Seller or wallet not found",
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
    "/api/wallet/transactions": {
      get: {
        tags: ["Wallet"],
        summary: "Get seller wallet transaction history",
        description:
          "Retrieves paginated transaction history for the authenticated seller's wallet, sorted latest first.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, default: 1 },
            description: "Page number for pagination",
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, default: 10 },
            description: "Number of transactions per page",
          },
        ],
        responses: {
          200: {
            description: "Transaction history retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/WalletTransactionHistoryResponseData",
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
            description: "Forbidden - Unauthorized access or not a seller",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Seller or wallet not found",
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
    "/api/customer/order-history": {
      get: {
        tags: ["Customer"],
        summary: "Get customer order history",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Customer order history retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/CustomerOrderHistoryData",
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
            description: "Customer not found",
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
                        data: {
                          $ref: "#/components/schemas/PlaceOrderResponseData",
                        },
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
    "/api/order/getUserOrders": {
      get: {
        tags: ["Orders"],
        summary: "Get current customer's orders",
        description:
          "Retrieves all orders placed by the authenticated customer, sorted newest first.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Orders retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/CustomerOrderListResponse",
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
            description: "Forbidden - You are not authorized to view orders",
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
    "/api/payment/paymob/webhook": {
      post: {
        tags: ["Payment"],
        summary: "Paymob transaction webhook callback",
        description:
          "Processes transaction callbacks from Paymob. Verifies the HMAC SHA512 signature in the query parameter and updates payment and order status.",
        parameters: [
          {
            name: "hmac",
            in: "query",
            required: true,
            schema: { type: "string" },
            description:
              "HMAC SHA512 signature from Paymob for request verification",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["obj"],
                properties: {
                  obj: {
                    type: "object",
                    description: "Paymob transaction object",
                    additionalProperties: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Payment processed successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/PaymobWebhookResponseData",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Invalid HMAC signature",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Payment not found for the given Paymob order ID",
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
    "/api/admin/getAllSellerActiveCounts": {
      get: {
        tags: ["Admin"],
        summary: "Get count of all active/approved sellers",
        description:
          "Retrieves the total count of approved and active sellers on the platform.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Seller counts retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminActiveSellerCountsResponse",
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
            description: "Unauthorized access",
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
    "/api/admin/getAllSellerPendingCounts": {
      get: {
        tags: ["Admin"],
        summary: "Get count of all pending seller applications",
        description:
          "Retrieves the total count of pending seller applications awaiting review.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Seller counts retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminPendingSellerCountsResponse",
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
            description: "Unauthorized access",
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
    "/api/admin/getSellerProductsCategory": {
      get: {
        tags: ["Admin"],
        summary: "Get product categories for seller management",
        description:
          "Retrieves list of product categories (ID and name) available in the system.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Seller products category retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminSellerProductsCategoryResponse",
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
            description: "Unauthorized access",
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
    "/api/admin/getTotalRevenueInPlatform": {
      get: {
        tags: ["Admin"],
        summary: "Get total revenue on the platform",
        description:
          "Calculates and returns the aggregate revenue from all orders placed across the platform.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Total revenue retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminTotalRevenueResponse",
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
            description: "Unauthorized access",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "No revenue data found",
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
    "/api/admin/getTotalOrdersInPlatform": {
      get: {
        tags: ["Admin"],
        summary: "Get all orders on the platform",
        description:
          "Retrieves all orders across the platform with user, seller, and product details populated.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, default: 1 },
            description: "Page number for pagination",
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, default: 10 },
            description: "Number of orders per page",
          },
        ],
        responses: {
          200: {
            description: "All orders retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminTotalOrdersResponse",
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
            description: "Unauthorized access",
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
    "/api/admin/getPlatformRevenueGrowth": {
      get: {
        tags: ["Admin"],
        summary: "Get platform-wide revenue growth analytics",
        description:
          "Retrieves platform revenue growth, order volume, series trends, and peak performance over a given timeframe (7days, 30days, 12months). Emits real-time updates through Socket.IO.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "timeframe",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["7days", "30days", "12months"],
              default: "7days",
            },
            example: "7days",
            description: "Analytics timeframe window",
          },
        ],
        responses: {
          200: {
            description: "Platform revenue growth data retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminRevenueGrowthResponse",
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
            description: "Unauthorized access",
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
    "/api/admin/verifySellerBankAccount/{sellerId}": {
      patch: {
        tags: ["Admin"],
        summary: "Verify or reject a seller bank account",
        description:
          "Allows an admin to approve ('verified') or reject ('rejected') a seller's linked bank account.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "sellerId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description:
              "The ID of the seller whose bank account is being verified",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminVerifyBankAccountRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Seller bank account status updated successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminSellerSummary",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description:
              "Seller ID is required, decision must be 'verified' or 'rejected', or seller does not have a bank account linked",
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
            description: "Forbidden - Unauthorized access",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Seller not found",
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
    "/api/admin/getAllSellerWithdrawlRequests": {
      get: {
        tags: ["Admin"],
        summary: "Get all seller withdrawal requests",
        description:
          "Allows an admin to retrieve a paginated list of seller withdrawal requests, optionally filtered by status ('all', 'pending', 'completed', 'failed', 'rejected').",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", default: 1, minimum: 1 },
            description: "Page number for pagination",
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", default: 10, minimum: 1, maximum: 100 },
            description: "Number of records per page (max: 100)",
          },
          {
            name: "status",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["all", "pending", "completed", "failed", "rejected"],
              default: "all",
            },
            example: "all",
            description:
              "Filter withdrawal requests by status ('all', 'pending', 'completed', 'failed', 'rejected')",
          },
        ],
        responses: {
          200: {
            description:
              "All seller withdrawal requests retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminSellerWithdrawalRequestsResponseData",
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
            description: "Forbidden - Unauthorized access",
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
    "/api/admin/approveSellerWithdrawalRequest/{sellerId}/{transactionId}": {
      patch: {
        tags: ["Admin"],
        summary: "Approve or reject a seller withdrawal request",
        description:
          "Allows an admin to approve ('approved') or reject ('rejected') a pending seller withdrawal transaction request.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: "sellerId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description:
              "The ID of the seller whose withdrawal request is being processed",
          },
          {
            name: "transactionId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "The ID of the withdrawal transaction",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminApproveWithdrawalRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Seller withdrawal request approved or rejected successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          description: "The updated seller wallet document",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description:
              "sellerId or transactionId is required, or decision must be 'approved' or 'rejected'",
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
            description: "Forbidden - Unauthorized access",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiErrorResponse" },
              },
            },
          },
          404: {
            description: "Transaction or wallet not found",
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
    "/api/admin/getTotalSales": {
      get: {
        tags: ["Admin"],
        summary: "Get total sales across the platform",
        description:
          "Allows an admin to retrieve aggregated total gross sales from all orders placed on the platform.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Total sales retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminTotalSalesResponseData",
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
            description: "Forbidden - Unauthorized access",
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
    "/api/admin/getWithdrawalCompletedCount": {
      get: {
        tags: ["Admin"],
        summary: "Get count of completed seller withdrawals",
        description:
          "Allows an admin to retrieve the total count of seller withdrawal transactions with status 'completed'.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Withdrawal completed count retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminWithdrawalCompletedCountResponseData",
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
            description: "Forbidden - Unauthorized access",
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
    "/api/admin/getWithdrawalPendingCount": {
      get: {
        tags: ["Admin"],
        summary: "Get count of pending seller withdrawals",
        description:
          "Allows an admin to retrieve the total count of seller withdrawal transactions with status 'pending'.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Pending withdrawal count retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminWithdrawalPendingCountResponseData",
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
            description: "Forbidden - Unauthorized access",
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
    "/api/admin/get-salesOverview-last30days": {
      get: {
        tags: ["Admin"],
        summary: "Get platform sales overview for the last 30 days",
        description:
          "Allows an admin to retrieve sales analytics, daily revenue series, total orders, average order value, and peak performance for the last 30 days. Emits real-time snapshot via Socket.IO.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description:
              "Sales overview for the last 30 days retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiSuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: "#/components/schemas/AdminRevenueGrowthResponse",
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
            description: "Forbidden - Unauthorized access",
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
    "/api-docs.json": {
      get: {
        tags: ["Health"],
        summary: "Get raw OpenAPI 3.0 specification",
        description:
          "Returns the raw OpenAPI 3.0 specification document in JSON format.",
        responses: {
          200: {
            description: "OpenAPI specification JSON object",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description: "OpenAPI 3.0 root document",
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
