import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

import classes from './main-navigation.module.css';

function MainNavigation() {
  // this is the user session, we can get from next-auth
  // it will tell us if we have a valid signedin user
  const [session, loading] = useSession();

  function logoutHandler() {
    // next-auth will clear the session cookie
    // from the browser
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
