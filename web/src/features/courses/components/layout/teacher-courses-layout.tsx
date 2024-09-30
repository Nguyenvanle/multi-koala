import React from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const courseData = [
  { id: 1, name: "Khóa học 1", status: "Đang diễn ra", students: 25 },
  { id: 2, name: "Khóa học 2", status: "Sắp khai giảng", students: 15 },
  { id: 3, name: "Khóa học 3", status: "Đã kết thúc", students: 30 },
];

const revenueData = [
  { name: "T1", revenue: 4000 },
  { name: "T2", revenue: 3000 },
  { name: "T3", revenue: 5000 },
  { name: "T4", revenue: 4500 },
  { name: "T5", revenue: 6000 },
  { name: "T6", revenue: 5500 },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Quản lý khóa học</h1>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Thống kê tổng quan */}
          <Card>
            <CardHeader>
              <CardTitle>Tổng quan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Khóa học</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">70</p>
                  <p className="text-sm text-gray-500">Học viên</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">$28,000</p>
                  <p className="text-sm text-gray-500">Doanh thu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thêm khóa học mới */}
          <Card>
            <CardHeader>
              <CardTitle>Thêm khóa học mới</CardTitle>
            </CardHeader>
            <CardContent>
              <Input className="mb-2" placeholder="Tên khóa học" />
              <Button className="w-full">Thêm khóa học</Button>
            </CardContent>
          </Card>

          {/* Biểu đồ doanh thu */}
          {/* <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card> */}

          {/* Danh sách khóa học */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Danh sách khóa học</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên khóa học</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Số học viên</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseData.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.status}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Chỉnh sửa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
