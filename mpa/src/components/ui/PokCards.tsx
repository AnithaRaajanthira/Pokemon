// import React from "react";

// type PokCardsProps = {
//   name: string;
//   imageUrl: string;
//   ViewDetailsBtn?: React.MouseEventHandler<HTMLButtonElement>;
// };
// export default function PokCards({ name, imageUrl, ViewDetailsBtn }: PokCardsProps) {
//   return (
//     <div className="card bg-black w-96 shadow-sm">
//       <figure className="px-10 pt-10">
//         <img src={imageUrl} alt="Shoes" className="rounded-xl" />
//       </figure>
//       <div className="card-body items-center text-center">
//         <h2 className="card-title text-white">{name}</h2>
//         {/* <p>A card component has a figure, a body part, and inside body there are title and actions parts</p> */}
//         <div className="card-actions">
//           <button onClick={ViewDetailsBtn} className="btn btn-primary">
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

type PokCardsProps = {
  name: string;
  imageUrl: string;

  ViewDetailsBtn?: React.MouseEventHandler<HTMLButtonElement>;

  rosterBtnLabel?: string; // "Add to Roster" | "Remove from Roster"
  rosterBtnDisabled?: boolean;
  rosterBtnOnClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function PokCards({
  name,
  imageUrl,
  ViewDetailsBtn,
  rosterBtnLabel,
  rosterBtnDisabled,
  rosterBtnOnClick,
}: PokCardsProps) {
  return (
    <div className="card bg-black w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={imageUrl} alt={name} className="rounded-xl" />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{name}</h2>

        <div className="card-actions gap-2">
          <button onClick={ViewDetailsBtn} className="btn btn-primary">
            View Details
          </button>

          {rosterBtnLabel && (
            <button
              onClick={rosterBtnOnClick}
              disabled={rosterBtnDisabled}
              className="btn btn-secondary"
            >
              {rosterBtnLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
