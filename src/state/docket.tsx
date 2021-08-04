import create from "zustand";
import _ from "lodash";

interface Docket {
  name: string;
  color: string;
  url: string;
  base: string;
}

interface Dockets {
  [ref: string]: Docket;
}

interface DocketState {
  fetchDockets: () => Promise<void>;
  dockets: Dockets;
}

const useDocketState = create<DocketState>((set, get) => ({
  fetchDockets: async () => {
    const json = await (await fetch("/~/scry/docket/dockets.json")).json();
    set({
      dockets: json,
    });
  },
  dockets: {},
}));

const selDockets = (s: DocketState) => {
  return _.omit(s.dockets, 'landscape/grid');
};

export function useDockets() {
  return useDocketState(selDockets);
}

export function fetchDockets() {
  return useDocketState.getState().fetchDockets();
}

export default useDocketState;
