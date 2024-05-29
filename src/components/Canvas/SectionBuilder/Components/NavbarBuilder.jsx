import { BiSearch, BiShoppingBag } from "react-icons/bi";
import { IoGlobe } from "react-icons/io5";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useActiveBreakpoint, useTheme } from "../../../../utils/utils";

export default function NavbarBuilder() {
  const breakpoint = useActiveBreakpoint();

  const theme = useTheme();

  const nav = useNavigate();

  const layout =
    theme?.layout[
      breakpoint === "lg"
        ? "desktop"
        : breakpoint === "md"
        ? "tablet"
        : "mobile"
    ];

  return (
    <>
      <div
        style={{
          paddingRight:
            layout?.pagePadding ?? breakpoint === "lg" ? "2.5rem" : "1.5rem",
          paddingLeft:
            layout?.pagePadding ?? breakpoint === "lg" ? "2.5rem" : "1.5rem",
        }}
        className="flex  flex-row justify-between items-center w-full absolute  h-24 shadow-sm top-0 start-0 z-50"
      >
        <div className="flex flex-row justify-center items-center">
          <h1
            onClick={() => {
              nav("/");
            }}
            className="text-xl text-center font-medium btn btn-ghost btn-sm"
          >
            Store
          </h1>
        </div>

        {/* {breakpoint == "lg" && (
          <div className="w-full flex flex-row justify-center items-center gap-5">
            {[
              {
                name: "Home",
                url: "/",
              },
              {
                name: "Home",
                url: "/",
              },
              {
                name: "Home",
                url: "/",
              },
              {
                name: "Home",
                url: "/",
              },
            ].map((el, index) => {
              return (
                <button
                  key={index + el?.name}
                  className="btn btn-ghost btn-sm font-normal"
                >
                  {el?.name}
                </button>
              );
            })}
          </div>
        )} */}

        {breakpoint == "lg" || breakpoint == "md" ? (
          <div className="flex flex-row justify-end items-center gap-5">
            {/* Dropdown */}
            <div className="dropdown dropdown-hover dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm flex flex-row  gap-1 justify-center items-center"
              >
                <IoGlobe />
                <span>EN</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>

            {/* Divider */}
            <div className="w-[2px] h-[3rem] bg-base-200"></div>

            {[
              {
                name: <BiSearch className="text-xl" />,
                url: "/",
              },
              {
                name: <MdAccountCircle className="text-xl" />,
                url: "/",
              },
              {
                name: <BiShoppingBag className="text-xl" />,
                url: "/",
              },
            ].map((el) => {
              return (
                <button className="btn btn-ghost btn-sm font-normal">
                  {el?.name}
                </button>
              );
            })}
          </div>
        ) : (
          <button className="btn btn-ghost btn-sm">
            <MdMenu />
          </button>
        )}
      </div>
      <div className="h-5 w-full"></div>
    </>
  );
}
