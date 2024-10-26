class UserDto {
  id;
  username;
  email;
  role;
  createdAt;
  updatedAt;

  constructor(user) {
    const { password, ...data } = user;
    Object.assign(this, data);
  }
}

module.exports = UserDto;
