import {  sidebar } from "../../constants/ApplicationRoutes";
import { ICollapse } from "../../interfaces/ICollapse";

export const menuItems: ICollapse[] = [
  {
    heading: "Home",
    route: sidebar,
    isOpen: false,
  },
  {
    heading: "Category",
    route: sidebar,
    isOpen: false,
  },
];
