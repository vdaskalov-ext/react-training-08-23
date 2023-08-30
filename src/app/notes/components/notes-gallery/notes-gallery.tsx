import {useComponentsTranslation} from "../../../i18n";
import {Box, Grid, Fab, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import {Note} from "../../model/note";
import {NoteCard} from "../note-card";
import {useAddNote, useNotes} from "../../hooks";

const notes: Note[] = [
    {text: 'Test Note Text1', title: 'Note Title'},
    {text: 'Test Note Text2', title: 'Note Title'},
    {text: 'Test Note Text3', title: 'Note Title'},
]

export const NotesGallery = () => {
    const {t} = useComponentsTranslation('NotesGallery')
    const {mutate: addNote} = useAddNote();
    const noteResponse = useNotes();
    const notes = Object.values(noteResponse).map(note => note as Note);

    return (<Box sx={{width: '100%', padding: '2rem'}}>
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Typography variant="h4">{t('title')}</Typography>
            </Grid>
            <Grid container item spacing={3}>
                {notes.map((note, idx) =>
                    <Grid xl={2} md={4} sm={6} xs={12} item key={`${note.id}-${note.title}-${idx}`}>
                        <NoteCard note={note}/>
                    </Grid>
                )}
            </Grid>
            <Grid item>
                <Fab color="primary" aria-label="add note" onClick={() => addNote({title: 'new note', text: ''})}>
                    <AddIcon/>
                </Fab>
            </Grid>
        </Grid>
    </Box>);
}