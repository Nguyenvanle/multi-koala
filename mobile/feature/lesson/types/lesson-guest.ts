export type LessonResList = {
  code: number;
  message: string;
  result: LessonBodyList;
};

export type LessonBodyList = LessonBody[];

export type LessonBody = {
  lessonId: string;
  lessonName: string;
  lessonDescription: string;
  image: {
    imageId: string;
    imageUrl: string;
  };
  video: {
    videoId: string;
    videoUrl: string;
    videoDuration: number;
  };
  lessonUploadedAt: Date;
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
    status: string;
    deleted: boolean;
  };
  deleted: boolean;
  demo: boolean;
};
