'use client'
import {Banner} from './components/Banner/Banner'
import { Promo } from './components/Promo/Promo'
import {CardsListSection} from './components/CardListSection/CardListSection'
import { endpoints } from './api/config'
import { useGetDataByCategory } from './api/api-hooks'
import { Preloader } from './components/Preloader/Preloader'

export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games, 'popular')
  const newGames = useGetDataByCategory(endpoints.games, 'new')
  return (
        <main>
          <Banner/>
          {popularGames&&newGames ? (
            <>
            <CardsListSection id="popular" title="Популярные" type="slider" data={popularGames} />
            <CardsListSection id="new" title="Новые" type="slider" data={newGames} />
            </>
          ) : (
            <Preloader/>
          )}
          <Promo/>
        </main>
    )
}