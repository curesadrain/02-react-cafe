import css from "./App.module.css";
import { useState } from "react";

import CafeInfo from "./components/CafeInfo/CafeInfo";
import VoteOption from "./components/VoteOptions/VoteOptions";
import VoteStats from "./components/VoteStats/VoteStats";
import Notification from "./components/Notification/Notification";
import type { Votes, VoteType } from "./types/votes";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleVote(type: VoteType): void {
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  }
  function resetVotes(): void {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }

  const totalVotes: number = votes.good + votes.neutral + votes.bad;
  const positiveRate: number = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOption
          onVote={handleVote}
          onReset={resetVotes}
          canReset={totalVotes > 0}
        />
        {totalVotes > 0 ? (
          <VoteStats
            votes={votes}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}
