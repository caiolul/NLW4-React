import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import style from "../styles/components/UserGithubForm.module.css";

export function UserGithubForm() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <header>Github ⚡ </header>
        <strong>Insira seu link</strong>
        <input type="text"></input>
        <p>Nescessario para pegar informações como foto e nome</p>
        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  );
}
