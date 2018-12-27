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
