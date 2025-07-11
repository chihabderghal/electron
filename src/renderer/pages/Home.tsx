import React, { useEffect, useState } from "react";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<
    Array<{ id: number; name: string; email: string }>
  >([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const loadedUsers = await window.electronAPI.getUsers();
        setUsers(loadedUsers);
      } catch (error) {
        console.error("Error loading users:", error);
        setError("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name || !email) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      const result = await window.electronAPI.saveUser({ name, email });

      if (!result.success) {
        setError(result.error || "Failed to save user");
        return;
      }

      const updatedUsers = await window.electronAPI.getUsers();
      setUsers(updatedUsers);
      setName("");
      setEmail("");
      setSuccessMessage("User saved successfully!");
    } catch (error) {
      console.error("Error saving user:", error);
      setError("Failed to save user");
    } finally {
      setIsLoading(false);
    }
  };

  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t("Welcome to React")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save User"}
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
        </form>

        <Separator className="my-4" />
        <h2 className="text-lg font-semibold mb-3">User List</h2>

        {isLoading && users.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center">
            Loading users...
          </p>
        ) : users.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center">
            No users found
          </p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <Card key={user.id} className="p-3">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
