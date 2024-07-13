export const login = async (username: string, password: string) => {
  // Mock login function
  return new Promise((resolve, reject) => {
    if (username === "user" && password === "password") {
      resolve({ token: "mock-token" });
    } else {
      reject("Invalid credentials");
    }
  });
};

export const logout = () => {
  // Mock logout function
  return new Promise((resolve) => {
    resolve(true);
  });
};
