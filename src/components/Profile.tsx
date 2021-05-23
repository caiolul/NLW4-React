import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { useSession, signOut } from "next-auth/client";
import style from "../styles/components/Profile.module.css";

export function Profile() {
  const [session] = useSession();
  const { level } = useContext(ChallengesContext);
  return (
    <div className={style.profileContainer}>
      {session && (
        <>
          <img src={session.user.image} alt="UserPhoto"></img>
          <div>
            <strong>{session.user.name}</strong>
            <strong>
              <a
                href={`/api/auth/signout`}
                onClick={(): Promise<void> => signOut()}
              >
                Sign out
              </a>
            </strong>
            <p>
              <img src="icons/level.svg"></img>
              Level {level}
            </p>
          </div>
        </>
      )}
      {!session && (
        <>
          <img src="icons/user.svg" alt="UserPhoto"></img>
          <div>
            <strong>User</strong>
            <p>
              <img src="icons/level.svg"></img>
              Level {level}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
