// Central place for hero/profile content. Keeping copy out of the
// component markup makes it easy to update without touching JSX.

import profilePhoto from "../assets/images/profile-photo.jpg";
import resume from "../assets/documents/APM_Arboleda_Resume.pdf";

export const profile = {
  name: "Aaron Arboleda",
  title: "Computer Engineer & Aspiring Product Manager",
  badge: "ENGINEERING → PRODUCT",
  bio: `Aaron has a passion for defining how technology looks, feels, and functions — from a blank canvas, to clear technical requirements, to a team shipping something real. I act as a bridge between craftsmanship and digital innovation. I'm most interested in situations where I get to sit between engineering and the people who use what gets built.`,
  tagline:
    "I treat product development like a hand worth playing well — read the table, know the stakes, commit.",
  photo: profilePhoto,
  cards: [
    {
      label: "LATEST PROJECT",
      body: "Algorhythm: a sleep sound therapy device with mobile app to help people improve their sleep quality",
    },
    {
      label: "AVAILABILITY",
      body: "Fresh grad. Open to IT, product, and design roles.",
    },
  ],
  cta: {
    label: "GET MY RESUME",
    href: resume,
  },
  socials: [
    { label: "LinkedIn", handle: "Aaron Hans Arboleda", href: "https://www.linkedin.com/in/aaron-hans-arboleda-121b76372/" },
    { label: "GitHub", handle: "Flere2134", href: "https://github.com/Flere2134" },
  ],
};