"use client";

import Link from "next/link";
import Image from "next/image";
import cookie from "js-cookie";
import { redirect, usePathname } from "next/navigation";
import { RiMenu4Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { TbLogout2, TbSmartHome } from "react-icons/tb";
import { LuLayoutList } from "react-icons/lu";
import { verifyToken } from "../api/verifyToken";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    verifyToken().then((res) => {
      if (!res) {
        redirect("/login");
      }
    });
  });

  const pathname = usePathname();
  const sideBtnCss = `w-full h-12 rounded-xl text-md
    transition-all duration-200 ease-in-out`;
  const sideBtnCssOpt = sideBtnCss + ` bg-white mt-4 hover:bg-neutral-200`;
  const sideBtnForM = `block text-right text-[1.2rem] my-4 mr-12`;
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = function () {
    cookie.remove("token");
    cookie.remove("username");
    redirect("/login");
  };

  return (
    <div className="flex flex-nowrap flex-col md:flex-row md:h-full w-full h-auto bg-gray-100 text-neutral-800">
      {/* sidebar for client */}
      <div className="md:block hidden flex-none w-[16rem] m-6 relative">
        <div className="flex flex-col h-full">
          <div className="flex-none rounded-2xl">
            <h1 className="text-[2rem] text-red-400 font-bold text-center">
              物料管理系统
            </h1>
            <hr className="mt-6 mb-3 mx-12" />
          </div>
          <div className="flex-grow overflow-y-auto">
            <Link href="/home">
              <button
                className={`${sideBtnCssOpt} ${
                  pathname === "/home"
                    ? "text-red-400 font-bold"
                    : "text-neutral-800 hover:text-neutral-950"
                }`}
              >
                <TbSmartHome className="inline-block mr-2 mb-1" />
                首页
              </button>
            </Link>
            <Link href="/materials">
              <button
                className={`${sideBtnCssOpt} ${
                  pathname === "/materials"
                    ? "text-red-400 font-bold"
                    : "text-neutral-800 hover:text-neutral-950"
                }`}
              >
                <LuLayoutList className="inline-block mr-2 mb-1" />
                物料管理
              </button>
            </Link>
            <Link href="/users">
              <button
                className={`${sideBtnCssOpt} ${
                  pathname === "/users"
                    ? "text-red-400 font-bold"
                    : "text-neutral-800 hover:text-neutral-950"
                }`}
              >
                <FiUsers className="inline-block mr-2 mb-1" />
                用户管理
              </button>
            </Link>
          </div>
          <div className="flex-none h-16 mt-3">
            <button
              onClick={logout}
              className={`${sideBtnCss} bg-red-400 text-white
              hover:bg-red-500`}
            >
              <TbLogout2 className="inline-block mr-2 mb-1" />
              退出登录
            </button>
          </div>
        </div>
        <div className="absolute -right-4 top-[5%] bg-zinc-200 w-[1px] h-[90%] rounded"></div>
      </div>
      {/* sidebar for mobile */}
      <div
        className={`md:hidden block shadow-sm sticky bg-[#f4f4f422]
        top-0 w-full backdrop-blur-lg backdrop-saturate-150
        ${menuOpen ? "h-[18rem]" : "h-[4rem]"} 
        transition-all duration-200 ease-in-out`}
      >
        <h1
          className="text-[2rem] my-[0.5rem] mr-12 text-red-400
          font-bold text-center"
        >
          <Image
            src="/favicon.svg"
            alt="logo"
            width={64}
            height={64}
            className="size-10 mr-4 mb-1 inline"
          />
          物料管理系统
          <RiMenu4Fill
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            className={`inline size-10 absolute right-0
            mr-4 mt-1 ${menuOpen ? "rotate-90" : ""}
            transition-all duration-200 ease-in-out`}
          />
        </h1>
        <div
          className={`
          transition-all duration-200
          ${
            menuOpen ? "translate-x-0 opacity-1" : "-translate-x-full opacity-0"
          }`}
        >
          <hr className="mx-12 my-3" />
          <Link
            onClick={() => setMenuOpen(false)}
            href="/home"
            className={sideBtnForM}
          >
            首页 <TbSmartHome className="inline mb-1" />
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href="/materials"
            className={sideBtnForM}
          >
            物料管理 <LuLayoutList className="inline mb-1" />
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href="/users"
            className={sideBtnForM}
          >
            用户管理 <FiUsers className="inline mb-1" />
          </Link>
          <Link onClick={() => logout()} href="" className={sideBtnForM}>
            退出登录 <TbLogout2 className="inline mb-1" />
          </Link>
        </div>
      </div>
      {/* content */}
      <div className="my-6 mr-6 w-full md:overflow-auto">{children}</div>
    </div>
  );
}
