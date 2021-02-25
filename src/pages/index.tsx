import Head from "next/head";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletChallenges } from "../components/CompletChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import style from "../styles/pages/Home.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      <ExperienceBar></ExperienceBar>
      <section>
        <div>
          <Profile></Profile>
          <CompletChallenges></CompletChallenges>
          <Countdown></Countdown>
        </div>
        <div>
          <ChallengeBox></ChallengeBox>
        </div>
      </section>
    </div>
  );
}
