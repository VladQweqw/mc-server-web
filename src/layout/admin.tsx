import { useEffect, useRef, useState } from "react";
import { ENDPOINT } from "../utils";

import { useNavigate } from "react-router";

export default function Admin() {
   const [data, setData] = useState<any>(null)
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const form = useRef<HTMLFormElement | null>(null)
   const navigate = useNavigate()
   function login() {
      setLoading(true)

      const fd = new FormData()
      
      fd.append('username', form?.current?.username!.value)
      fd.append('password', form?.current?.pwd!.value)

      fetch(`${ENDPOINT}/admin/login`, {
         method: "POST",
         body: fd,
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

     if(data) {
       if(data?.status === 'success') {
         navigate('/dashboard')
      }
     }

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

         <form ref={form} action="" className="form">
            <div className="input">
               <input title="username" id='username' type="text" placeholder="Username" className="input-field" />
            </div>
            <div className="input">
               <input title='password'  type="password" placeholder="Password" id="pwd" className="input-field" />
            </div>
            <p className="danger"></p>
         </form>
         {data?.status == 'error' ? 
            <p className="danger">{data?.error}</p>
         : ""}

         <div className="btns">
            <button onClick={() => {login()}} className="btn primary-btn">Log in</button>
         </div>
      </article>
   )
}