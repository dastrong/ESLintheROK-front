export const getStarredEmail = (email: string, maxStars = 12) => {
  if (!email) return '';
  const [username, domain] = email.split('@') || ['', ''];
  if (username.length >= maxStars) {
    // 1234567890123456@gmail.com
    // 1**********6@gmail.com
    return `${username[0]}**********${username[username.length - 1]}@${domain}`;
  } else {
    // 123456@gmail.com
    // 1****6@gmail.com
    return `${username[0]}${new Array(username.length - 1).join('*')}${
      username[username.length - 1]
    }@${domain}`;
  }
};
