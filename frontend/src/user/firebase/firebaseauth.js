import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

// Convert Firebase errors into human readable form
const formatError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    default:
      return "Something went wrong. Please try again.";
  }
};

// -------------------- SIGNUP --------------------
export const signupUser = async (form) => {
  try {
    const { email, password, firstName, lastName, mobile } = form;

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Send Email Verification
    await sendEmailVerification(user);

    // Save user in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
      mobile,
      createdAt: serverTimestamp(),
    });

    return true;
  } catch (err) {
    throw new Error(formatError(err.code));
  }
};

// -------------------- LOGIN --------------------
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    throw new Error(formatError(err.code));
  }
};
