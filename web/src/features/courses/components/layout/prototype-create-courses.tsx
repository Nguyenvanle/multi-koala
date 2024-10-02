"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Undo2 } from "lucide-react";

// Define an interface for a Lesson
interface Lesson {
  title: string;
  content: string;
}

const CreateCourseLayoutPrototype = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([
    { title: "", content: "" },
  ]);

  const addLesson = () => {
    setLessons([...lessons, { title: "", content: "" }]);
  };

  const updateLesson = (index: number, field: keyof Lesson, value: string) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][field] = value;
    setLessons(updatedLessons);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...");
    // Implement draft saving logic here
  };

  const handleUndo = () => {
    console.log("Undoing changes...");
    // Implement undo logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tạo mới khóa học</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề khóa học</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề khóa học"
              />
            </div>
            <div>
              <Label htmlFor="description">Mô tả ngắn gọn</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả ngắn gọn về khóa học"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Quản lý nội dung</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lessons">
            <TabsList>
              <TabsTrigger value="lessons">Bài học</TabsTrigger>
              <TabsTrigger value="materials">Tài liệu</TabsTrigger>
            </TabsList>
            <TabsContent value="lessons">
              {lessons.map((lesson, index) => (
                <div key={index} className="mb-4">
                  <Input
                    value={lesson.title}
                    onChange={(e) =>
                      updateLesson(index, "title", e.target.value)
                    }
                    placeholder={`Tiêu đề bài học ${index + 1}`}
                    className="mb-2"
                  />
                  <Textarea
                    value={lesson.content}
                    onChange={(e) =>
                      updateLesson(index, "content", e.target.value)
                    }
                    placeholder={`Nội dung bài học ${index + 1}`}
                  />
                </div>
              ))}
              <Button onClick={addLesson} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Thêm bài học
              </Button>
            </TabsContent>
            <TabsContent value="materials">
              <Button>Upload</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Cài đặt giá và thời gian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="price">Giá khóa học</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Nhập giá khóa học"
              />
            </div>
            <div>
              <Label htmlFor="estimatedTime">
                Thời gian dự kiến hoàn thành
              </Label>
              <Input
                id="estimatedTime"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="Ví dụ: 4 tuần"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={handleSaveDraft} variant="outline">
          Lưu nháp
        </Button>
        <Button onClick={handleUndo} variant="outline">
          <Undo2 className="mr-2 h-4 w-4" /> Hoàn tác
        </Button>
        <Button>Tạo khóa học</Button>
      </div>
    </div>
  );
};

export default CreateCourseLayoutPrototype;
