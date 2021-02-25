import style from "../styles/components/Profile.module.css";

export function Profile() {
  return (
    <div className={style.profileContainer}>
      <img src="https://github.com/caiolul.png" alt="Caio Cesar"></img>
      <div>
        <strong>Caio Cesar</strong>
        <p>
          <img src="icons/level.svg"></img>
          Level 1
        </p>
      </div>
    </div>
  );
}
