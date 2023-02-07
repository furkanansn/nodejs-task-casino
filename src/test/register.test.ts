import authService from "../services/authService";

test("Register Test", async () => {
  let response = await authService.register({    
    body: {
      name : "test",
      email: (Math.random() + 1).toString(36).substring(7) + "@gmail.com",
      password: "12345678"
    }
  });
  expect(response.success).toBe(true);
}, 30000);
