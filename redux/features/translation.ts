import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: LangOptions = {
  source: {
    lang: "fr-FR",
    text: "",
  },
  target: {
    lang: "en-GB",
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
      const target = state.target
      state.target = state.source;
      state.source = target;
    }
  },
});

export default translationReducer.reducer;
export const { setSrcText, setTargetText, setSrcLang, setTargetLang, toggleLangs } =
  translationReducer.actions;
