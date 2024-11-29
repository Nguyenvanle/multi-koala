export type SuggestEnrolled = {
  code: number;
  message: string;
  result: {
    enrollCourseId: string;
    enrollAt: Date;
    process: number;
    student: {
      userId: string;
      username: string;
      firstname: string;
      lastname: string;
      userBirth: Date;
      userBio: string;
      userHometown: string;
      email: string;
      image: {
        imageId: string;
        imageUrl: string;
      };
      roles: [
        {
          roleName: string;
          roleDescription: string;
          permissions: [];
        }
      ];
      deleted: boolean;
      firstLogin: boolean;
    };
    course: {
      courseId: string;
      courseName: string;
      courseUploadedAt: Date;
      courseResponsibilityEndAt: Date;
      coursePrice: number;
      courseDescription: string;
      courseLevel: string;
      types: [
        {
          typeName: string;
          typeDescription: string;
        },
        {
          typeName: string;
          typeDescription: string;
        }
      ];
      fields: [
        {
          fieldName: string;
          fieldDescription: string;
        },
        {
          fieldName: string;
          fieldDescription: string;
        }
      ];
      image: {
        imageId: string;
        imageUrl: string;
      };
      uploadedByTeacher: {
        userId: string;
        username: string;
        firstname: string;
        lastname: string;
        userBirth: Date;
        userBio: string;
        userHometown: string;
        email: string;
        image: {
          imageId: string;
          imageUrl: string;
        };
        roles: [
          {
            roleName: string;
            roleDescription: string;
            permissions: [];
          }
        ];
        deleted: boolean;
        firstLogin: boolean;
      };
      approvedByAdmin: {
        userId: string;
        username: string;
        firstname: string;
        lastname: string;
        userBirth: string;
        userBio: string;
        userHometown: string;
        email: string;
        image: {
          imageId: string;
          imageUrl: string;
        };
        roles: [
          {
            roleName: string;
            roleDescription: string;
            permissions: [];
          }
        ];
        createByAdmin: {
          userId: string;
          username: string;
          firstname: string;
          lastname: string;
          userBirth: Date;
          userBio: string;
          userHometown: string;
          email: string;
          image: {
            imageId: string;
            imageUrl: string;
          };
          roles: [
            {
              roleName: string;
              roleDescription: string;
              permissions: [];
            }
          ];
          createByAdmin: string;
          deleted: boolean;
          firstLogin: boolean;
        };
        deleted: boolean;
        firstLogin: boolean;
      };
      status: string;
      deleted: boolean;
    };
    suggest: boolean;
  };
};
