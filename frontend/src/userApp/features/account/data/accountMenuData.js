import { User, MapPin, Package, Heart, CreditCard } from "lucide-react";

export const accountMenuData = [
  {
    label: "My Profile",
    desc: "All your personal details",
    icon: User,
    path: "/user/profile",
  },
  {
    label: "My Orders",
    desc: "All your confirmed orders",
    icon: Package,
    path: "/user/orders",
  },
  {
    label: "My Wishlist",
    desc: "All your curated favorites",
    icon: Heart,
    path: "/user/wishlist",
  },
  {
    label: "My Addresses",
    desc: "All your saved locations",
    icon: MapPin,
    path: "/user/address",
  },
  {
    label: "My Bank Account",
    desc: "Manage your saved bank accounts",
    icon: CreditCard,
    path: "/user/bank",
  },
];
