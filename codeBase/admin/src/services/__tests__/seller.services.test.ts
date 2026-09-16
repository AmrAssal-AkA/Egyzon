import {
  getPendingSellerApplications,
  mapApiSellerApplicationToSeller,
} from "../seller.services";
import { serverClient } from "../../lib/serverClient";
import type { ApiSellerApplication } from "../../types/seller";

jest.mock("../../lib/serverClient", () => ({
  serverClient: {
    get: jest.fn(),
  },
}));

describe("seller.services - getPendingSellerApplications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sampleApplicationPayload: ApiSellerApplication = {
    _id: "66e7ea83b123",
    firstName: "Mohamed",
    lastName: "Hassan",
    email: "mohamed@example.com",
    role: "customer",
    phoneNumber: "+201001234567",
    isBlocked: false,
    isVerified: true,
    storeName: "Egyzon Store",
    commercialRegisterNumber: "CR-123456",
    taxCardNumber: "TC-987654",
    sellerDocuments: {
      commercialRegisterUrl: "https://res.cloudinary.com/.../cr.jpg",
      taxCardUrl: "https://res.cloudinary.com/.../tax.jpg",
    },
    applicantStatus: "pending",
    notes: "New submission",
    createdAt: "2026-09-16T08:37:39.788Z",
  };

  it("correctly maps flattened ApiSellerApplication to Seller", () => {
    const seller = mapApiSellerApplicationToSeller(sampleApplicationPayload);

    expect(seller.id).toBe("66e7ea83b123");
    expect(seller.storeName).toBe("Egyzon Store");
    expect(seller.businessId).toBe("CR-123456");
    expect(seller.ownerName).toBe("Mohamed Hassan");
    expect(seller.ownerEmail).toBe("mohamed@example.com");
    expect(seller.phoneNumber).toBe("+201001234567");
    expect(seller.status).toBe("pending");
    expect(seller.commercialRegisterImage).toBe(
      "https://res.cloudinary.com/.../cr.jpg"
    );
    expect(seller.taxCardImage).toBe("https://res.cloudinary.com/.../tax.jpg");
    expect(seller.notes).toBe("New submission");
    expect(seller.submittedAt).toBeDefined();
    expect(seller.submittedRelative).toBeDefined();
  });

  it("calls /seller-applications/pending with default pagination params and parses data.applications", async () => {
    (serverClient.get as jest.Mock).mockResolvedValue({
      data: {
        success: true,
        message: "Request completed successfully",
        data: {
          applications: [sampleApplicationPayload],
        },
      },
    });

    const response = await getPendingSellerApplications();

    expect(serverClient.get).toHaveBeenCalledWith(
      "/seller-applications/pending",
      { params: { page: 1, limit: 5 } }
    );
    expect(response.success).toBe(true);
    expect(response.data?.sellers).toHaveLength(1);
    expect(response.data?.sellers[0].storeName).toBe("Egyzon Store");
    expect(response.data?.pagination.page).toBe(1);
    expect(response.data?.pagination.limit).toBe(5);
  });

  it("passes custom pagination parameters when provided", async () => {
    (serverClient.get as jest.Mock).mockResolvedValue({
      data: {
        success: true,
        message: "Request completed successfully",
        data: {
          applications: [sampleApplicationPayload],
          pagination: {
            page: 2,
            limit: 10,
            total: 25,
            totalPages: 3,
          },
        },
      },
    });

    const response = await getPendingSellerApplications({ page: 2, limit: 10 });

    expect(serverClient.get).toHaveBeenCalledWith(
      "/seller-applications/pending",
      { params: { page: 2, limit: 10 } }
    );
    expect(response.data?.pagination.page).toBe(2);
    expect(response.data?.pagination.limit).toBe(10);
    expect(response.data?.pagination.total).toBe(25);
    expect(response.data?.pagination.totalPages).toBe(3);
  });
});
