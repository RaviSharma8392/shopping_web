import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import BasicInfoSection from "../components/section/BasicInfoSection";
import ContactInfoSection from "../components/section/ContactInfoSection";
import ProfileHeader from "../components/section/ProfileHeader";
import SecuritySection from "../components/section/SecuritySection";
import AddressSection from "../components/section/AddressSection";
import { useAuth } from "../features/auth/context/UserContext";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);

  /* ===============================
     Load address when addressId changes
  =============================== */
  useEffect(() => {
    if (!user?.defaultAddressId) {
      setAddress(null);
      return;
    }

    const loadAddress = async () => {
      setAddressLoading(true);
      try {
        const ref = doc(db, "addresses", user.defaultAddressId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setAddress({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Failed to load address:", err);
      } finally {
        setAddressLoading(false);
      }
    };

    loadAddress();
  }, [user?.defaultAddressId]);

  /* ===============================
     UI Guards
  =============================== */
  if (loading) return <h2 className="p-6">Loading...</h2>;
  if (!user) return <h2 className="p-6">Not logged in</h2>;

  return (
    <div className="font-[Poppins]">
      <div className="bg-white md:rounded-2xl shadow-sm overflow-hidden">
        <ProfileHeader user={user} />

        <div className="px-6 md:py-4">
          <h2 className="text-xl font-[crimsonPro] text-gray-900">
            My Profile
          </h2>
        </div>

        <BasicInfoSection
          data={{
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender || "-",
            dateOfBirth: user.dateOfBirth || "-",
          }}
        />

        <ContactInfoSection data={{ mobile: user.phone }} />

        <AddressSection address={address} loading={addressLoading} />

        <SecuritySection />
      </div>
    </div>
  );
};

export default ProfilePage;
