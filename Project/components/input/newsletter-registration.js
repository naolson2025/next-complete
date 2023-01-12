import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
// import { useSWR } from 'swr';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });
    // send valid data to API
    fetch('/api/newsletter-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: enteredEmail,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((data) => {
        console.log(data);
        throw new Error(data.message || 'Something went wrong!');
      });
    })
      .then((data) => {
        if (data.error) {
          notificationCtx.showNotification({
            title: 'Error!',
            message: data.message || 'Something went wrong!',
            status: 'error',
          });
        } else {
          notificationCtx.showNotification({
            title: 'Success!',
            message: 'Successfully registered for newsletter!',
            status: 'success',
          });
        }
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
