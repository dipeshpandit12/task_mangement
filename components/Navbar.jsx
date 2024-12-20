import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-gray-800 p-4 my-7 mx-3">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link href={'/'}>Task Management</Link>
        </h1>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2">
            <Link href={'/addTopic'}>Add Task</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
