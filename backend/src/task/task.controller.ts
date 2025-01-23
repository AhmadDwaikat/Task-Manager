
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return this.taskService.findAll();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  async createTask(@Body('title') title: string, @Body('description') description?: string) {
    return this.taskService.create(title, description);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updateData: Partial<Task>) {
    return this.taskService.update(id, updateData); 
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
