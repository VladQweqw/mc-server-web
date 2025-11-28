
export default function Home() {

      async function setClipboard() {
         const type = "text/plain";
         const clipboardItemData = {
            [type]: 'vladpoienariu.go.ro',
         };
         const clipboardItem = new ClipboardItem(clipboardItemData);
         await navigator.clipboard.write([clipboardItem]);

         alert("Server IP copied to clipboard")
      }


   return(
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
      </div>

      <div className="access">
         <p>You need access to manage the server</p>
         <button className="btn primary-btn">Request Access</button>
      </div>
    </article>
   )
}