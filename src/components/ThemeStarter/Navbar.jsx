import React from "react";
import { HiOutlineUser } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { storeId } from "../../utils/utils";
import { Reorder } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [links, setLinks] = useState([
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ]);
  return (
    <div className="w-full flex flex-col items-center justify-start gap-0 px-5 md:px-20">
      {/* Banner */}
      <div className="w-full h-8"></div>
      <div
        style={{
          zIndex: 50,
        }}
        id="navBarBanner"
        className="w-full p-2 h-8 flex items-center justify-center bg-base-300 absolute top-0 left-0 right-0"
      >
        <p className="text-sm font-light">
          Midseason Sale: 20% Off — Auto Applied at Checkout — Limited Time Only
        </p>
      </div>

      {/* Navbar */}
      <div
        className={`w-full h-24 flex flex-row justify-between items-center hover:border-2 border-primary `}
      >
        {/* Logo */}
        <div className="w-1/3">
          <h1 className="text-2xl">Logo</h1>
        </div>

        {/* Pages */}
        <div className="w-1/3">
          <input
            className="input input-bordered w-80 hidden"
            placeholder="Search ..."
          />
          <Reorder.Group
            values={links}
            axis="x"
            onReorder={setLinks}
            className="flex flex-row justify-center items-center gap-2 w-full"
          >
            {links.map((item, index) => {
              return (
                <Reorder.Item
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  value={item}
                  key={item.link}
                >
                  <button
                    key={index}
                    href={`${item.link}`}
                    className="btn btn-ghost btn-sm font-normal"
                  >
                    {item.name}
                  </button>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>

        <div className="w-1/3 flex flex-row justify-end items-center gap-2 h-full">
          {/* Dropdown For Language Switching */}
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex="0" className="m-1 btn btn-ghost btn-sm font-light">
              EN
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-36"
            >
              <li>
                <a>ES</a>
              </li>
              <li>
                <a>FR</a>
              </li>
            </ul>
          </div>
          <button className="btn btn-sm btn-ghost">
            <TbSearch />
          </button>
          <button className="btn btn-sm btn-ghost">
            <HiOutlineUser />
          </button>
          <button className="btn btn-sm btn-ghost">
            <IoCartOutline />
          </button>
        </div>
      </div>

      <div className="w-full h-[2px] bg-base-300 "></div>

      {/* Categories */}
      <div className="flex flex-row items-center justify-start gap-2 w-full h-10">
        {[
          {
            name: "T-Shirts",
            link: "/t-shirts",
          },
          {
            name: "Pants",
            link: "/pants",
          },
          {
            name: "Shoes",
            link: "/shoes",
          },
          {
            name: "Accessories",
            link: "/accessories",
          },
        ].map((el) => {
          return (
            <a href={el?.link} className="btn btn-ghost btn-xs font-normal">
              {el?.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
