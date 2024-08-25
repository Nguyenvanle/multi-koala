type User =
  | {
      firstName: string;
      lastName: string;
      userBirth: Date;
      email: string;
      homeTown: string;
      imageUrl?: string;
    }
  | undefined;
