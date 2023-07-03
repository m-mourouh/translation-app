
type ButtonType = {
  text: string;
  handle: () => void;
};
type transObj = {
  text: string;
  src: string;
  target: string;
}
type LangOptions = {
  source: {
    text: string;
    lang: string;
  }
  target: {
    text: string;
    lang: string;
  }
}
type BoxType = {
  // value: string;
  option: "src" | "target";
  code: string
};

type FlagType = {
    id: number,
    code: string,
    name: string,
}
type ModalType = {
  title: string;
  message: string;
  visible?: boolean;
};

type NotificationType = {
    text: string;
    isVisible?: boolean;
}