import Link from "next/link"
import data from "@/data/properties.json"
import { HeartIcon } from "@heroicons/react/24/outline";
import { Roboto_Mono } from "next/font/google";
const roboto = Roboto_Mono({ subsets: ["latin"] });
export default function Footer() {
  return (
    <footer className="w-full py-5 mt-auto ">
        <Link href={data.properties.github_profile} target="_blank" className={roboto.className}>
      <p className="text-slate-700 flex text-xs items-center justify-center gap-1">
      Built with <HeartIcon className="w-4 text-indigo-500"/> by <span className="hover:text-indigo-500">Mohamed Mourouh</span>
      </p>
        </Link>
    </footer>
  );
}
