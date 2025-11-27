
export default function Error() {
   document.title = 'Page not found';

   return(
      <article className="error">
         <h1>404</h1>
         <h1>Page not found</h1>

         <a href="/"><button className="btn">Go back</button></a>
      </article>
   )
}