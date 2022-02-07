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
