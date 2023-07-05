import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/images/logo.svg"
import Github from "@/public/images/github.svg"
export default function NavBar() {
  return (
    <nav className="w-full flex justify-between px-5 sm:px-20 py-4 bg-white  border-b animate-fade animate-once">
      <Link
        href="/"
        className="flex gap-1 items-center animate-fade animate-once"
      >
        <Image src={Logo} width={30} height={30} alt="Translation APP LOGO" />
        <small className="text-lg translate-y-2 ">
          ranslation
        </small>
      </Link>
      <Link
        href="https://github.com/m-mourouh/translation-app"
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
