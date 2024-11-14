export type LessonBody = {
  lessonId: string;
  lessonName: string;
  image: {
    imageUrl: string;
    image: string;
  };
  video: {
    videoId: string;
    videoUrl: string;
    videoDuration: number;
  };
  lessonDescription: string;
};

export type LessonRes = {
  code: number;
  message: string;
  result: LessonBody;
};

export type LessonBodyList = LessonBody[];

export type LessonResList = {
  code: number;
  message: string;
  result: LessonBodyList;
};
