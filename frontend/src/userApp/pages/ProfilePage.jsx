import React from "react";
import BasicInfoSection from "../components/section/BasicInfoSection";
import ContactInfoSection from "../components/section/ContactInfoSection";
import ProfileHeader from "../components/section/ProfileHeader";
import SecuritySection from "../components/section/SecuritySection";
import AddressSection from "../components/section/AddressSection";
import { useAuth } from "../features/auth/context/UserContext";

const ProfilePage = () => {
  // 🔥 1. Get 'address' directly from Context (Instant Load)
  const { user, address, loading } = useAuth();

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
            email: user.email,
            gender: user.gender || "-",
            dateOfBirth: user.dateOfBirth || "-",
          }}
        />

        <ContactInfoSection data={{ mobile: user.phone }} />

        {/* 🔥 2. Pass the context address directly */}
        <AddressSection
          address={address}
          loading={loading} // Uses global loading state
        />

        <SecuritySection />
      </div>
    </div>
  );
};

export default ProfilePage;
