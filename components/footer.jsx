"use client";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/Logo/EgyzonLogo.png";
import { navlinks } from "./MainHeader";

export function Footer() {
  const links = navlinks;
  return (
    <footer className="bg-yellow-400 text-gray-800 py-6 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4">
        <div className="flex flex-col items-start w-80">
          <Image src={Logo} width={100} alt="Egyzon Brand Logo" />
          <p className="text-3xl">Experience shopping like never before!</p>
        </div>

        <div>
          <ul className=" flex flex-row gap-5 font-bold text-black text-xl mt-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="hover:border-2 p-2 mb-1 last:mb-0"
                >
                  {" "}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="border-black" />
      <div className=" text-center p-3">
        <p className="text-3xl">
          &copy; Designed By AmrAssal, All right reserved
        </p>
      </div>
    </footer>
  );
}
