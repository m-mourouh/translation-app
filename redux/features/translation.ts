import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: LangOptions = {
  source: {
    lang: "en",
    text: "",
  },
  target: {
    lang: "es",
    text: "",
  },
};

const translationReducer = createSlice({
  name: "translationReducer",
  initialState,
  reducers: {
    setSrcText: (state: LangOptions, action: PayloadAction<string>) => {
      state.source.text = action.payload;
    },
    setTargetText: (state: LangOptions, action: PayloadAction<string>) => {
      state.target.text = action.payload;
    },
    setSrcLang: (state: LangOptions, action: PayloadAction<string>) => {
      state.source.lang = action.payload;
    },
    setTargetLang: (state: LangOptions, action: PayloadAction<string>) => {
      state.target.lang = action.payload;
    },
    toggleLangs: (state: LangOptions) => {
      const targetLang = state.target.lang;
      state.target.text = "";
      state.source.text = "";

      state.target.lang = state.source.lang;
      state.source.lang = targetLang;
    }
  },
});

export default translationReducer.reducer;
export const { setSrcText, setTargetText, setSrcLang, setTargetLang, toggleLangs } =
  translationReducer.actions;
