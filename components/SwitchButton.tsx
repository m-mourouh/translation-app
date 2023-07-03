"use client"
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import { useAppDispatch } from "@/redux/hooks";
import { toggleLangs } from "@/redux/features/translation";
export default function SwitchButton() {  
    const dispatch = useAppDispatch()
  const switchLangs = () => {
      dispatch(toggleLangs());
  }
  return (
    <button
      className="cursor-pointer p-3 rounded-full bg-none sm:bg-gray-100 text-slate-700 hover:text-indigo-400 sm:hover:bg-indigo-100 transition duration-150 ease-in  animate-fade  sm:border sm:border-gray-200"
      onClick={switchLangs}
    >
      <ArrowsRightLeftIcon className="h-5 w-5" />
    </button>
  );
}
