export type Side = "player" | "computer" | "tie";

export type RoundSummary = {
  round: 1 | 2 | 3;
  playerPokemonId: number;
  computerPokemonId: number;
  playerName: string;
  computerName: string;
  winner: Side;
  playerPoints: number;
  computerPoints: number;
};

export type MatchState = {
  status: "idle" | "round_in_progress" | "round_done" | "match_done";
  round: 1 | 2 | 3;
  playerScore: number;
  computerScore: number;
  rounds: RoundSummary[];
};

export const initialMatch: MatchState = {
  status: "idle",
  round: 1,
  playerScore: 0,
  computerScore: 0,
  rounds: [],
};

export function scoreRound(winner: Side) {
  if (winner === "player") return { playerPoints: 1, computerPoints: 0 };
  if (winner === "computer") return { playerPoints: 0, computerPoints: 1 };
  return { playerPoints: 0.5, computerPoints: 0.5 };
}

export function finalizeRound(params: {
  current: MatchState;
  playerPokemon: { id: number; name: string };
  computerPokemon: { id: number; name: string };
  winner: Side;
}): MatchState {
  const { current, playerPokemon, computerPokemon, winner } = params;
  const points = scoreRound(winner);

  const summary: RoundSummary = {
    round: current.round,
    playerPokemonId: playerPokemon.id,
    computerPokemonId: computerPokemon.id,
    playerName: playerPokemon.name,
    computerName: computerPokemon.name,
    winner,
    ...points,
  };

  const nextPlayerScore = current.playerScore + points.playerPoints;
  const nextComputerScore = current.computerScore + points.computerPoints;

  // Decide if match ends
  const isLast = current.round === 3;

  if (isLast) {
    return {
      ...current,
      status: "match_done",
      playerScore: nextPlayerScore,
      computerScore: nextComputerScore,
      rounds: [...current.rounds, summary],
    };
  }

  return {
    ...current,
    status: "round_done",
    round: (current.round + 1) as 2 | 3,
    playerScore: nextPlayerScore,
    computerScore: nextComputerScore,
    rounds: [...current.rounds, summary],
  };
}
