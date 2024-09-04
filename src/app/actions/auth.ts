import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { TRegisterForm } from "../(main)/register/client";
import { auth, db } from "@/services/next-firebase-auth-edge/config";

export type TLoginForm = {
  email: string;
  password: string;
};

export async function loginWithEmailAndPassword(data: TLoginForm) {
  let response: Response | null = null;
  let error: Error | null = null;
  const { email, password } = data;
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await credential.user.getIdToken();
    response = await fetch("/api/login", {
      headers: { Authorization: `Bearer ${idToken}` },
    });
  } catch (err) {
    error = err as Error;
    console.error(err);
  }
  return { response, error };
}

export async function registerWithEmailAndPassword(data: TRegisterForm) {
  let isRegistered: boolean | null = null;
  let error: Error | null = null;
  const { name, email, password } = data;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    isRegistered = !!user;
  } catch (err) {
    error = err as Error;
    console.error(err);
  }
  return { isRegistered, error };
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
}

export async function logout() {
  signOut(auth);
  await fetch("/api/logout");
}
