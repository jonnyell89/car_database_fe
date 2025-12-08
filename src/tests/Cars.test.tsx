import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import Cars from "../components/Cars";

const queryClient = new QueryClient({

    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

const wrapper = ({

    children } : { children: React.ReactNode }) => (
        <QueryClientProvider client = {queryClient}>
            {children}
        </QueryClientProvider>);

describe("Cars component tests", () => {
    test("component renders", () => {
        render(<Cars />, { wrapper });
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })
    
    test("Cars are fetched", async () => {
        render(<Cars />, { wrapper });
        await waitFor(() => screen.getByText(/New Car/i));
        expect(screen.getByText(/Ford/i)).toBeInTheDocument();
    })

    test("Open New Car modal", async () => {
        render(<Cars />, { wrapper });

        await waitFor(() => screen.getByText(/New Car/i));
        await userEvent.click(screen.getByText(/New Car/i));
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
    })
})
