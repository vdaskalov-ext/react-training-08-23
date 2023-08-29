import { v4 as uuid } from 'uuid';

export enum IssuePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: IssuePriority;
  openedOnDate: number;
}

export const issueFactory = (): Issue => ({
  id: uuid(),
  title: 'new',
  description: '',
  completed: false,
  priority: IssuePriority.LOW,
  openedOnDate: Date.now(),
});
