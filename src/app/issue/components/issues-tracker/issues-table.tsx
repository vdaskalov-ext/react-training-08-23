import {FC, useEffect} from 'react';
import {Box, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridRowModel,
} from '@mui/x-data-grid';
import {Issue, IssuePriority, issueFactory} from '../../model/issue';
import {useAppDispatch} from 'src/app/redux/hooks';
import {
    addIssue,
    fetchIssues,
    saveIssues,
    updateIssue,
    useIssues,
} from '../../slice';
import {useEnumsTranslation} from "../../../i18n";

export const IssuesTable: FC = () => {
    const issues = useIssues();
    const dispatch = useAppDispatch();
    const {t: enumsT} = useEnumsTranslation('Priority');

    useEffect(() => {
        dispatch(fetchIssues());
    }, [dispatch]);

    const processRowUpdateHandler = (params: GridRowModel) => {
        dispatch(updateIssue(params as Issue));
        return params;
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            sortable: false,
            filterable: false,
            type: 'string',
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 150,
            sortable: false,
            filterable: true,
            editable: true,
            type: 'string',
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 450,
            sortable: false,
            filterable: false,
            editable: true,
            type: 'string',
        },
        {
            field: 'completed',
            headerName: 'Completed',
            width: 50,
            sortable: true,
            filterable: true,
            editable: true,
            type: 'boolean',
        },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 70,
            sortable: true,
            filterable: true,
            editable: true,
            type: 'singleSelect',
            valueFormatter: (params) => enumsT(params.value ?? undefined),
            valueOptions: Object.values(IssuePriority),
            getOptionLabel: (option) => enumsT(option),
        },
        {
            field: 'openedOnDate',
            headerName: 'Opened On',
            width: 100,
            sortable: true,
            filterable: false,
            editable: false,
            type: 'date',
            valueFormatter: (params) => new Date(params.value).toUTCString(),
        },
    ];

    return (
        <Box>
            <DataGrid
                columns={columns}
                rows={issues}
                slots={{
                    toolbar: EditToolbar,
                }}
                processRowUpdate={processRowUpdateHandler}
            />
        </Box>
    );
};

const EditToolbar: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <GridToolbarContainer>
            <Button
                startIcon={<AddIcon/>}
                variant="contained"
                onClick={() => {
                    dispatch(addIssue(issueFactory()));
                }}
            >
                Add Issue
            </Button>
            <Button
                startIcon={<SaveIcon/>}
                variant="contained"
                onClick={() => {
                    dispatch(saveIssues());
                }}
            >
                Save
            </Button>
        </GridToolbarContainer>
    );
};
