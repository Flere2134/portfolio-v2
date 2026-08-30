// Central place for hero/profile content. Keeping copy out of the
// component markup makes it easy to update without touching JSX.

export const profile = {
  name: "Aaron Arboleda",
  title: "Computer Engineer & Aspiring Product Manager",
  // TODO: decide on final badge copy
  badge: "ENGINEERING → PRODUCT",
  bio: `Aaron has a passion for defining how technology looks, feels, and functions — from a blank canvas, to clear technical requirements, to a team shipping something real. I act as a bridge between craftsmanship and digital innovation. I'm most interested in situations where I get to sit between engineering and the people who use what gets built.`,
  tagline:
    "I treat product development like a hand worth playing well — read the table, know the stakes, commit.",
  photo: "/src/assets/images/profile-photo.jpg",
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
    label: "VIEW CASE STUDIES",
    href: "#case-studies",
  },
  socials: [
    { label: "LinkedIn", handle: "Aaron Hans Arboleda", href: "https://www.linkedin.com/in/aaron-hans-arboleda-121b76372/" },
    { label: "GitHub", handle: "Flere2134", href: "https://github.com/Flere2134" },
  ],
};
