import { MdDashboard, MdPeopleAlt, MdCategory, MdOutlineCompareArrows } from "react-icons/md";

export const sidebarItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: MdDashboard,
  },
  {
    label: "Pessoas",
    path: "/people",
    icon: MdPeopleAlt,
  },
  {
    label: "Categorias",
    path: "/categories",
    icon: MdCategory,
  },
  {
    label: "Transações",
    path: "/transactions",
    icon: MdOutlineCompareArrows,
  },
];