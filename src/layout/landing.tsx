import { useEffect, useState } from "react";
import { ENDPOINT } from "../utils";


export default function Home() {
   const [data, setData] = useState<any>(null)
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)
   const [status, setStatus] = useState("")

   async function setClipboard() {
      const type = "text/plain";
      const clipboardItemData = {
         [type]: 'vladpoienariu.go.ro',
      };
      const clipboardItem = new ClipboardItem(clipboardItemData);
      await navigator.clipboard.write([clipboardItem]);

      alert("Server IP copied to clipboard")
   }

   function reqAccess() {
      setLoading(true)

      fetch(`${ENDPOINT}/users/request-access`, {
         method: "POST",
         headers: {
            'Authorization': `Bearer BreaslaAngajatiilor123`
         }
      })
         .then(async (response) => {
      
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
      console.log(data);

      if (data) {
         if(data.status === 'error') setStatus(data.error)
         if(data.status === 'success') setStatus(data.error)
      }
   }, [data])


   return (
      <article className="home">
         <header>
            <h1>Breasla Angajatiilor</h1>

            <div className="details">
               <h2 className="sv-ip accent" onClick={() => setClipboard()}>Server IP: vladpoienariu.go.ro</h2>
               <p>( click to copy )</p>
            </div>
         </header>

         <div className="download-modpack btns">
            <a className="btn" href="../../public/Breasla_Angajatiilor.zip" download>Download CurseForge mods</a>
            <a target="_blank" className="btn" href="https://nextcloud.vladpoienariu.com/index.php/s/BBNdYtWmsLTzBsD">
               Get mods RAW
            </a>
                        <a className="btn" href="/dashboard">
               Dashboard
            </a>
         </div>
         <p>{status}</p>
         <div className="access">
            <p>You need to login to manage the server</p>
            {loading ?
               <button className="btn primary-btn">Loading...</button> :
              <a href="/admin">
                <button className="btn primary-btn">Login</button>
              </a>
            }
         </div>
      </article>
   )
}