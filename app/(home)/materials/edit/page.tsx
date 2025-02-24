"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

function EditMaterial() {
  const labelClass =
    "text-[1.1rem] w-20 mr-4 block md:inline-block md:text-right";
  const inputClass = `inline-block h-9 w-full md:w-auto transition-all
                     duration-200 ease-in-out bg-transparent mb-6
                     focus-visible: outline-none py-2 px-4 md:text-right
                     border-b-2 border-gray-400 focus-visible:border-red-400
                     `;
  const butClass = `block w-16 h-16 py-1 px-2 rounded-[50%] my-6 font-bold
                   transition-all duration-200 ease-in-out`;

  const paramUrl = useSearchParams();

  const [materialInfo, setMaterialInfo] = useState({
    name: "",
    value: "",
    amount: "",
    package: "",
    model: "",
    manufacturer: "",
    class: "",
    description: "",
    avatar: "",
    datasheet: "",
  });
  const updateMaterialInfo = function (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(e.target.name, e.target.value);
    setMaterialInfo({ ...materialInfo, [e.target.name]: e.target.value });
  };

  const verifyMaterialInfo = function (): boolean {
    if (!/^.{2,128}$/.test(materialInfo.name)) {
      toast.error("名称长度为2-128字符");
      return false;
    }
    if (!/^.{1,128}$/.test(materialInfo.value)) {
      toast.error("值长度为1-128字符");
      return false;
    }
    if (!/^(0|[1-9]\d{0,3})$/.test(materialInfo.amount)) {
      toast.error("数量范围为0-9999");
      return false;
    }
    if (!/^.{1,64}$/.test(materialInfo.package)) {
      toast.error("封装长度为1-128字符");
      return false;
    }
    if (!/^.{0,64}$/.test(materialInfo.class)) {
      toast.error("类别长度为1-64字符");
      return false;
    }
    if (!/^.{0,64}$/.test(materialInfo.model)) {
      toast.error("型号长度为1-128字符");
      return false;
    }
    if (!/^.{0,64}$/.test(materialInfo.manufacturer)) {
      toast.error("厂商长度为1-64字符");
      return false;
    }
    if (!/^.{0,4096}$/.test(materialInfo.description)) {
      toast.error("描述长度为1-4096字符");
      return false;
    }
    if (!/^.{0,128}$/.test(materialInfo.avatar)) {
      toast.error("头像最多128字符");
      return false;
    }
    if (!/^.{0,2048}$/.test(materialInfo.datasheet)) {
      toast.error("数据手册最多2048字符");
      return false;
    }

    return true;
  };

  const addSubmit = function () {
    if (!verifyMaterialInfo()) {
      return;
    }
    console.log(materialInfo);
  };

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
      <form className="flex flex-col flex-wrap md:h-[22rem] p-6 mr-12 md:mt-12 content-around">
        <div className="w-full md:w-auto">
          <label className={labelClass}>
            <span className="text-red-500">*</span> 名称
          </label>
          <input
            name="name"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.name}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>
            <span className="text-red-500">*</span> 值
          </label>
          <input
            name="value"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.value}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>
            <span className="text-red-500">*</span> 数量
          </label>
          <input
            min={0}
            name="amount"
            className={inputClass}
            type="number"
            placeholder=""
            value={materialInfo.amount}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>
            <span className="text-red-500">*</span> 封装
          </label>
          <input
            name="package"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.package}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>类型</label>
          <input
            name="class"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.class}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>型号</label>
          <input
            name="model"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.model}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>厂家</label>
          <input
            name="manufacturer"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.manufacturer}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>描述</label>
          <input
            className={`${inputClass} md:inline hidden`}
            type="text"
            placeholder=""
          />
          <textarea
            name="description"
            className={`${inputClass} 
              md:hidden block min-h-9 max-h-32`}
            placeholder=""
            value={materialInfo.description}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>封面</label>
          <input
            name="avatar"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.avatar}
            onChange={updateMaterialInfo}
          />
        </div>
        <div>
          <label className={labelClass}>数据手册</label>
          <input
            name="datasheet"
            className={inputClass}
            type="text"
            placeholder=""
            value={materialInfo.datasheet}
            onChange={updateMaterialInfo}
          />
        </div>
      </form>

      <div className="fixed bottom-12 right-12">
        <button
          onClick={addSubmit}
          className={`${butClass} bg-red-400 text-neutral-100 hover:bg-red-500`}
        >
          添加
        </button>
        <Link href="/materials">
          <button
            className={`${butClass} bg-neutral-200 text-red-400 hover:bg-white`}
          >
            退出
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function EditMaterialSuspense() {
  return (
    <Suspense>
      <EditMaterial />
    </Suspense>
  );
}