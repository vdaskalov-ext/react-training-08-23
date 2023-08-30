import {Note} from "../../model/note";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {Box, Card, CardActions, CardContent, IconButton, Stack, TextField, Typography, useTheme} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import PaletteIcon from '@mui/icons-material/Palette'
import tinycolor from 'tinycolor2';
import {useComponentsTranslation} from "../../../i18n";
import {useDeleteNote, useUpdateNote} from "../../hooks";

interface Props {
    note: Note
}

export const NoteCard: FC<PropsWithChildren<Props>> = ({note}) => {
    const {t} = useComponentsTranslation('NoteCard')

    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);

    const {mutate: updateNote} = useUpdateNote();
    const {mutate: deleteNote} = useDeleteNote()

    useEffect(() => {
        setText(note.text);
        setTitle(note.title);
    }, [note]);

    const theme = useTheme();
    const backgroundColor = note.color ?? theme.palette.primary.light;
    const textColor = tinycolor(backgroundColor).isDark() ? 'white' : 'black';

    return <>
        <Card sx={{
            backgroundColor,
            color: textColor
        }}>
            <CardContent>
                <Box sx={{maxHeight: '200px'}}>
                    <Stack spacing={2} sx={{height: '100%'}}>
                        {editing ?
                            <TextField value={title} label={t('title.label')} fullWidth
                                       onChange={event => setTitle(event.target.value)}/>
                            :
                            <Typography variant="h5">{title}</Typography>
                        }
                        {editing ?
                            <TextField value={text} label={t('text.label')} fullWidth
                                       multiline rows={4}
                                       onChange={event => setText(event.target.value)}/>
                            :
                            <Typography sx={{overflow: 'hidden', textOverflow: 'ellipsis'}} noWrap
                                        dangerouslySetInnerHTML={{__html: text.replace(/\n/g, '<br>')}}/>
                        }
                    </Stack>
                </Box>
            </CardContent>
            <CardActions>
                <Stack direction="row" sx={{width: '100%', justifyContent: 'end'}}>
                    {editing ?
                        <IconButton aria-label={t('saveButton.label')} onClick={() => {
                            setEditing(old => !old)
                            updateNote({...note, text, title})
                        }}>
                            <SaveIcon/>
                        </IconButton>
                        :
                        <IconButton aria-label={t('editButton.label')} onClick={() => setEditing(old => !old)}>
                            <EditIcon/>
                        </IconButton>
                    }
                    {
                        note.favorite ?
                            <IconButton aria-label={t('unfavoriteButton.label')}
                                        onClick={() => updateNote({...note, favorite: false})}>
                                <StarIcon/>
                            </IconButton>
                            :
                            <IconButton aria-label={t('favoriteButton.label')}
                                        onClick={() => updateNote({...note, favorite: true})}>
                                <StarOutlineIcon/>
                            </IconButton>
                    }
                    <IconButton aria-label={t('colorButton.label')} onClick={() => updateNote({...note, color: tinycolor.random().toHexString()})}
                                disabled={editing}>
                        <PaletteIcon/>
                    </IconButton>
                    <IconButton aria-label={t('deleteButton.label')} onClick={() => deleteNote(note)}
                                disabled={editing}>
                        <DeleteIcon/>
                    </IconButton>
                </Stack>
            </CardActions>
        </Card>
    </>;
}