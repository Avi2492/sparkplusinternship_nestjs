/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   // If we have any filters defined, call tasksService.getTasksWithFilters Otherwise just get all tasks

  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     const tasks = await this.tasksService.getAllTasks();
  //     console.log('All tasks:', tasks);
  //     return tasks;
  //   }
  // }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Get('/:id')
  // async getTaskById(@Param('id') id: string): Promise<Task> {
  //   const taskById = this.tasksService.getTaskById(id);
  //   if (!taskById) {
  //     throw new NotFoundException(`Task with id ${id} not found`);
  //   }
  //   console.log('Task:', taskById);

  //   return taskById;
  // }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.tasksService.createTask(createTaskDto);
    // console.log('Created task:', task);
    return task;
  }
  // @Post()
  // async createTasks(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  //   const task = await this.tasksService.createTask(createTaskDto);
  //   console.log('Created task:', task);
  //   return task;
  // }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTasksStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    const updateStatus = await this.tasksService.updateTasksStatus(id, status);

    return updateStatus;
  }

  // @Patch('/:id/status')
  // async updateTasksStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ): Promise<Task> {
  //   const updateStatus = await this.tasksService.updateTasksStatus(id, status);

  //   return updateStatus;
  // }
}
