// import { useState } from "react";

// import Summary from "./Summary/Summary";
// import RightMovieRender from "./RightMovieRender/RightMovieRender";



// export default function RightBox() {
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <Summary watched={watched} />

//           <RightMovieRender watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
