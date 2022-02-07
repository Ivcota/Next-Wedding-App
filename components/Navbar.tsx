import Link from "next/link";
import React, { useState } from "react";
import { useNavStore, useUserStore } from "./../libs/stores";

const Navbar = () => {
  const { isAdmin, setAdmin } = useUserStore();
  const { isOpen, setIsOpen } = useNavStore();

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav id="navigation" className="navigation navigation-centered ">
      <div className="navigation-header">
        <div className="navigation-brand-text">
          {/* <a href="#">Iverson & Holly</a> */}
        </div>
        <div className="navigation-button-toggler">
          <i onClick={() => setIsOpen(true)} className="hamburger-icon"></i>
        </div>
      </div>
      <div
        className={
          !isOpen
            ? `navigation-body is-invisable`
            : "navigation-body scroll-momentum is-visible"
        }
      >
        <div className="navigation-body-header">
          <span
            onClick={() => setIsOpen(false)}
            className="navigation-body-close-button"
          >
            &#10005;
          </span>
        </div>
        <ul className="navigation-menu">
          <li onClick={closeNavbar} className="navigation-item is-active">
            <Link href="/">
              <a className="navigation-link">Home</a>
            </Link>
          </li>

          {isAdmin ? (
            <>
              <li onClick={closeNavbar} className="navigation-item">
                <Link href="/admin/dashboard">
                  <a className="navigation-link">Dashboard</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={closeNavbar} className="navigation-item">
                <Link href="/virtual-event">
                  <a className="navigation-link">Virtual Event</a>
                </Link>
              </li>
              <li onClick={closeNavbar} className="navigation-item">
                <Link href="/virtual-guest-book">
                  <a className="navigation-link"> Virtual Guest Book</a>
                </Link>
              </li>
              <li onClick={closeNavbar} className="navigation-item">
                <Link href="/registry">
                  <a className="navigation-link">Registry</a>
                </Link>
              </li>
              <li onClick={closeNavbar} className="navigation-item">
                <Link href="/photos">
                  <a className="navigation-link">Photos</a>
                </Link>
              </li>
            </>
          )}

          {isAdmin ? (
            <li onClick={closeNavbar} className="navigation-item">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setAdmin(false);
                }}
              >
                <a href="#" className="navigation-link">
                  Sign Out
                </a>
              </div>
            </li>
          ) : (
            <li onClick={closeNavbar} className="navigation-item">
              <Link href="/admin">
                <a className="navigation-link">Login</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
