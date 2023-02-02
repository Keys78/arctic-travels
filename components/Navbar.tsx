import React, { useEffect, useState } from 'react'
import NavLinks from './NavLinks';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '../utils/data';
import { AnimatePresence, motion } from 'framer-motion';


const modalVariants = {

    initial: {
        opactity: 0,
        y: "-100vh",
    },
    final: {
        opactity: 1,
        y: 0,
        transition: { duration: 0.4, delay:1}
    },
    exit: {
        opactity: 0,
        y: "-100vh",
        transition: { duration: 0.2 },
    }
};


const Navbar = () => {
    const [isActiveBurger, setIsActiveBurger] = useState(false)
    const renderNavLinks = navLinks && navLinks.map((navlink, i) => (
        <h1 onClick={() => setIsActiveBurger(!isActiveBurger)} key={i}>
            <Link href={navlink.href}><a>{navlink.title}</a></Link>
        </h1>
    ))

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = () => {
        const header: any = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 50 ? header?.classList.add('is-sticky') : header?.classList.remove('is-sticky');
        scrollTop >= 600 ? header?.classList.add('robo') : header?.classList.remove('robo');
    };
    return (
        <>
            <header className='header-section flex items-center justify-between gen-wrapper'>
                <div className="logo-wrapper flex items-center space-x-3">
                    <div className='el-wrap'>
                        <img className='el-logo' src="/images/dotted_circle.png" height={'40px'} width={'40px'} />
                        <img className='el-plane' src="/images/angular_plane.png" height={'40px'} width={'40px'} />
                    </div>
                    <span className='font-bold text-white'>Arctic Travels</span>
                </div>
                <NavLinks />
                <div>
                    <div onClick={() => setIsActiveBurger(!isActiveBurger)} className={`${isActiveBurger ? 'hamburger is-active' : 'hamburger'}`} id="hamburger-6">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>

            </header>

            <AnimatePresence>
                {isActiveBurger &&
                    <motion.div className='side-nav sv:hidden block'
                        variants={modalVariants}
                        initial="initial"
                        animate="final"
                        exit="exit"
                    >
                        <div className="logo-wrapper flex items-center justify-center pb-24 space-x-3">
                            <div className='el-wrap'>
                                <img className='el-logo' src="/images/dotted_circle.png" height={'40px'} width={'40px'} />
                                <img className='el-plane' src="/images/angular_plane.png" height={'40px'} width={'40px'} />
                            </div>
                            <span className='font-bold text-white'>Arctic Travels</span>
                        </div>

                        <div className='side-nav-links'>
                            {renderNavLinks}
                        </div>

                        <div className='close-sidenav' onClick={() => setIsActiveBurger(!isActiveBurger)}>
                            <Image src="/images/x-circle.png" width="50px" height="50px" />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

        </>
    )
}

export default Navbar;