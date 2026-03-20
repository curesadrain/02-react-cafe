export type VoteType = keyof Votes;

export interface Votes {
  good: number;
  neutral: number;
  bad: number;
}
