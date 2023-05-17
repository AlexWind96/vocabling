import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MantineThemeOverride } from '@mantine/core'

interface UiConfig {
  theme: Partial<MantineThemeOverride>
}

const initialState: UiConfig = {
  theme: {
    primaryColor: 'pink',
  },
}

export const uiConfigSlice = createSlice({
  name: 'uiConfig',
  initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.theme.primaryColor = action.payload
    },
    cleanState: () => {
      return initialState
    },
  },
})

export const selectUiConfigSlice = (state: RootState) => state.uiConfig
