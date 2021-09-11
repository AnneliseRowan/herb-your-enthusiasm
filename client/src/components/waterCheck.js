import { toast, ToastContainer } from 'react-toastify';



export const waterCheck = (next, pName, id) => {
    


    
    const a = new Date();
    const b = a.getTime();
    const c = Date.parse(next);
  
    
    if (c < a) {
        
      return ({backgroundColor: "#FF0000"})
    } else {
      return ({backgroundColor: "#0000FF"})
    }
  }