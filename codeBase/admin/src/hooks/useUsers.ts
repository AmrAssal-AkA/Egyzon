import useSWR from "swr";

import { getUsers } from "../services/user.services";
import type { User } from "../types/user";

const USERS_SWR_KEY = "users";

interface UseUsersResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<User[] | undefined>;
}

export function useUsers(): UseUsersResult {
  const { data, error, isLoading, mutate } = useSWR<User[]>(USERS_SWR_KEY, async () => {
    const response = await getUsers();

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data ?? [];
  });

  return {
    users: data ?? [],
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
}
