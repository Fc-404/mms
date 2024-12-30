"use client";

import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { RiMenu4Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { TbSmartHome } from "react-icons/tb";
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
  const sideBtnCss = `w-full h-16 rounded-2xl text-xl
    transition-all duration-200`;
  const sideBtnCssOpt =
    sideBtnCss + ` bg-neutral-100 mt-3 hover:bg-neutral-200`;
  const sideBtnForM = `block text-right text-[1.2rem] my-4 mr-12
    text-neutral-800`;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-nowrap flex-col md:flex-row w-full h-full">
      {/* sidebar for client */}
      <div className="md:block hidden flex-none w-[20rem] m-6">
        <div className="flex flex-col h-full">
          <div className="flex-none rounded-2xl">
            <h1 className="text-[3rem] text-red-400 font-bold text-center">
              物料管理系统
            </h1>
            <hr className="mt-6 mb-3" />
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
              className={`${sideBtnCss} bg-red-400 text-white
              hover:bg-red-500`}
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
      {/* sidebar for mobile */}
      <div
        className={`md:hidden block shadow-sm sticky bg-[#f4f4f422]
        top-0 w-full backdrop-blur-lg backdrop-saturate-150
        ${menuOpen ? "" : "h-[4rem]"}
        `}
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
            className="inline size-10 absolute right-0
          mr-4 mt-1"
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
          <Link href="/home" className={sideBtnForM}>
            首页 <TbSmartHome className="inline mb-1" />
          </Link>
          <Link href="/materials" className={sideBtnForM}>
            物料管理 <LuLayoutList className="inline mb-1" />
          </Link>
          <Link href="/users" className={sideBtnForM}>
            用户管理 <FiUsers className="inline mb-1" />
          </Link>
        </div>
      </div>
      {/* content */}
      <div className="my-6 mr-6 w-full overflow-auto">{children}</div>
    </div>
  );
}
