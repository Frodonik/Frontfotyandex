"use client";
import Styles from "./Game.module.css";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { endpoints } from '@/app/api/config'
import { checkIfUserVoted, getNormalizedGameDataById, vote } from "@/app/api/api-utils";
import { isResponseOk } from "../../api/api-utils";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { useStore } from "@/app/store/app-store";


export default function GamePage(props) {
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [game, setGame] = useState()
  const [isVoted, setIsVoted] = useState(false);
  const authContext = useStore();
  useEffect(() => {
    async function fetchData() {
        const game = await getNormalizedGameDataById(endpoints.games, props.params.id);
        isResponseOk(game) ? setGame(game) : setGame(null);
        setPreloaderVisible(false);
    }
    fetchData();
  }, []) 
  const router = useRouter()

  useEffect(() => {
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
  }, [authContext.user, game]); 

  const handleVote = async () => {
    const jwt = authContext.token;
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(authContext.user.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
  if (isResponseOk(response)) {
      setIsVoted(true);
      setGame(() => {
        return {
          ...game,
          users: [...game.users, authContext.user],
        };
      });
    }
  }; 

  return game ? (
    <main className="main">
      <section className={Styles["game"]}>
        <iframe
          className={Styles["game__iframe"]}
          src={game.link}
        ></iframe>
      </section>
      <section className={Styles["about"]}>
        <h2 className={Styles["about__title"]}>{game.title}</h2>
        <div className={Styles["about__content"]}>
          <p className={Styles["about__description"]}>
            {game.description}
          </p>
          <div className={Styles["about__author"]}>
            <p>
              Автор:
              <span className={Styles["about__accent"]}>{game.developer}</span>
            </p>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          <p className={Styles["about__vote-amount"]}>
            За игру уже проголосовали:
            <span className={Styles["about__accent"]}>{game.users.length}</span>
          </p>
          <button 
          className={`button ${Styles["about__vote-button"]}`}  
          disabled={!authContext.isAuth || isVoted}
          onClick={handleVote}
          >
            {isVoted ? "Голос учтён" : "Голосовать"}
          </button>
        </div>
      </section>
    </main>
  ) : preloaderVisible ? (
    <Preloader />
  ) : (
    <main className="main">
        <section className={Styles['notfound']}>
          <p>Такой игры не существует</p>
          <img 
            src="../images/notfound.jpg"
            className={Styles["banner__image"]}
          />
        </section>
    </main>
  );
}
