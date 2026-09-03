import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../../pages/Home";
import { useAuth } from "../../hooks/useAuth";
import { useAlert } from "../../hooks/useAlert";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate-mock">{to}</div>,
}));

jest.mock("../../hooks/useAuth");
jest.mock("../../hooks/useAlert");

const mockLogin = jest.fn();
const mockShowError = jest.fn();
const mockShowSuccess = jest.fn();

describe("HomePage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      loading: false,
    });

    (useAlert as jest.Mock).mockReturnValue({
      showError: mockShowError,
      showSuccess: mockShowSuccess,
    });
  });

  const renderComponent = () => render(<HomePage />);

  it("renders page branding, headings, and input fields properly", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /Sign in to your account/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In to Dashboard/i })
    ).toBeInTheDocument();
  });

  it("toggles password visibility when clicking eye button", () => {
    renderComponent();

    const passwordInput = screen.getByLabelText(/^Password$/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleBtn = screen.getByRole("button", { name: /Show password/i });
    fireEvent.click(toggleBtn);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: /Hide password/i })
    ).toBeInTheDocument();
  });

  it("shows error when submitting empty fields", async () => {
    renderComponent();

    const submitBtn = screen.getByRole("button", {
      name: /Sign In to Dashboard/i,
    });
    fireEvent.click(submitBtn);

    expect(mockShowError).toHaveBeenCalledWith(
      "Please fill in both email and password fields."
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows error when email is not an @egyzon.com domain", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Work Email/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const submitBtn = screen.getByRole("button", {
      name: /Sign In to Dashboard/i,
    });

    fireEvent.change(emailInput, { target: { value: "user@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitBtn);

    expect(mockShowError).toHaveBeenCalledWith(
      "Please use your work email to login."
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login function with correct payload on valid submission", async () => {
    mockLogin.mockResolvedValueOnce({ success: true });

    renderComponent();

    const emailInput = screen.getByLabelText(/Work Email/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const submitBtn = screen.getByRole("button", {
      name: /Sign In to Dashboard/i,
    });

    fireEvent.change(emailInput, { target: { value: "admin@egyzon.com" } });
    fireEvent.change(passwordInput, { target: { value: "securePassword123" } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "admin@egyzon.com",
        password: "securePassword123",
      });
      expect(mockShowSuccess).toHaveBeenCalledWith("Logged in successfully.");
    });
  });

  it("shows error when login API call returns unsuccessful", async () => {
    mockLogin.mockResolvedValueOnce({
      success: false,
      message: "Invalid credentials.",
    });

    renderComponent();

    const emailInput = screen.getByLabelText(/Work Email/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const submitBtn = screen.getByRole("button", {
      name: /Sign In to Dashboard/i,
    });

    fireEvent.change(emailInput, { target: { value: "admin@egyzon.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith("Invalid credentials.");
    });
  });

  it("redirects to /dashboard when user is already authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: true,
      loading: false,
    });

    renderComponent();

    expect(screen.getByTestId("navigate-mock")).toHaveTextContent("/dashboard");
  });
});
