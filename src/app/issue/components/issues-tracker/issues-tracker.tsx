import { FC } from 'react';
import { IssuesTable } from './issues-table';

export const IssuesTracker: FC = () => {
  return (
    <>
      <h1>Issue Tracker</h1>
      <IssuesTable />
    </>
  );
};
