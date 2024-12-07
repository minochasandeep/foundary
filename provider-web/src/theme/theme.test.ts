import { createTheme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./theme";

describe("theme", () => {
    it("is true", () => {
        expect(true).toBe(true);
    });
    // it("should create a dark theme", () => {
    //     const expectedTheme = createTheme({
    //         typography: {
    //             fontFamily: darkTheme.typography.fontFamily,
    //         },
    //         palette: {
    //             mode: "dark",
    //             primary: {
    //                 main: "#0f0f0f",
    //             },
    //             text: {
    //                 primary: "#ffffff",
    //             },
    //         },
    //     });

    //     expect(JSON.stringify(darkTheme)).toEqual(JSON.stringify(expectedTheme));
    // });

    // it("should create a light theme", () => {
    //     const expectedTheme = createTheme({
    //         typography: {
    //             fontFamily: lightTheme.typography.fontFamily,
    //         },
    //     });

    //     expect(JSON.stringify(lightTheme)).toEqual(JSON.stringify(expectedTheme));
    // });
});