export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfile = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateUserPost = {
  title: string;
  description: string;
};
