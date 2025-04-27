import React from 'react';
import { render, screen } from "@testing-library/react";
import FilterBar from "../FilterBar";
import { vi } from "vitest";

describe("FilterBar", () => {
  it("renders FilterBar without crashing", () => {
    render(<FilterBar onFilterChange={vi.fn()} refresh={false} />);

    expect(screen.getByText("Filter Transactions")).toBeInTheDocument();
  });
});
