import {AppStatus} from "../../common/types/types";


export const commonDisabled = (appStatus: string)=>{
   return appStatus === AppStatus.LOADING;

}