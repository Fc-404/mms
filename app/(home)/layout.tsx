export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-nowrap w-full h-full">
      <div
        className="md:block hidden w-[20rem] m-6
        bg-gray-200"
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow bg-red-500">
            <div className="h-32 bg-gray-400"></div>
          </div>
          <div className="flex-none h-16 bg-red-900">Log out</div>
        </div>
      </div>
      <div className="md:hidden block">
        <button>click</button>
      </div>
      <div className="my-6 mr-6">{children}</div>
    </div>
  );
}
