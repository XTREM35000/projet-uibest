import bcrypt from "bcryptjs";

const plainPassword = "123456"; // Le mot de passe que vous tentez de vérifier
const storedHash =
  "$2a$10$rxJ18iUL2tgMMkh4QeetXuPKVLi0iUygmMI0mIyamu8IzW4mzRYYm"; // Le hachage stocké

bcrypt
  .compare(plainPassword, storedHash)
  .then((isMatch) => {
    console.log("Mot de passe correct :", isMatch); // Cela devrait être true si la comparaison est correcte
  })
  .catch((error) => {
    console.error("Erreur lors de la comparaison :", error);
  });
