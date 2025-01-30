import { create } from 'zustand';
import { type TableUser } from '../schema';

type TableUserState = {
  users: TableUser[];
  updateUsers: (users: TableUser[]) => void;
};

export const useTableUserStore = create<TableUserState>(set => ({
  users: [],
  updateUsers: users => set({ users }),
}));
