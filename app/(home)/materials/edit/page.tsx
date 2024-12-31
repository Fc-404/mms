"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function EditMaterial() {
  const labelClass =
    "text-[1.1rem] w-20 mr-4 block md:inline-block md:text-right";
  const inputClass = `inline-block h-9 w-full md:w-auto transition-all
                     duration-200 ease-in-out bg-transparent mb-6
                     focus-visible: outline-none py-2 px-4 text-right
                     border-b-2 border-gray-400 focus-visible:border-red-400
                     `;

  const paramUrl = useSearchParams();

  return (
    <div>
      <Link href="/materials">
        <button
          className="text-red-500 inline-block py-1 pr-3 pl-2 mx-4
        rounded-lg transition-all duration-200 ease-in-out hover:bg-white"
        >
          <IoIosArrowBack className="inline mb-[0.2rem]" />
          返回
        </button>
      </Link>
      <h1 className="text-2xl font-bold inline-block text-neutral-600">
        {paramUrl.get("type") === "add" ? "添加物料" : "编辑物料"}
      </h1>
      <form className="flex flex-col flex-wrap md:h-[22rem] p-6 content-around">
        <div className="w-full md:w-auto">
          <label className={labelClass}>名称</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>值</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>数量</label>
          <input className={inputClass} type="number" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>封装</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>类型</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>型号</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>厂家</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>描述</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>封面</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
        <div>
          <label className={labelClass}>数据手册</label>
          <input className={inputClass} type="text" placeholder="" />
        </div>
      </form>
    </div>
  );
}
