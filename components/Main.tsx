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

export default function Main() {
  const srcLang = useAppSelector((state) => state.lang.source.lang);
  const targetLang = useAppSelector((state) => state.lang.target.lang);
  const srcText = useAppSelector((state) => state.lang.source.text);
  const message = useAppSelector((state) => state.notification.text);
  const isVisible = useAppSelector((state) => state.notification.isVisible);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (srcText.trim().length > 0) {
      dispatch(setTargetText("Loading..."));
      const userData = {
        text: srcText,
        src: srcLang,
        target: targetLang,
      };
      const res = await translate(userData);
      try {
        dispatch(setTargetText(res["data"]["matches"][0]["translation"]));
      } catch (error) {
        dispatch(setTargetText(""));
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
      <div className="px-5 md-px-0 mt-14 ">
        <div className="container  mx-auto ">
          <div className="flex justify-between sm:gap-4 mb-5  rounded-md py-2 px-2 sm:px-5  animate-fade ">
            <LangsBox option="src" />
            <SwitchButton />
            <LangsBox option="target" />
          </div>
          <div className="flex-col md:flex-row flex justify-center items-center gap-3 md:gap-5 w-full">
            <Box option="src" code={srcLang} />
            <Box option="target" code={targetLang} />
          </div>
          <button
            className="flex gap-3  align-items-center  mx-auto mt-5 rounded-md bg-indigo-500 px-6 py-3 text-base text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 leading-5	 animate-fade "
            onClick={handleClick}
          >
            <span>Translate</span> <LanguageIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <Modal />
      {isVisible && <Notification text={message} />}
    </>
  );
}
