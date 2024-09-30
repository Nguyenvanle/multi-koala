export type LessonDetailsBody = {
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

export type LessonDetailsRes = {
  code: number;
  message: string;
  result: LessonDetailsBody;
};

export type LessonBodyList = LessonDetailsBody[];

export type LessonResList = {
  code: number;
  message: string;
  result: LessonBodyList;
};
