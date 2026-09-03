import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationModal from "../NotificationModal";
import type { NotificationPayload } from "../../hooks/useNotification";

describe("NotificationModal Component", () => {
  const mockNotifications: NotificationPayload[] = [
    {
      id: "1",
      title: "New Seller Registered",
      message: "Seller John Doe submitted an application",
      type: "info",
      timestamp: Date.now() - 60000,
    },
    {
      id: "2",
      title: "Order Approved",
      message: "Order #12345 successfully approved",
      type: "success",
      timestamp: Date.now() - 120000,
    },
  ];

  it("does not render when isOpen is false", () => {
    render(
      <NotificationModal
        isOpen={false}
        onClose={jest.fn()}
        notifications={mockNotifications}
        onClearAll={jest.fn()}
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders notifications correctly when isOpen is true", () => {
    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        notifications={mockNotifications}
        onClearAll={jest.fn()}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("New Seller Registered")).toBeInTheDocument();
    expect(screen.getByText("Order Approved")).toBeInTheDocument();
    expect(screen.getByText("Seller John Doe submitted an application")).toBeInTheDocument();
  });

  it("renders empty state when there are no notifications", () => {
    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        notifications={[]}
        onClearAll={jest.fn()}
      />
    );

    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("calls onClearAll when clear button is clicked", () => {
    const handleClearAll = jest.fn();
    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        notifications={mockNotifications}
        onClearAll={handleClearAll}
      />
    );

    const clearButton = screen.getByTitle("Clear all notifications");
    fireEvent.click(clearButton);
    expect(handleClearAll).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <NotificationModal
        isOpen={true}
        onClose={handleClose}
        notifications={mockNotifications}
        onClearAll={jest.fn()}
      />
    );

    const closeButton = screen.getByLabelText("Close notifications");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onMarkAsRead when clicking an unread notification", () => {
    const handleMarkAsRead = jest.fn();
    const notificationsWithUnread: NotificationPayload[] = [
      {
        id: "1",
        title: "Unread Alert",
        message: "This is unread",
        type: "warning",
        isRead: false,
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
      },
    ];

    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        notifications={notificationsWithUnread}
        onClearAll={jest.fn()}
        onMarkAsRead={handleMarkAsRead}
      />
    );

    const item = screen.getByText("Unread Alert");
    fireEvent.click(item);
    expect(handleMarkAsRead).toHaveBeenCalledWith("1");
  });

  it("calls onMarkAllAsRead when clicking the mark all read button", () => {
    const handleMarkAllAsRead = jest.fn();
    const unreadNotifications: NotificationPayload[] = [
      {
        id: "1",
        title: "Unread One",
        message: "Message 1",
        type: "info",
        isRead: false,
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
      },
    ];

    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        notifications={unreadNotifications}
        onClearAll={jest.fn()}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    );

    const markAllButton = screen.getByTitle("Mark all as read");
    fireEvent.click(markAllButton);
    expect(handleMarkAllAsRead).toHaveBeenCalledTimes(1);
  });

  it("renders loading state when isLoading is true and notifications are empty", () => {
    render(
      <NotificationModal
        isOpen={true}
        onClose={jest.fn()}
        notifications={[]}
        onClearAll={jest.fn()}
        isLoading={true}
      />
    );

    expect(screen.getByText("Loading notifications...")).toBeInTheDocument();
  });
});
