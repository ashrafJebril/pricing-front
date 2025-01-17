import { init } from "@rematch/core";
import { auth } from "./models/auth";
import { dashboard } from "./models/dashboard";
import { productsStore } from "./models/products";
import { customersStore } from "./models/customers";
import { quotesStore } from "./models/quotes";
import { usersStore } from "./models/users";
const store = init({
  models: {
    auth,
    dashboard,
    productsStore,
    customersStore,
    quotesStore,
    usersStore,
  },
});

export default store;
