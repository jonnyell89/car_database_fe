import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

describe("App component tests", () => {
    test("component renders", () => {
        render(<App />);
        expect(screen.getByText(/Car Database/i)).toBeInTheDocument();
    })
})
