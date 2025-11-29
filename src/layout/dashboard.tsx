import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ENDPOINT } from "../utils";

export default function Dashboard() {
   const [data, setData] = useState<any>(null)
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const [dataUser, setDataUser] = useState<any>(null)
   const [errorUser, setErrorUser] = useState('')
   const [loadingUser, setLoadingUser] = useState(false)

   const [serverOn, setServerOn] = useState(false)

   const navigate = useNavigate()

   function getServerStats() {
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

   function verifyUser() {

      fetch(`${ENDPOINT}/users`, {
         method: "GET",
         headers: {
            'Authorization': `Bearer BreaslaAngajatiilor123`
         }
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            return response.json();
         })
         .then((json) => {
            setDataUser(json);
            setLoadingUser(false);
         })
         .catch((err) => {
            setErrorUser(err.message);
            setLoadingUser(false);
         });
   }

   const [stopData, setStopData] = useState<any>(null)
   const [stopError, setStopError] = useState('')
   const [stopLoading, setStopLoading] = useState(false)

   function stopServer() {
      setStopLoading(true)

      fetch(`${ENDPOINT}/server/start`, {
         method: "GET",
         headers: {
            'Authorization': `Bearer BreaslaAngajatiilor123`
         }
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            return response.json();
         })
         .then((json) => {
            setStopData(json);
            setStopLoading(false);
         })
         .catch((err) => {
            setStopError(err.message);
            setStopLoading(false);
         });
   }

   const [startData, setStartData] = useState<any>(null)
   const [startError, setStartError] = useState('')
   const [startLoading, setStartLoading] = useState(false)

   function startServer() {
      setStartLoading(true)

      fetch(`${ENDPOINT}/server/start`, {
         method: "GET",
         headers: {
            'Authorization': `Bearer BreaslaAngajatiilor123`
         }
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            return response.json();
         })
         .then((json) => {
            setStartData(json);
            setStartLoading(false);
         })
         .catch((err) => {
            setStartError(err.message);
            setStartLoading(false);
         });
   }

   useEffect(() => {
      setLoading(true)
      verifyUser()
      getServerStats()
   }, []); // empty dependency = run once on mount

   useEffect(() => {
      console.log(dataUser);
      console.log(startData);
      console.log(stopData);

      if(!dataUser?.user?.isValid) {
         console.log("here");
         
         // return navigate("/")
      }
      
      if(startData?.status === 'success') {
         setServerOn(true)
      }

      if(stopData?.status === 'success') {
         setServerOn(false)
      }

      if (data) {
         setServerOn(data.online)
      }
   }, [data, dataUser, startData, stopData])



   return (
      <article className="dashboard">
         <header>
            <h1><a href="/">Breasla Angajatiilor</a></h1>

            <div className="details">
               <h2>
                  Status: {serverOn ? <span className="success">Online</span> : <span className="danger">Offline</span>}
               </h2>
            </div>
           {data?.user ?
           <>
             <p>Username: {data.user.username}</p>
               <p>Admin: {data.user.isAdmin ? "true": 'false'}</p>
           </>
           : ""}
         </header>

         <div>
            <h2>Server details:</h2>
            <div className="details">
               {loading ? <p className="loading">Loading...</p> : ""}
               {data ?
                  <>
                     {data.isOnline ?
                        <>
                           <p>{data?.motd.clean}</p>
                           <p>Players {data?.players.online}/{data?.players.max}</p>
                           <p>Version {data?.version}</p>
                        </>
                        : ""}
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
            <a className="btn" href="https://nextcloud.vladpoienariu.com/index.php/s/X9HnrWsc3zXnD4R" target="_blank">
               Add mods (pass: suntangajat)
            </a>
            <button className="btn primary-btn">Sync mods</button>

               {startLoading ? 
                <button className="btn primary-btn">Loading</button>
               : 
               serverOn ? 
                <button onClick={() => stopServer()} className="btn primary-btn">Stop server</button>
               :  <button onClick={() => startServer()} className="btn primary-btn">Start server</button>}
         </div>
      </article>
   )
}