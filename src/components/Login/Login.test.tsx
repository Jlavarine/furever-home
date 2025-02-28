import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Login Page", () => {
    it("renders login form correctly", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText("Furever Home")).toBeInTheDocument();
        expect(screen.getByText("Enter Your Details")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Shaggy Rogers")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Shaggy@mysteryinc.com")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("shows error if fields are empty", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole("button", { name: /login/i });
        fireEvent.click(submitButton);

        expect(screen.getByText("Both fields are required.")).toBeInTheDocument();
    });

    it("shows error if email is invalid", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const nameInput = screen.getByPlaceholderText("Shaggy Rogers");
        const emailInput = screen.getByPlaceholderText("Shaggy@mysteryinc.com");
        const submitButton = screen.getByRole("button", { name: /login/i });

        fireEvent.change(nameInput, { target: { value: "Scooby" } });
        fireEvent.change(emailInput, { target: { value: "invalid-email" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    });
});
