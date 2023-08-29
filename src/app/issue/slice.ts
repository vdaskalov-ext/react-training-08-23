import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue } from './model/issue';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';

interface IssueTrackerState {
  issues: Issue[];
}

const initialState: IssueTrackerState = {
  issues: [],
};

export const issueTrackerSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    removeIssue: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload
      );
    },
    updateIssue: (state, action: PayloadAction<Issue>) => {
      const { id } = action.payload;
      const issueIndex = state.issues.findIndex((issue) => issue.id === id);
      if (issueIndex !== -1) {
        state.issues[issueIndex] = action.payload;
      }
    },
  },
});

export const { addIssue, removeIssue, updateIssue } = issueTrackerSlice.actions;

const issueSelector = (state: RootState) => state.issueTracker.issues;
export const useIssues = () => useAppSelector(issueSelector);
