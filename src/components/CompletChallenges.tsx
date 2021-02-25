import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import style from "../styles/components/CompletChallenges.module.css";

export function CompletChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={style.completChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
