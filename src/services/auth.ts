import api from "@/lib/axios";
import type { User } from "@/types";

export async function getProfile() {
  const response = await api.get<{
    user: User;
  }>("/auth/me");

  return response.data;
}

export async function login(params: { email: string; password: string }) {
  const response = await api.post<{
    token: string;
    user: User;
  }>("/auth/sign-in", params);

  return response.data;
}

export async function logout() {
  const response = await api.post<{
    message: string;
  }>("/auth/logout");

  return response.data;
}

export async function register(params: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await api.post<{
    message: string;
  }>("/auth/register", params);

  return response.data;
}
