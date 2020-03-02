function constructSocialURL(type, field) {
  switch (type) {
    case 'email':
      return `mailto:${field}`;
    case 'twitter':
      // https://twitter.com/jack
      return `https://twitter.com/${field}`;
    case 'instagram':
      // https://www.instagram.com/zuck/
      return `https://instagram.com/${field}/`;
    case 'snapchat':
      // https://www.snapchat.com/add/slc56
      return `https://www.snapchat.com/add/${field}`;
    case 'linkedin':
      // https://www.linkedin.com/in/jackhowa/
      return `https://www.linkedin.com/in/${field}/`;
    case 'reddit':
      // https://www.reddit.com/user/NotAnishKapoor/
      return `https://www.reddit.com/user/${field}/`;
    case 'youtube':
      // https://www.youtube.com/user/chasereeves
      return `https://www.youtube.com/user/${field}`;
    case 'medium':
      // weird requires @ signs
      // https://medium.com/@dan_abramov
      return `https://medium.com/${field}`;
    case 'tumblr':
      // john green https://fishingboatproceeds.tumblr.com/
      return `https://${field}.tumblr.com/`;
    case 'pinterest':
      return `https://www.pinterest.com/${field}/`;
    case 'soundcloud':
      return `https://soundcloud.com/${field}`;
    case 'whatsapp':
      return `https://wa.me/${field}`;
    default:
      return field;
  }
}

export default constructSocialURL;
