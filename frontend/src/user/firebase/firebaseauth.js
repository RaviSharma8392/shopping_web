import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

// HUMAN-FRIENDLY ERROR MESSAGES
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

// SIGNUP (EMAIL + PASSWORD)
export const signupUser = async (form) => {
  try {
    const { email, password, firstName, lastName, mobile, address } = form;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    await sendEmailVerification(user);

    const userData = {
      uid: user.uid,
      email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      mobile: mobile || "",
      emailVerified: false,
      provider: "email",
      role: "user",
      createdAt: serverTimestamp(),

      // Single address field
      address: {
        name: address?.name || `${firstName} ${lastName}`,
        phone: address?.phone || mobile || "",
        line1: address?.line1 || "",
        locality: address?.locality || "",
        city: address?.city || "",
        state: address?.state || "",
        pincode: address?.pincode || "",
      },
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return userData; // return Firestore data
  } catch (err) {
    throw new Error(formatError(err.code));
  }
};



// LOGIN (EMAIL + PASSWORD)
export const loginUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    if (!user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    const userData = snap.exists()
      ? snap.data()
      : {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (err) {
    throw new Error(formatError(err.code));
  }
};

// GOOGLE SIGNUP / LOGIN

export const googleSignup = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const nameParts = user.displayName?.split(" ") || ["", ""];

    const userData = {
      uid: user.uid,
      email: user.email,
      firstName: nameParts[0],
      lastName: nameParts[1] || "",
      displayName: user.displayName || "",
      phone: user.phoneNumber || "",
      provider: "google",
      role: "user",
      emailVerified: user.emailVerified,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), userData, { merge: true });

    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (err) {
    throw new Error(err.message || "Google login failed.");
  }
};



// ADD OR UPDATE ADDRESS

export const addOrUpdateAddress = async (uid, newAddress) => {
  try {
    if (!uid) throw new Error("User ID is required.");
    
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found.");
    }

    // Merge new address with existing one if any
    const existingData = userSnap.data();
    const updatedAddress = {
      ...(existingData.address || {}),
      ...newAddress,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(userRef, { address: updatedAddress });

    return { ...existingData, address: updatedAddress };
  } catch (err) {
    throw new Error(err.message || "Failed to update address.");
  }
};