import { useContext } from "react";
import { signIn, SignInResponse, useSession } from "next-auth/client";
import { ChallengesContext } from "../contexts/ChallengesContext";
import style from "../styles/components/UserGithubForm.module.css";

export function UserGithubForm() {
  const [session] = useSession();
  const { getUserGithub } = useContext(ChallengesContext);
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <header>Github ⚡ </header>

        {!session && (
          <div>
            <p>
              Nescessario para pegar informações como foto e nome. Caso não
              queira será gerado um usuario random
            </p>
            <br />
            <p>
              <a
                href={`/api/auth/signin`}
                onClick={(): Promise<SignInResponse> =>
                  signIn("github", { callbackUrl: "http://localhost:3000/" })
                }
              >
                Login
              </a>
            </p>
          </div>
        )}
        {session && (
          <div>
            <p>Obrigado por logar</p>
            <br />
          </div>
        )}
        <button type="button" onClick={getUserGithub}>
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  );
}
