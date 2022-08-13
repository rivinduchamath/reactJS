// cookie
import cookie from 'js-cookie';

// remove all cookies
export function removeAllCookies() {
  cookie.remove('personalization-token');
  cookie.remove('user');
  cookie.remove('csrftoken');
  cookie.remove('refresh_token');
  cookie.remove('sessionid');
}
