"use client";
import { translate } from "@/lib/api";
import Box from "./Box";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setTargetText } from "@/redux/features/translation";
import Modal from "./Dialog";
import { showModal } from "@/redux/features/dialog";
import SwitchButton from "./SwitchButton";
import { LanguageIcon } from "@heroicons/react/20/solid";
import LangsBox from "./Combobox";
import Notification from "./Notification";
import { useState } from "react";
import Image from "next/image";
import Logo2 from "@/public/images/logo2.svg";

export default function Main() {
  const srcLang = useAppSelector((state) => state.lang.source.lang);
  const targetLang = useAppSelector((state) => state.lang.target.lang);
  const srcText = useAppSelector((state) => state.lang.source.text);
  const message = useAppSelector((state) => state.notification.text);
  const isVisible = useAppSelector((state) => state.notification.isVisible);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    if (srcText.length > 0) {
      setIsLoading(true)
      dispatch(setTargetText("Loading..."));
      const userData = {
        text: srcText,
        src: srcLang,
        target: targetLang,
      };
      const res = await translate(userData);
      try {
        dispatch(setTargetText(res["data"]["outputText"]));
         setIsLoading(false);
      } catch (error) {
        dispatch(setTargetText(""));
         setIsLoading(false);
        console.log(error);
      }
    } else {
      dispatch(
        showModal({
          title: "Message",
          message: "Please enter text to translate",
        })
      );
    }
  };

  return (
    <>
      <div className="px-5 md:px-0 mt-4 sm:mt-20 ">
        <div className="container  mx-auto ">
          <div className="flex justify-between sm:gap-4 mb-5  rounded-md py-2 ">
            <LangsBox option="src" />
            <SwitchButton />
            <LangsBox option="target" />
          </div>
          <div className="flex-col md:flex-row flex justify-center  items-center gap-3 md:gap-5 w-full">
            <Box option="src" code={srcLang} />
            <Box option="target" code={targetLang} isLoading={isLoading} />
          </div>
          <button
            className="flex gap-1 items-center mx-auto mt-10 mb-[100px] rounded-full bg-indigo-500 px-6 py-3 text-base text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 leading-5	 animate-fade "
            onClick={handleClick}
          >
            <Image
              src={Logo2}
              width={15}
              height={15}
              alt="T"
            />
            <span className="">ranslate</span>
          </button>
        </div>
      </div>
      <Modal />
      {isVisible && <Notification text={message} />}
    </>
  );
}
