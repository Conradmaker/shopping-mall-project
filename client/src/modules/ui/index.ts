import { createAction, createReducer } from 'typesafe-actions';

const TOGGLE_THEME = 'ui/TOGGLE_DARK_MODE';

export const toggleTheme = createAction(TOGGLE_THEME)();

type UiActions = ReturnType<typeof toggleTheme>;
type UiState = {
  darkMode: boolean;
};
const initialState: UiState = {
  darkMode: false,
};

const ui = createReducer<UiState, UiActions>(initialState, {
  [TOGGLE_THEME]: state => ({ ...state, darkMode: !state.darkMode }),
});
export default ui;
