
export default function Home() {

      async function setClipboard() {
         const type = "text/plain";
         const clipboardItemData = {
            [type]: 'vladpoienariu.go.ro',
         };
         const clipboardItem = new ClipboardItem(clipboardItemData);
         await navigator.clipboard.write([clipboardItem]);
      }


   return(
    <article className="home">
      <header>
         <h1>Breasla Angajatiilor</h1>

         <div className="details">
            <span className="sv-ip" onClick={() => setClipboard()}>Server IP: vladpoienariu.go.ro</span>
            <p>( click to copy )</p>
         </div>
      </header>

      <div className="download-modpack btns">
         <a href="../../public/Breasla_Angajatiilor.zip" download><button className="btn primary-btn">Download CurseForge mods</button></a>
         <a target="_blank" href="https://nextcloud.vladpoienariu.com/index.php/s/BBNdYtWmsLTzBsD">
            <button className="btn">Get mods RAW</button>
         </a>
      </div>

      <div className="access">
         <p>You need access to manage the server</p>
         <button className="btn primary-btn">Request Access</button>
      </div>
    </article>
   )
}