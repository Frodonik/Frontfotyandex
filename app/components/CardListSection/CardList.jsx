import Styles from './CardListSection.module.css'
import {Card} from '../Card/Card.jsx'
import Link from 'next/link'

export const CardList = (props) => {
    
    return (
        <ul className={Styles["cards-list"]}>
            {props.data.map((item) => {
                return (
                    <li className={Styles["cards-list__item"]} key={item.id}>
                        <Link href={`/games/${item.id}`} className={Styles["card-list__link"]}>
                            <Card
                                title={item.title}
                                developer={item.developer}
                                description={item.description}
                                image={item.image}
                                link={item.link}
                                users={item.users}
                            />
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}