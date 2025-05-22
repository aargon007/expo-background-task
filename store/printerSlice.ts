import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TCPrinter = {
    isDefault: boolean;
    printRTR: boolean;
    giveStubs: boolean;
    target: string;
    deviceName: string;
    macAddress: string;
    printerName?: string
};

type TState = {
    activePrinter: TCPrinter | null; // default printer
    isPrinterConnected: boolean;
}

const initialState: TState = {
    activePrinter: null,
    isPrinterConnected: false
};

// other slice
export const printerSlice = createSlice({
    name: "printer",
    initialState,
    reducers: {
        togglePrinterStatus: (state, action: PayloadAction<boolean>) => {
            state.isPrinterConnected = action.payload
        },
        purgePrinterSlice: () => initialState
    },
});

// Action creators are automatically generated for each case reducer function
export const {
    togglePrinterStatus,
    purgePrinterSlice
} = printerSlice.actions;

export default printerSlice.reducer;