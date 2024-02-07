export type User = { username: string; password: string; roles?: string[] };

const users: Array<User> = [
  { username: "user1", password: "test12", roles: ["user"] },
  { username: "admin1", password: "test12", roles: ["admin"] },
];

const fakeAuthProvider = {
  isAuthenticated: false,
  signIn(user_: User): Promise<User> {
    const user: User | undefined = users.find(
      (u) => u.username === user_.username && u.password === user_.password
    );
    if (user) {
      this.isAuthenticated = true;
    }
    return new Promise((resolve, reject) => {
      if (user && this.isAuthenticated) {
        setTimeout(() => resolve(user), 500); // fake async
      } else {
        setTimeout(() => reject("Wrong username or password"), 500); // fake async
      }
    });
  },
  signOut() {
    return new Promise((resolve) => {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(resolve, 100);
    });
  },
};

export { fakeAuthProvider };
