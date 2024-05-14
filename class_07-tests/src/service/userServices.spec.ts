import {describe, expect, it} from "vitest";
import { userServices } from "./userServices";
import { userRepositoryInMemory } from "../repositories/userRepositoryInMemory";

describe("test userCreat", () => {
    it("should create user", async () => {
        const user = {
            id: "199",
            name: "pedin_rapadura",
            email:"p@gmail.com",
        }

        const userTest = await userServices.create(user, userRepositoryInMemory);
        
        expect(userTest).toHaveProperty("id");
    });
});