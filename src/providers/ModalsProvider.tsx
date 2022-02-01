import React, { Component, createContext, useEffect } from "react";
import { AuthModal } from "../components/AuthModal";
export const ModalsContext = createContext<{
	state: any;
	dispatch: React.Dispatch<any>;
} | null>(null);
function ModalsReducer(state: any, action: any) {
	switch (action.type) {
		case "set":
			return { ...state, ...action.newState };
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}
function ModalsProvider({ children }: any) {
	const [state, dispatch] = React.useReducer(ModalsReducer, {
		auth: { visible: false, mode: "login" },
	});
	const value = { state, dispatch };
	return (
		<ModalsContext.Provider value={value}>
			<AuthModal visible={state.auth.visible} mode={state.auth.mode} />
			{children}
		</ModalsContext.Provider>
	);
}
export function useModals() {
	const context = React.useContext(ModalsContext);

	if (context === undefined) {
		throw new Error("useModals must be used within a NewToProvider");
	}

	return context;
}

export default ModalsProvider;
