import { Schema, model } from "mongoose";

export type RosterItemDoc = {
  userId: string;
  pokemonId: number;
  createdAt: Date;
  updatedAt: Date;
};

const RosterItemSchema = new Schema<RosterItemDoc>(
  {
    userId: { type: String, required: true, index: true, ref: "User" },
    pokemonId: { type: Number, required: true, index: true },
  },
  { timestamps: true },
);

// Keine Duplikate pro User
RosterItemSchema.index({ userId: 1, pokemonId: 1 }, { unique: true });

export const RosterItem = model<RosterItemDoc>("RosterItem", RosterItemSchema);
