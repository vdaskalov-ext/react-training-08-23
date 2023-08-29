import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Issue } from './model/issue';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { environment } from 'src/environments/environment';
import { getToken } from '../components/auth/auth-utils';

const getAuthHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

export const fetchIssues = createAsyncThunk('issues/fetch', async () => {
  const response = await fetch(`${environment.API_URL}/issues`, {
    method: 'GET',
    ...getAuthHeader(),
  });
  const resp = await response.json();
  return (resp.issues as Issue[]) || [];
});

export const saveIssues = createAsyncThunk(
  'issues/store',
  async (_arg, { getState }) => {
    const state = getState() as RootState;
    const issues = state.issueTracker.issues;
    await fetch(`${environment.API_URL}/issues`, {
      method: 'POST',
      ...getAuthHeader(),
      body: JSON.stringify({ issues }),
    });
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.issues = action.payload;
    });
    builder.addCase(fetchIssues.rejected, (state, action) => {
      // TODO: handle error - modify state accordingly
    });
  },
});

export const { addIssue, removeIssue, updateIssue } = issueTrackerSlice.actions;

const issueSelector = (state: RootState) => state.issueTracker.issues;
export const useIssues = (): Issue[] => useAppSelector(issueSelector);
