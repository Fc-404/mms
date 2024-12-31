import { totalMaterials, totalMaterialsAmount } from "@/app/api/materials";

export async function TotalMaterial() {
  const materials = await totalMaterials();
  const total = (await totalMaterialsAmount())._sum.amount || 0;
  const materialsStr = materials > 9999 ? "9999+" : materials.toString();
  const totalStr = total > 99999 ? "99999+" : total.toString();

  return (
    <div
      className="m-6 p-6 bg-white shadow-sm rounded-xl
    flex flex-row flex-nowrap justify-around"
    >
      <div>
        <p
          className="text-3xl font-bold text-zinc-600 
          block md:inline"
        >
          物料类型
        </p>
        <span
          className="text-2xl md:mt-0 mt-4 inline-block
        text-blue-600 text-right md:w-auto w-full md:px-6"
        >
          {materialsStr}
        </span>
      </div>
      <div>
        <p
          className="text-3xl font-bold text-zinc-600 
          block md:inline"
        >
          物料总量
        </p>
        <span
          className="text-2xl md:mt-0 mt-4 inline-block
        text-teal-600 text-right md:w-auto w-full md:px-6"
        >
          {totalStr}
        </span>
      </div>
    </div>
  );
}
