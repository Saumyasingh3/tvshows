import { useState,useEffect } from "react";
import Link from "next/link";
const Shows= () => {
    const [count ,setcount] =useState(0);
     const [shows,setshows] =useState([]);
    const [searchtext,setsearchtext] =useState("");

useEffect (()=>{

    let url = searchtext.length ==0 ? "https://api.tvmaze.com/schedule":" https://api.tvmaze.com/search/shows?q="+searchtext;
    fetch (url).then(async res =>{
      let data =await res.json();

      console.log(data[0]);

      setshows(data);
    })
},[searchtext]
)
 const changetext=(event)=>{
let s = event.target.value; 
setsearchtext(s);
console.log (searchtext);
 }
return(
    <>

<div className="shows">
<input className="input" value={searchtext} onChange={(event)=>changetext(event)}/>

   <div className="show-grid"> 
  
    {shows.map((item,index)=><div className="show-card" key={index}>
        
    <Link href={"/shows/"+item.show.id } > 
    <img src={item.show.image?.medium} />
    <h2>{item.show.name}</h2>
    </Link>
    </div>
     )}
      </div>

</div>
</>
)
}
export default Shows