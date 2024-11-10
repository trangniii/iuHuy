const MoviePaths = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  MOVIES: "/movies",
  CHECKOUT: "/checkout",
  BOOKING: "/booking",
  LOGOUT: "/logout",
  DASHBOARD: "/dashboard",
  ADMIN_HALLS: "/halls",
  ADMIN_PRICE: "/priceSeatsManage",
  ADMIN_ADD_PRICE: "/addPriceSeats",
  ADMIN_UPDATE_PRICE: "/updatePriceSeats",
  ADMIN_DELETE_PRICE: "/deletePriceSeats",
  ADMIN_MOVIE: "/list-movies",
  ADMIN_UPDATE_MOVIE: "/change-movie",
  ADMIN_ADD_MOVIE: "/add-movie",
  ADMIN_DELETE_MOVIE: "/delete-movie",
  // Generate path with params

  movieDetail(id) {
    return `${this.MOVIES}/${id}`;
  },
  checkout(id, ...args) {
    return `${this.CHECKOUT}/${id}${args.join("")}`;
  },
  booking(id, ...args) {
    return `${this.BOOKING}/${id}${args.join("")}`;
  },
  loginFrom(returnUrl) {
    return `${this.LOGIN}?from=${returnUrl}`;
  },

  deletePrice(id) {
    return `${this.ADMIN_DELETE_PRICE}/${id}`;
  },
  updatePrice(id) {
    return `${this.ADMIN_UPDATE_PRICE}/${id}`;
  },
  changeMovie(id) {
    return `${this.ADMIN_UPDATE_MOVIE}/${id}`;
  },
  deleteMovie(id) {
    return `${this.ADMIN_MOVIE}/${id}`;
  },
};

module.exports = MoviePaths;
