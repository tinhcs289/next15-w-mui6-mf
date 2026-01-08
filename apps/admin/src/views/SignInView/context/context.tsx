"use client";

import { createStatesContext } from "@packages/states-context";
import type { SignInViewStates } from "../types";

const {
  StatesProvider: SignInViewStatesProvider,
  useCallbackState: useSignInViewCallback,
  useGetState: useGetSignInViewState,
  useInitState: useInitSignInViewState,
  useSetState: useSetSignInViewState,
} = createStatesContext<SignInViewStates>({
  submitting: false,
});

export {
  SignInViewStatesProvider, useGetSignInViewState,
  useInitSignInViewState,
  useSetSignInViewState, useSignInViewCallback
};
