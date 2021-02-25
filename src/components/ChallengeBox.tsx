import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import style from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const { activeChallenge, resetChallengeValue } = useContext(
    ChallengesContext
  );
  return (
    <div className={style.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={style.challengeActive}>
          <header>Ganhe {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>Levante e se alongue</p>
          </main>
          <footer>
            <button
              type="button"
              className={style.challengeFailedButton}
              onClick={resetChallengeValue}
            >
              Falhei
            </button>
            <button type="button" className={style.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={style.challengeNotActive}>
          <strong>Finalize um ciclo para obter o desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
