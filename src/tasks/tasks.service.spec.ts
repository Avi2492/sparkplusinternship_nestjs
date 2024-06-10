/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();
    tasksService = await module.get(TasksService);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', () => {
      expect(getTasks).not.toHaveBeenCalled;
    });
  });
});
