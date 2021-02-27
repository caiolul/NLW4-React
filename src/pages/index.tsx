import Head from "next/head";
import { GetServerSideProps } from "next";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletChallenges } from "../components/CompletChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContexts";
import style from "../styles/pages/Home.module.css";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={style.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>
        <ExperienceBar></ExperienceBar>
        <CountdownProvider>
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
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const { level, currentExperience, challengesCompleted } = cxt.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
