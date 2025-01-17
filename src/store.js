import { init } from "@rematch/core";
import { auth } from "./models/auth";
import { dashboard } from "./models/dashboard";
import { productsStore } from "./models/products";
import { customersStore } from "./models/customers";
import { quotesStore } from "./models/quotes";
<<<<<<< HEAD
import { usersStore } from "./models/users";

=======
import users from "./models/users";
>>>>>>> df3a81fe79aa14fcbc33b62e186e8642e1af7262
const store = init({
  models: {
    auth,
    dashboard,
    productsStore,
    customersStore,
    quotesStore,
<<<<<<< HEAD
    usersStore,
=======
    users,
>>>>>>> df3a81fe79aa14fcbc33b62e186e8642e1af7262
  },
});

export default store;
