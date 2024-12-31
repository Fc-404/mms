import Link from "next/link";
import { TotalMaterial } from "@/app/ui/materials/totalMaterial";
import { IoAdd } from "react-icons/io5";

export default function MaterialsManage() {
  return (
    <div>
      <TotalMaterial />
      <div className="flex justify-end mx-6">
        <Link
          href="/materials/edit?type=add"
          className="hover:bg-white pb-1 pt-2 px-2 rounded-lg 
          transition-all duration-200 ease-in-out"
        >
          <IoAdd className="text-2xl mb-[0.2rem] mr-1 inline text-red-500" />
          <button className="text-red-500 font-bold">添加物料</button>
        </Link>
      </div>
    </div>
  );
}
