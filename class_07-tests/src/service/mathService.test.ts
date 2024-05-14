import { describe, expect, it, test } from "vitest"
import { squareNumber } from "./mathService";

describe("test square", () => {
    test("64 bro",() => {
        expect(squareNumber(4, 3)).toEqual(64);
    });

    it("64 bro",() => {
        expect(squareNumber(3, 3)).toEqual(27);
    });
})
