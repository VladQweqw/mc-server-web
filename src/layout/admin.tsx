import { useEffect, useState } from "react";

export default function Admin() {
   const [data, setData] = useState<any>(null)
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const [serverOn, setServerOn] = useState(false)

   function callApi() {
      fetch(`https://api.mcsrvstat.us/3/vladpoienariu.go.ro`)
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            return response.json();
         })
         .then((json) => {
            setData(json);
            setLoading(false);
         })
         .catch((err) => {
            setError(err.message);
            setLoading(false);
         });
   }

   useEffect(() => {
      setLoading(true)
      callApi()
   }, []); // empty dependency = run once on mount

   useEffect(() => {
      
   }, [data])

   return (
      <article className="dashboard">
         <header>
            <h1><a href="/">Breasla Angajatiilor</a></h1>

            <div className="details">
               <h2>
                  Login admin
               </h2>
            </div>
         </header>

         <form action="" className="form">
            <div className="input">
               <input type="text" placeholder="Username" id="username" className="input-field" />
            </div>
            <div className="input">
               <input type="password" placeholder="Password" id="pwd" className="input-field" />
            </div>
            <p className="danger"></p>
         </form>


         <div className="btns">
            <button className="btn primary-btn">Log in</button>
         </div>
      </article>
   )
}