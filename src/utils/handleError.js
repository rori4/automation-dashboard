import { toast } from "react-toastify";

function handleError(error) {
  if(error){
    toast.error(error);
  }
}

export default handleError;
