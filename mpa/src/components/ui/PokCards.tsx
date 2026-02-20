import React from "react";

type PokCardsProps = {
  name: string;
  imageUrl: string;
  ViewDetailsBtn?: React.MouseEventHandler<HTMLButtonElement>;
};
export default function PokCards({ name, imageUrl, ViewDetailsBtn }: PokCardsProps) {
  return (
    <div className="card bg-black w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={imageUrl} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{name}</h2>
        {/* <p>A card component has a figure, a body part, and inside body there are title and actions parts</p> */}
        <div className="card-actions">
          <button onClick={ViewDetailsBtn} className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
