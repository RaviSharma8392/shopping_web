import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../config/firebase";

/**
 * Edit user profile in Firestore
 * @param {string} uid - Firebase UID
 * @param {object} updates - Only editable fields: name, gender, dateOfBirth
 */
export const editUserProfile = async (uid, updates) => {
  if (!uid) throw new Error("UID is required");

  // only allow editable fields
  const allowedFields = {
    name: updates.name,
    gender: updates.gender,
    dateOfBirth: updates.dateOfBirth,
    updatedAt: serverTimestamp(),
  };

  // filter out undefined values
  const fieldsToUpdate = Object.fromEntries(
    Object.entries(allowedFields).filter(([_, v]) => v !== undefined)
  );

  await updateDoc(doc(db, "users", uid), fieldsToUpdate);

  return fieldsToUpdate;
};
