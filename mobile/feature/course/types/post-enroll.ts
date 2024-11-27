export type PostEnrolled = {
  code: 200;
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
      firstLogin: boolean;
      deleted: boolean;
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
        firstLogin: boolean;
        deleted: boolean;
      };
      approvedByAdmin: {
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
        firstLogin: boolean;
        deleted: boolean;
      };
      status: string;
      deleted: boolean;
    };
    suggest: boolean;
  };
};
