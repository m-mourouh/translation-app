import Link from "next/link"
import Image from "next/image"
import Github from "@/public/images/github.svg"
import Logo from "@/public/images/logo.svg"
export default function NavBar() {
  return (
    <nav className="w-full flex justify-between px-5 sm:px-20 py-4 bg-white  items-center shadow-sm animate-fade animate-once">
      <Link
        href="https://github.com/m-mourouh"
        target="_blank"
        className="flex gap-2 items-center animate-fade animate-once"
      >
        <Image src={Logo} width={30} height={30} alt="Translation APP LOGO" />
        <h1 className="text-lg capitalize">Translation</h1>
      </Link>
      <Link
        href="https://github.com/m-mourouh"
        target="_blank"
        className="animate-fade animate-once-"
      >
        <Image
          src={Github}
          width={30}
          height={30}
          alt="Translation APP LOGO"
          className="hover:opacity-50 transition-all"
        />
      </Link>
    </nav>
  );
}
