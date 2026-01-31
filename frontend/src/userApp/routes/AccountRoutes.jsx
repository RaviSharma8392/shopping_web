import { Route, Routes } from "react-router-dom";
import AccountLayout from "../layouts/AccountLayout";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../features/userProfile/pages/EditProfilePage";

export default function AccountRoutes() {
  return (
    <Routes>
      <Route element={<AccountLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="profile/edit" element={<EditProfilePage />} />
    </Routes>
  );
}
