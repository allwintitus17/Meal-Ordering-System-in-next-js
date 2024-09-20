import { FaArrowCircleLeft } from "react-icons/fa";
import {useRouter} from 'next/router';

const BackButton =({url='/'})=>{
    
    const router=useRouter()
    return (
       <button className="btn btn-reverse btn-back" onClick={()=>router.push(url)}>
        <FaArrowCircleLeft/> Back
       </button> 
    )
}

export default BackButton;