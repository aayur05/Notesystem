import { useEffect, useState } from "react"

function Remind({title}) {

const [data,setData]=useState();
const [remind,setRemind]=useState();

// console.log(title); 
// console.log("data");
// console.log(data);
// console.log("remind " +remind);

useEffect(()=>{
  setData(title.title);
  setRemind(title.remind);
},[])

if(remind){
  return (
    <>
      <div>
        {data}
      </div>
    </>
  )}
  else{
    return
  }
}

export default Remind
