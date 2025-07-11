export {};

declare global {
  interface Window {
    electronAPI: {
      saveUser: (user: { name: string; email: string }) => Promise<{ success: boolean; error?: string }>;
      getUsers: () => Promise<Array<{ id: number; name: string; email: string }>>;
    };
  }
}