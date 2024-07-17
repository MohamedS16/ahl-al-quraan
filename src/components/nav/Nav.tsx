import { NavLink } from 'react-router-dom'
import styles from './nav.module.css'
import { CiMenuFries } from "react-icons/ci";
import { useState } from 'react';

const Nav = () => {

    const [navState, setNavState] = useState(true)

  return (
    <nav className={styles.nav}>
        <div className={styles.container}>
            <p>اهل القران</p>
            <div className={styles.navContent}>
                <div className={`${styles.links} ${navState ? styles.hide : ''}` }>
                    <NavLink to='/'> الرئيسية </NavLink>
                    <NavLink to='/moshaf'> المصحف </NavLink>
                    <NavLink to='/telawa'> التلاوات </NavLink>
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