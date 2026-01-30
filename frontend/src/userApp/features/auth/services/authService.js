import { auth, db } from "../../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

/* ==============================
   ERROR MESSAGES
============================== */
const formatError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-not-verified":
      return "Please verify your email before logging in.";
    default:
      return "Something went wrong. Please try again.";
  }
};

/* ==============================
   SIGNUP (EMAIL)
============================== */
export const signupUser = async ({ email, password, name, phone }) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    await updateProfile(user, { displayName: name });
    await sendEmailVerification(user);

    const userDoc = {
      uid: user.uid,
      role: "user",
      provider: "email",
      isBlocked: false,

      name,
      email,
      phone: phone || "",
      emailVerified: false,

      defaultAddressId: null,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userDoc);

    return userDoc;
  } catch (err) {
    throw new Error(formatError(err.code));
  }
};

/* ==============================
   LOGIN (EMAIL)
============================== */
export const loginUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    if (!user.emailVerified) {
      const e = new Error();
      e.code = "auth/email-not-verified";
      throw e;
    }

    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) throw new Error("User record missing.");

    return snap.data();
  } catch (err) {
    throw new Error(formatError(err.code) || err.message);
  }
};

/* ==============================
   GOOGLE SIGNUP / LOGIN
============================== */
export const googleSignup = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = {
      uid: user.uid,
      role: "user",
      provider: "google",
      isBlocked: false,

      name: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
      emailVerified: user.emailVerified,

      defaultAddressId: null,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userDoc, { merge: true });
    return userDoc;
  } catch (err) {
    throw new Error("Google login failed.");
  }
};

/* ==============================
   ADD ADDRESS (SUBCOLLECTION)
============================== */
export const addAddress = async (uid, address) => {
  if (!uid) throw new Error("UID required");

  const addressRef = doc(
    collection(db, "users", uid, "addresses")
  );

  const addressData = {
    id: addressRef.id,
  
    line1: address.line1,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    isDefault: address.isDefault ?? false,
    createdAt: serverTimestamp(),
  };

  await setDoc(addressRef, addressData);

  if (addressData.isDefault) {
    await updateDoc(doc(db, "users", uid), {
      defaultAddressId: addressRef.id,
      updatedAt: serverTimestamp(),
    });
  }

  return addressData;
};

/* ==============================
   CHANGE PASSWORD
============================== */
export const changePassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const cred = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, newPassword);

  return "Password updated";
};

/* ==============================
   UPDATE PROFILE
============================== */
export const updateProfileData = async (uid, updates) => {
  if (!uid) throw new Error("UID required");

  const allowedFields = {
    name: updates.name,
    gender: updates.gender,
    dateOfBirth: updates.dateOfBirth,
    phone: updates.phone,
  };

  // Remove undefined fields
  Object.keys(allowedFields).forEach(
    (k) => allowedFields[k] === undefined && delete allowedFields[k]
  );

  // Update Firestore
  await updateDoc(doc(db, "users", uid), {
    ...allowedFields,
    updatedAt: serverTimestamp(),
  });

  // Update Firebase Auth displayName if name is updated
  if (allowedFields.name) {
    await updateProfile(auth.currentUser, {
      displayName: allowedFields.name,
    });
  }

  return allowedFields;
};


/* ==============================
   FORGOT PASSWORD
============================== */
export const forgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return "Password reset email sent";
};
