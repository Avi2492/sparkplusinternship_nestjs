/* eslint-disable prettier/prettier */

import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
