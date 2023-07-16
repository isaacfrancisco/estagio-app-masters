import { createUserAccess, signInUserAccess, signOutUserAccess } from '../dataAccess/authAccess';

export async function createUserAction({ email, password }: { email: string; password: string }) {
  return await createUserAccess({ email, password });
}

export async function signInUserAction({ email, password }: { email: string; password: string }) {
  return await signInUserAccess({ email, password });
}

export async function signOutUserAction() {
  return await signOutUserAccess();
}
