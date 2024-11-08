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
};

module.exports = MoviePaths;
