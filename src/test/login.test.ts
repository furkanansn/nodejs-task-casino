import authService from "../services/authService";

test("Login Test", async () => {
  let response = await authService.login({    
    body: {
      email: "ansinfurkan@icloud.com",
      password: "12345678"
    }
  });
  expect(response.success).toBe(true);
}, 30000);
