import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  role: "admin" | "super-admin";
  is_new_account?: boolean;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (user: User, router?: any) => void;
  signOut: (router?: any) => Promise<void>;
  checkAuth: (requireAuth?: boolean, router?: any) => Promise<boolean>;
  verifyAuthWithServer: (router?: any) => Promise<boolean>;
  getAuthToken: () => string | null;
  initialize: (requireAuth?: boolean, router?: any) => void;
  updateIsNewAccount: (isNewAccount: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      signIn: (user, router) => {
        console.log("Signed User Data: ");
        console.log(user);

        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem(
          "isNewAccount",
          user.is_new_account ? "true" : "false"
        );

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        if (router) {
          if (user.role === "super-admin") {
            router.push("/admin?panel=admin-manage");
          } else if (user.role === "admin") {
            router.push("/admin?panel=about-us");
          }
        }
      },

      signOut: async (router) => {
        try {
          const response = await fetch("/api/auth/signout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            localStorage.removeItem("userRole");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("authToken");

            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });

            if (router) {
              router.push("/login");
            }

            return Promise.resolve();
          } else {
            throw new Error("Failed to sign out");
          }
        } catch (error) {
          console.error("Sign out error:", error);
          return Promise.reject(error);
        }
      },

      checkAuth: async (requireAuth = true, router) => {
        set({ isLoading: true });

        const userRole = localStorage.getItem("userRole");
        const userId = localStorage.getItem("userId");
        const userEmail = localStorage.getItem("userEmail");
        const isNewAccount = localStorage.getItem("isNewAccount") === "true";

        if (userRole && userId && userEmail) {
          set({
            user: {
              id: userId,
              email: userEmail,
              role: userRole as "admin" | "super-admin",
              is_new_account: isNewAccount,
            },
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });

          if (requireAuth && router) {
            router.push("/login");
          }
          return false;
        }
      },

      verifyAuthWithServer: async (router) => {
        try {
          const response = await fetch("/api/auth/verify", {
            method: "GET",
            credentials: "include",
          });

          const data = await response.json();

          if (response.ok && data.isValid) {
            // Token is valid, update user data if needed
            const { user } = data;
            const currentUser = get().user;

            // Update localStorage if server data differs
            if (
              !currentUser ||
              currentUser.id !== user.id ||
              currentUser.email !== user.email ||
              currentUser.role !== user.role
            ) {
              localStorage.setItem("userRole", user.role);
              localStorage.setItem("userId", user.id);
              localStorage.setItem("userEmail", user.email);

              set({
                user: {
                  id: user.id,
                  email: user.email,
                  role: user.role,
                },
                isAuthenticated: true,
              });
            }

            return true;
          } else {
            // Token is invalid or expired
            console.warn("Authentication verification failed:", data.error);

            // Clear local storage and state
            localStorage.removeItem("userRole");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("authToken");

            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });

            // Redirect to login
            if (router) {
              router.push("/login");
            }

            return false;
          }
        } catch (error) {
          console.error("Error verifying authentication:", error);

          // On network error, clear auth and redirect
          localStorage.removeItem("userRole");
          localStorage.removeItem("userId");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("authToken");

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });

          if (router) {
            router.push("/login");
          }

          return false;
        }
      },

      getAuthToken: () => {
        return null;
      },

      updateIsNewAccount: (isNewAccount) => {
        const currentUser = get().user;
        if (currentUser) {
          localStorage.setItem("isNewAccount", isNewAccount ? "true" : "false");
          set({
            user: {
              ...currentUser,
              is_new_account: isNewAccount,
            },
          });
        }
      },

      initialize: (requireAuth = false, router) => {
        const userRole = localStorage.getItem("userRole");
        const userId = localStorage.getItem("userId");
        const userEmail = localStorage.getItem("userEmail");
        const isNewAccount = localStorage.getItem("isNewAccount") === "true";

        if (userRole && userId && userEmail) {
          set({
            user: {
              id: userId,
              email: userEmail,
              role: userRole as "admin" | "super-admin",
              is_new_account: isNewAccount,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });

          if (requireAuth && router) {
            router.push("/login");
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
