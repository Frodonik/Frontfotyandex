'use client'
import { useGetDataByCategory } from '../api/api-hooks'
import { endpoints } from '../api/config'
import {CardsListSection} from '../components/CardListSection/CardListSection'
import { Preloader } from "../components/Preloader/Preloader"; 

export default function Runner() {
    const runnerGames = useGetDataByCategory(endpoints.games, 'runner')

    return (
        <main className='main-inner'>
            {runnerGames ? (
                <CardsListSection id="runner" title="Ранеры" data={runnerGames} />
            ) : (
                <Preloader />
            ) }
        </main>
    )
}