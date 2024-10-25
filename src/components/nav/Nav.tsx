import { NavLink } from 'react-router-dom'
import styles from './nav.module.css'
import { CiMenuFries } from "react-icons/ci";
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { RiBookFill, RiHeadphoneFill } from "react-icons/ri";
import { MdPermMedia } from "react-icons/md";
import { FaRadio } from "react-icons/fa6";

const Nav = () => {

    const [navState, setNavState] = useState(true)

  return (
    <nav className={styles.nav}>
        <div className={styles.container}>
            <p>اهل القران</p>
            <div className={styles.navContent}>
                <div onClick={()=>setNavState(true)} className={`${styles.links} ${navState ? styles.hide : ''}` }>
                    <NavLink to='/'> <FaHome /> الرئيسية </NavLink>
                    <NavLink to='/moshaf'> <RiBookFill />  المصحف </NavLink>
                    <NavLink to='/quraa'> <RiHeadphoneFill /> التلاوات </NavLink>
                    <NavLink to='/radio'> <FaRadio />  الراديو </NavLink>
                    <NavLink to='/gallery'> <MdPermMedia /> اسلاميات </NavLink>
                </div>
                <div className={styles.toggler}>
                    <CiMenuFries onClick={()=>setNavState(!navState)} style={{fontSize: '40px', cursor: 'pointer'}} />
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav