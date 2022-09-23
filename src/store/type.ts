import { ILoginState } from "./login/type";
import { IAnalysisState } from "./main/analysis/types";
import { ISystemState } from "./main/system/types";

export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  analysis: IAnalysisState;
}

export type IStoreType = IRootState & IRootWithModule;
