import create from "zustand";

interface NavState {
  isOpen: boolean;
}

interface INavStore extends NavState {
  setIsOpen: (value: boolean) => void;
}

export const useNavStore = create<INavStore>((set) => ({
  isOpen: false,
  setIsOpen: (value) => {
    set((state) => {
      return {
        isOpen: value,
      };
    });
  },
}));

interface UserState {
  id: string;
  name: string;
  email: string;
  photo: string;
  isAdmin: boolean;
}

interface UserStateStore extends UserState {
  setUserState: (UserState: UserState) => void;
  setAdmin: (state: boolean) => void;
  restoreAuth: () => void;
  logOut: () => void;
}

export const useUserStore = create<UserStateStore>((set) => {
  return {
    id: "",
    name: "",
    email: "",
    photo: "",
    isAdmin: false,
    setUserState: ({ id, email, name, photo, isAdmin }: UserState) => {
      localStorage.setItem(
        "iverson-holly",
        JSON.stringify({ id, email, name, photo, isAdmin })
      );

      set({ id, email, name, photo, isAdmin });
    },
    setAdmin: (state) => {
      set({ isAdmin: state });
    },
    restoreAuth: () => {
      const currentAuth = JSON.parse(
        localStorage.getItem("iverson-holly") as string
      );

      if (currentAuth) {
        set(currentAuth);
      }
    },
    logOut: () => {
      localStorage.setItem("iverson-holly", JSON.stringify(null));
      set({ id: "", email: "", name: "", photo: "", isAdmin: false });
    },
  };
});
