"use client";
import {useState, useEffect} from 'react'; 
import Styles from './Header.module.css'
import {AuthForm} from '../AuthForm/AuthForm'
import {Popup} from '../Popup/Popup'
import {Overlay} from '../Overlay/Overlay'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useStore } from '@/app/store/app-store';

export const Header = () => {
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [popupIsOpened, setPopupIsOpened] = useState(false);
    
    const openPopup = () => {
      setPopupIsOpened(true);
    }
    const closePopup = () => {
      setPopupIsOpened(false);
    }

    const authContext = useStore(); 

    const hlogOut = () => {
      authContext.logout();
    }
    

    return (
      <header className={Styles['header']}>
        {pathname === "/" ? 
          <div className={Styles['logo']}>
            <img className={Styles["logo__image"]} src="/images/logo.svg" alt="Логотип Pindie" />
          </div> 
          :<Link href="/" className={Styles['logo']}>
            <img className={Styles["logo__image"]} src="/images/logo.svg" alt="Логотип Pindie" />
          </Link>
          }
        <nav className={Styles['menu']}>
          <ul className={Styles['menu__list']}>
            <li className={Styles["menu__item"]}>
              <Link href="/new" className={`${Styles["menu__link"]} ${pathname === "/new" ? Styles["menu__link_active"] : ""}`}>Новинки</Link>
            </li>
            <li className={Styles["menu__item"]}>
              <Link href="/popular" className={`${Styles["menu__link"]} ${pathname === "/popular" ? Styles["menu__link_active"] : ""}`}>Популярные</Link>
            </li>
            <li className={Styles["menu__item"]}>
              <Link href="/shooters" className={`${Styles["menu__link"]} ${pathname === "/shooters" ? Styles["menu__link_active"] : ""}`}>Шутеры</Link>
            </li>
            <li className={Styles["menu__item"]}>
              <Link href="/runners" className={`${Styles["menu__link"]} ${pathname === "/runners" ? Styles["menu__link_active"] : ""}`}>Ранеры</Link>
            </li>
            <li className={Styles["menu__item"]}>
              <Link href="/pixel-games" className={`${Styles["menu__link"]} ${pathname === "/pixel-games" ? Styles["menu__link_active"] : ""}`}>Пиксельные</Link>
            </li>
            <li className={Styles["menu__item"]}>
              <Link href="/tds" className={`${Styles["menu__link"]} ${pathname === "/tds" ? Styles["menu__link_active"] : ""}`}>TDS</Link>
            </li>
          </ul>
          <div className={Styles["auth"]}>
            {authContext.isAuth ? 
            <button className={Styles["auth__button"]} onClick={hlogOut}>Выйти</button> 
            :
            <button className={Styles["auth__button"]} onClick={openPopup}>Войти</button>
            }
          </div>
        </nav>
        <Overlay isOpened={popupIsOpened} closePopup={closePopup}/>
        <Popup isOpened={popupIsOpened} closePopup={closePopup}>
          <AuthForm close={closePopup} setAuth={setIsAuthorized}/>
        </Popup>
      </header>
    )
  }