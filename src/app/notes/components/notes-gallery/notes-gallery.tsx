import {useComponentsTranslation} from "../../../i18n";
import {Box, Grid, Fab, Typography, Divider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import {Note} from "../../model/note";
import {NoteCard} from "../note-card";
import {useAddNote, useNotes} from "../../hooks";

export const NotesGallery = () => {
    const {t} = useComponentsTranslation('NotesGallery')
    const {mutate: addNote} = useAddNote();
    const noteResponse = useNotes();
    const notes = Object.values(noteResponse).map(note => note as Note);
    const hasFavorites = notes.some(note => note.favorite)

    return (
        <Box sx={{width: '100vw', height: 'calc(100% - 40px)'}}>
            <Box sx={{
                width: 'calc(100% - 4rem)',
                height: 'calc(100% - 4rem)',
                paddingLeft: '2rem',
                position: 'relative',
                passing: '2rem',
                overflow: 'auto'
            }}>
                <Grid container direction="column" spacing={1} sx={{width: '100%'}}>
                    <Grid item>
                        <Typography variant="h4">{t('title')}</Typography>
                    </Grid>
                    {hasFavorites && <>
                        <Grid container item spacing={3}>
                            {notes.filter(note => note.favorite).map((note, idx) =>
                                <Grid xl={2} md={4} sm={6} xs={12} item key={note.id}>
                                    <NoteCard note={note}/>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item>
                            <Divider sx={{width: '100%'}} />
                        </Grid>
                    </>}
                    <Grid container item spacing={3}>
                        {notes.filter(note => !note.favorite).map((note, idx) =>
                            <Grid xl={2} md={4} sm={6} xs={12} item key={note.id}>
                                <NoteCard note={note}/>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{position: 'absolute', bottom: '1.5rem', right: '1.5rem'}}>
                <Fab color="primary" aria-label="add note" onClick={() => addNote({title: 'new note', text: ''})}>
                    <AddIcon/>
                </Fab>
            </Box>
        </Box>
    );
}