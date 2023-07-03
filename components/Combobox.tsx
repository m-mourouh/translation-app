"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import flags from "@/data/data.json";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSrcLang,
  setTargetLang,
  setSrcText,
  setTargetText,
} from "@/redux/features/translation";
import { translate } from "@/lib/api";
type LangBoxType = {
  option: string;
};
export default function LangsBox({ option }: LangBoxType) {
  const srcLang = useAppSelector((state) => state.lang.source.lang);
  const targetLang = useAppSelector((state) => state.lang.target.lang);
  const srcText = useAppSelector((state) => state.lang.source.text);
  const [selected, setSelected] = useState<FlagType>();
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (option === "src") {
      setSelected(flags.find((f) => f.code === srcLang));
    } else if (option === "target") {
      setSelected(flags.find((f) => f.code === targetLang));
    }
    console.log("first useEffect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcLang, targetLang]);

  useEffect( () => {
    if (option === "src" && selected) {
      dispatch(setSrcLang(selected?.code));
      dispatch(setSrcText(""));
      dispatch(setTargetText(""));
    } else if (option === "target" && selected) {
      dispatch(setTargetLang(selected?.code));
        (async () => {
          const userData = {
            text: srcText,
            src: srcLang,
            target: selected?.code,
          };
          const res = await translate(userData);
          try {
            dispatch(setTargetText(res["data"]["matches"][0]["translation"]));
          } catch (error) {
            dispatch(setTargetText(""));
            console.log(error);
          }
        })()
    }
    
    console.log("second useEffect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const filteredFlags =
    query === ""
      ? flags
      : flags.filter((flag) =>
          flag.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="max-w-[200px]  animate-fade ">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default  rounded-md bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border py-2 pl-3 pr-10 text-sm leading-5 rounded-md text-gray-900 focus:ring-0 outline-none"
              displayValue={(flag: FlagType) => flag.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 no-scrollbar">
              {filteredFlags.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredFlags.map((flag) => (
                  <Combobox.Option
                    key={flag.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={flag}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {flag.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-indigo-500"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
