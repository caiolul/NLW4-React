import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import style from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={style.profileContainer}>
      <img src="https://github.com/caiolul.png" alt="Caio Cesar"></img>
      <div>
        <strong>Caio Cesar</strong>
        <p>
          <img src="icons/level.svg"></img>
          Level {level}
        </p>
      </div>
    </div>
  );
}
