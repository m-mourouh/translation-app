"use client";
import {
  SpeakerWaveIcon,
  ClipboardIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSrcText, setTargetText } from "@/redux/features/translation";
import { readText } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { showNotification } from "@/redux/features/notification";
import copy from "copy-to-clipboard";

export default function Box({ option, isLoading }: BoxType) {
  const srcText = useAppSelector((state) => state.lang.source.text);
  const targetText = useAppSelector((state) => state.lang.target.text);
  const srcLang = useAppSelector((state) => state.lang.source.lang);
  const targetLang = useAppSelector((state) => state.lang.target.lang);
  const dispatch = useAppDispatch();
  const [textDirection, setTextDirection] = useState("");
  const [disabledClass, setDisabledClass] = useState("disabled");
  const [isFilled, setIsFilled] = useState(true);

  useEffect(() => {
    if (
      (targetLang === "ar-SA" &&
        targetText.length > 0 &&
        option === "target") ||
      (srcLang === "ar-SA" && srcText.length > 0 && option === "src")
    ) {
      setTextDirection("rtl-dir");
    } else {
      setTextDirection("");
    }

    if (
      (option === "src" && srcText.length > 0) ||
      (option === "target" && targetText.length > 0)
    ) {
      setDisabledClass("");
    } else {
      setDisabledClass("disabled");
    }
    if (option === "src" && srcText.length > 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [targetLang, option, targetText, srcLang, srcText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const boxValue = e.target.value;
    if (option === "src") {
      dispatch(setSrcText(boxValue));
      if (boxValue.trim().length === 0) {
        dispatch(setSrcText(""));
        dispatch(setTargetText(""));
      }
    } else if (option === "target") {
      dispatch(setTargetText(boxValue));
    }
    if (srcLang === "ar-SA" && boxValue.length > 0 && option === "src") {
      setTextDirection("rtl-dir");
    } else {
      setTextDirection("");
    }
  };

  const speak = (opt: string) => {
    if (opt === "src") {
      readText(srcText, srcLang);
    }
    if (opt === "target") {
      readText(targetText, targetLang);
    }
  };
  const copyText = () => {
    if (option === "src") {
      if (srcText.length > 0) {
        copy(srcText);
        dispatch(showNotification("Text copied"));
      }
    }

    if (option === "target") {
      if (targetText.length > 0) {
        copy(targetText);
        dispatch(showNotification("Translation copied"));
      }
    }
  };
  const removeText = () => {
    dispatch(setSrcText(""));
    dispatch(setTargetText(""));
  };
  return (
    <div
      className={
        "pb-8  w-full relative z-0 rounded-md  md:border-0 shadow-sm  focus:border-indigo-400 overflow-hidden focus:ring-2 focus:ring-inset focus:ring-indigo-400  animate-fade " +
        (option === "target"
          ? "bg-[#f5f5f5] "
          : "ring-1 ring-inset ring-gray-300 bg-white")
      }
    >
      <textarea
        name={option === "target" ? "target text" : "translation text"}
        rows={1}
        id={option === "src" ? "srcText" : ""}
        className={`pr-8 no-scrollbar min-h-[150px] w-full  py-3  text-gray-900 border-none  bg-transparent placeholder:text-gray-400  sm:text-sm sm:leading-6 outline-none resize-none px-3 ${textDirection} `}
        placeholder={option === "src" ? "Enter text" : "Translation"}
        value={option === "src" ? srcText : targetText}
        onChange={(e) => handleChange(e)}
        disabled={option === "target" && true}
        readOnly={option === "target" && true}
      />
      <label
        htmlFor="srcText"
        className={`flex gap-3 absolute bottom-0 pb-2 text-slate-600  ${
          option === "src" ? "right-4 md:left-4" : "right-4"
        }`}
      >
        <span
          className={
            "cursor-pointer hover:text-indigo-400 transition duration-150 ease-in " +
            disabledClass
          }
          onClick={() => speak(option)}
        >
          <SpeakerWaveIcon className="h-5 w-5" />
        </span>
        <span
          className={
            "cursor-pointer hover:text-indigo-400 transition duration-150 ease-in " +
            disabledClass
          }
          onClick={copyText}
        >
          <ClipboardIcon className="h-5 w-5" />
        </span>
      </label>
      {option === "src" && isFilled ? (
        <span
          className="absolute top-1 right-1  rounded-full rounded-tr-md  cursor-pointer p-1  text-slate-600 hover:text-indigo-500  transition ease-in-out animate-fade "
          onClick={removeText}
        >
          <XMarkIcon className="h-4 w-4" />
        </span>
      ) : (
        ""
      )}
      {option === "target" && isLoading  ? (
        <span
          className="absolute bottom-2 left-2  rounded-full rounded-tr-md  cursor-pointer p-1  text-slate-400   transition ease-in-out animate-spin "
          onClick={removeText}
        >
          <ArrowPathIcon className="h-4 w-4" />
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
