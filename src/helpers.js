import md5 from "md5";

export const getAvatar = email => {
  const hashedEmail = md5(email.toLowerCase());
  const url = `http://gravatar.com/avatar/${hashedEmail}`;
  return fetch(`${url}.png?d=404'`)
    .then(res => {
      return res.url;
    })
    .catch(() => {
      return randomPizzaImage();
    });
};

export const getPizzaName = () => {
  const pizzas = [
    "Margherita",
    "Marinara",
    "Quattro Stagioni",
    "Carbonara",
    "Frutti di Mare",
    "Quattro Formaggi",
    "Crudo",
    "Napoletana",
    "Pugliese",
    "Montanara",
    "Emiliana",
    "Romana",
    "Fattoria",
    "Schiacciata",
    "Prosciutto",
    "Americana",
    "Tonno",
    "Valtellina",
    "Gorgonzola",
    "Calzone",
    "Pizza al Pesto",
    "Mediterranea",
    "Ortolana",
    "Diavola",
    "Rustica",
    "Contadina",
    "Parmigiana",
    "Capricciosa",
    "Ricotta e Spinaci",
    "Mare e Monti",
    "Padana",
    "Tedesca",
    "Tirolese",
    "Boscaiola",
    "Campagnola",
    "Vegetariana",
    "Bufalina",
    "Fontana",
    "Francescana",
    "Tartufata",
    "Tricolore",
    "Valdostana",
    "Caprese",
    "Fiori di zucca",
    "Bismarck",
    "Funghi",
    "Mimosa"
  ];

  return `${pizzas[Math.floor(Math.random() * pizzas.length)]}-${Math.floor(
    Math.random() * 100
  )}`;
};

export const randomPizzaImage = () => {
  const images = [
    "barbacoa_del.png",
    "carbonara_del.png",
    "caribena_del.png",
    "carne_lovers_del.png",
    "hawaiana_del.png",
    "kebab_lovers_del.png",
    "margarita_del.png",
    "marinera_del.png",
    "peperoni_lovers_del.png",
    "pollo_parrilla_del.png",
    "queso_de_cabra_del.png",
    "queso_lovers_del.png",
    "serrana_del.png",
    "super_suprema_del.png",
    "suprema_del.png",
    "tejana_del.png",
    "veggie_lovers_del.png"
  ];

  return `/images/${images[Math.floor(Math.random() * images.length)]}`;
};

// Dev helpers
export const sampleUsers = () => {
  this.setState({
    users: null,
    currentUser: null
  });
  console.log(this.state);
  this.setState({
    users: {
      Dummy1: {
        name: "James",
        votes: 3,
        avatar: "/images/barbacoa_del.png"
      },
      Dummy2: {
        name: "Tanya",
        votes: 2,
        avatar: "/images/carbonara_del.png"
      },
      Dummy3: {
        name: "Leia",
        votes: 7,
        avatar: "/images/caribena_del.png"
      },
      Dummy4: {
        name: "Robert",
        votes: 3,
        avatar: "/images/carne_lovers_del.png"
      },
      Dummy5: {
        name: "Caroline",
        votes: 5,
        avatar: "/images/hawaiana_del.png"
      },
      Dummy6: {
        name: "Tansly",
        votes: 2,
        avatar: "/images/kebab_lovers_del.png"
      },
      Dummy7: {
        name: "Chilli",
        votes: 6,
        avatar: "/images/margarita_del.png"
      },
      Dummy8: {
        name: "Victoria",
        votes: 1,
        avatar: "/images/marinera_del.png"
      },
      Dummy9: {
        name: "Jake",
        votes: 3,
        avatar: "/images/peperoni_lovers_del.png"
      },
      Dummy10: {
        name: "Amelia",
        votes: 2,
        avatar: "/images/pollo_parrilla_del.png"
      },
      Dummy11: {
        name: "Mini",
        votes: 2,
        avatar: "/images/queso_de_cabra_del.png"
      }
    }
  });
  console.log("Loaded Sample Users");
};
