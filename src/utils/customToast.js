import { toast } from "react-toastify";

export function handleError(error) {
  if(error){
    toast.error(error);
  }
}

export function handleInfo(info) {
  if(info){
    toast.info(info);
  }
}

