/**
 * Login
 */
"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { encodingPswd } from "@/lib/dealAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVaild, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      username.length >= 4 &&
      username.length <= 12 &&
      password.length >= 6 &&
      password.length <= 16
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [username, password]);

  const checkVaild = (type: "username" | "password", value: string) => {
    if (type === "username") {
      setUsername(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", encodingPswd(password));
    const res = await fetch("/api/login", {
      method: "POST",
      body: formdata,
    });
    if (res.ok) {
      toast.success("登录成功");
      const t = Buffer.from(cookie.get("token") as string, "base64").toString();
      cookie.set("token", t.substring(Number(t.slice(-2)), t.length - 2));
      router.replace("/");
    } else {
      toast.error("登录失败");
    }
  };

  return (
    <div
      className="container mx-auto flex max-w-[100vw]
      items-center justify-center h-screen
      bg-gradient-to-tr from-[#d4fc79] to-[#96e6a1]"
    >
      <div
        className="h-[500px] min-w-fit overflow-hidden
        m-6 p-12 shadow-lg rounded-2xl bg-white
        flex flex-col items-center justify-center"
      >
        <h1
          className="lg:text-[2.5rem] text-[2rem] text-red-400
          font-bold mb-12 flex items-center"
        >
          <Image
            src="/favicon.svg"
            alt="logo"
            width={0}
            height={0}
            className="sm:size-12 mr-4"
          />
          物料管理系统
        </h1>
        <form
          className="flex flex-col items-center justify-center
          w-full"
        >
          <div className="lg:px-6 max-w-[400px]">
            <Input
              maxLength={12}
              minLength={4}
              value={username}
              onChange={(e) => checkVaild("username", e.target.value)}
              placeholder="用户名"
            />
            <Input
              maxLength={16}
              minLength={6}
              value={password}
              onChange={(e) => checkVaild("password", e.target.value)}
              placeholder="密码"
              type="password"
            />
          </div>
          <button
            disabled={!isVaild}
            onClick={handleSubmit}
            className={`w-full h-12 rounded-lg bg-red-400 
            flex items-center justify-center
            text-white text-[1.2rem] mt-16 ${!isVaild && "opacity-50"}`}
          >
            <TbLogin2 className="mr-2 mb-0.5" />
            登录
          </button>
        </form>
      </div>
    </div>
  );
}

function Input(props: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      className="w-full h-12 p-4 my-4 transition-all duration-200
      focus-visible: outline-none text-[1.2rem] text-gray-500
      border-b-2 border-gray-200 focus-visible:border-red-400"
    />
  );
}
