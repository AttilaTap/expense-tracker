import { render, screen, fireEvent } from "@testing-library/react";
import CreateTransaction from "../CreateTransaction";
import { vi } from "vitest";

describe("CreateTransaction", () => {
  it("renders CreateTransaction form", () => {
    render(<CreateTransaction onTransactionCreated={vi.fn()} refresh={false} />);

    expect(screen.getByText("Add Transaction")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Transaction" })).toBeInTheDocument();
  });

  it("allows typing into Description and Amount fields", () => {
    render(<CreateTransaction onTransactionCreated={vi.fn()} refresh={false} />);

    const descriptionInput = screen.getByPlaceholderText("Description");
    const amountInput = screen.getByPlaceholderText("Amount");

    fireEvent.change(descriptionInput, { target: { value: "Coffee" } });
    fireEvent.change(amountInput, { target: { value: "5" } });

    expect(descriptionInput.value).toBe("Coffee");
    expect(amountInput.value).toBe("5");
  });
});
