import { lazy } from "react";

// Lazy load each icon set
const AiIcons = lazy(() => import("react-icons/ai"));
const BiIcons = lazy(() => import("react-icons/bi"));
const FaIcons = lazy(() => import("react-icons/fa"));
const GiIcons = lazy(() => import("react-icons/gi"));
const GoIcons = lazy(() => import("react-icons/go"));
const GrIcons = lazy(() => import("react-icons/gr"));
const HiIcons = lazy(() => import("react-icons/hi"));
const ImIcons = lazy(() => import("react-icons/im"));
const IoIcons = lazy(() => import("react-icons/io"));
const Io5Icons = lazy(() => import("react-icons/io5"));
const MdIcons = lazy(() => import("react-icons/md"));

const allIcons = {
  AiIcons,
  BiIcons,
  FaIcons,
  GiIcons,
  GoIcons,
  GrIcons,
  HiIcons,
  ImIcons,
  IoIcons,
  Io5Icons,
  MdIcons,
};

export default allIcons;
