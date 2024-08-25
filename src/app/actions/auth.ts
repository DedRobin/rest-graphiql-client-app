import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { TRegisterForm } from "../(main)/register/client";

export type TLoginForm = {
  email: string;
  password: string;
};

export async function loginWithEmailAndPassword(data: TLoginForm) {
  const { email, password } = data;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
}

export async function registerWithEmailAndPassword(data: TRegisterForm) {
  const { name, email, password } = data;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
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
}
