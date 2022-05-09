import { expect } from "chai";
import { v4 as uuid } from 'uuid';
import { signUp } from "./test-apis";

describe("end to end singUp test", () => {
    
    it("should return the user and token after sing up", async () => {
        const userData = {
            userId: uuid(),
            userRoles: ["user"],  
            userFullname: "jose",
            userEmail: `${uuid().slice(0,2)}user@example.com`, 
            userPassword: `123456Jm.`,
            userConfirmEmail: false,
        }
        const result = await signUp(userData);
        expect(result.data.data.signUp).to.have.property("user");
        expect(result.data.data.signUp).to.have.property("token");
        expect(result.data.data.signUp.user).to.have.property("user_email");
        expect(result.data.data.signUp.user).to.have.property("user_fullname");
        expect(result.data.data.signUp.user).to.have.property("user_id");
        expect(result.data.data.signUp.user).to.have.property("user_confirm_email");    
           
    }).timeout(20000)

    it("should return an error because the credentials do not pass the email or password validation", async () => {
        const userData = {
            userId: uuid(),
            userRoles: ["user"],  
            userFullname: "jose",
            userEmail: `auser@example.com`, 
            userPassword: `123456Jm`,
            userConfirmEmail: false,
        }
        const result = await signUp(userData);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("The credentials are invalid");
  
    }).timeout(20000)

    it("should return an error because there is a user with the same email", async () => {
        const userData = {
            userId: uuid(),
            userRoles: ["user"],  
            userFullname: "jose",
            userEmail: `user@example.com`, 
            userPassword: `123456Jm.`,
            userConfirmEmail: false,
        }
        const result = await signUp(userData);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("There is a user with this email already");
  
    }).timeout(20000)
})