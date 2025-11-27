import { useEffect, useState } from "react";

export default function Dashboard() {

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

   console.log(data);
   
   useEffect(() => {
      if(data) {
         setServerOn(data.online)
      }
   }, [data])
   


   return (
      <article className="dashboard">
         <header>
            <h1><a href="/">Breasla Angajatiilor</a></h1>

            <div className="details">
               <span>Status: {serverOn ? <span className="success">Online</span> : <span className="danger">Offline</span>}</span>
            </div>
         </header>

         <div>
            <h2>Server details:</h2>
            <div className="details">
               {loading ? <p className="loading">Loading...</p> : "" }
               {data ?
                  <>
                  <p>{data?.motd.clean}</p>
                  <p>Players {data?.players.online}/{data?.players.max}</p>
                  <p>Version {data?.version}</p>
                  <p>IP {data?.ip}</p>
                  </>
               : ""}
            </div>
         </div>

         <div className="logs">
            <p>If there are any error will appear below:</p>
            <div className="errors">
               {error ? <p className="danger">Failed to fetch, try again...</p> : ""}
            </div>
         </div>

         <div className="btns">
            <a href="https://nextcloud.vladpoienariu.com/index.php/apps/files/files/90643?dir=/Minecraft/mods" target="_blank">
                <button className="btn primary-btn">Add mods (pass: suntangajat)</button>
            </a>
            <button className="btn primary-btn">Sync mods</button>
            <button className="btn primary-btn">Start server</button>
         </div>
      </article>
   )
}