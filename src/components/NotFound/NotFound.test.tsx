import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate,
}));

describe("NotFound Page", () => {
    test("renders correctly with 404 message and button", () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );
        expect(screen.getByText("404")).toBeInTheDocument();
        expect(screen.getByText("Oops! The page you are looking for does not exist.")).toBeInTheDocument();
        const goToLoginButton = screen.getByRole("button", { name: /go to login/i });
        expect(goToLoginButton).toBeInTheDocument();
    });

    test("navigates to login page when button is clicked", async () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );

        const goToLoginButton = screen.getByRole("button", { name: /go to login/i });

        await userEvent.click(goToLoginButton);

        expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
});
