const MoviePaths = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  MOVIES: "/movies",
  CHECKOUT: "/checkout",
  BOOKING: "/booking",
  LOGOUT: "/logout",
  DASHBOARD: "/dashboard",
  ADMIN_HALLS: "/dashboard/halls",
  ADMIN_PRICE: "/dashboard/priceSeatsManage",
  ADMIN_ADD_PRICE: "/dashboard/addPriceSeats",
  ADMIN_UPDATE_PRICE: "/dashboard/updatePriceSeats",
  ADMIN_DELETE_PRICE: "/dashboard/deletePriceSeats",
  ADMIN_MOVIE: "/dashboard/list-movies",
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
};

module.exports = MoviePaths;
