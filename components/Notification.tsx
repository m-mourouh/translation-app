import { hideNotification } from "@/redux/features/notification";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

export default function Notification({ text }: { text: string }) {
  const isVisible = useAppSelector((state) => state.notification.isVisible);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        dispatch(hideNotification());
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);
  return (
    <div
      className={`bg-gray-800 text-sm text-white px-5 py-4 mt-5  w-full fixed bottom-0 left-0  md:rounded-md md:left-5 md:w-auto md:bottom-5 transition duration-1000 ease-in-out animate-fade-up animate-duration-[1000ms] animate-normal animate-fill-forwards`}
    >
      {text}
    </div>
  );
}
