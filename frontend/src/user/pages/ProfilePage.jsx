import ProfileHeader from "../code/section/ProfileHeader";
import BasicInfoSection from "../code/section/BasicInfoSection";
import ContactInfoSection from "../code/section/ContactInfoSection";
import SecuritySection from "../code/section/SecuritySection";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  //   console.log(user);
  if (!user) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="font-[Poppins]">
      <div className="bg-white md:rounded-2xl shadow-sm overflow-hidden">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        <div className="px-6 md:py-4">
          <h2 className="text-xl font-[crimsonPro] text-gray-900">
            My Profile
          </h2>
        </div>

        <BasicInfoSection
          data={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender || "-",
            dateOfBirth: user.dateOfBirth || "-",
          }}
        />

        <ContactInfoSection data={{ mobile: user.mobile }} />

        <SecuritySection />
      </div>
    </div>
  );
};

export default ProfilePage;
