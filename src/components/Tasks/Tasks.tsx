import Checkbox from '@mui/material/Checkbox';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Task } from '../../App'
import CommentIcon from '@mui/icons-material/Comment';
import { Cancel, Delete, Edit } from '@mui/icons-material';

type Props = {
    tasks: Task[]
}

const Tasks = ({ tasks }: Props) => {
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Box marginTop={2} width={'100%'} border={'1px solid red'}>
            <List>
                {tasks.length === 0 ?
                    (
                        <ListItem>
                            <ListItemIcon>
                                <Cancel color='error' />
                            </ListItemIcon>
                            <ListItemText primary={'No Items on the list'} sx={{ color: 'lightgrey' }} />
                        </ListItem>
                    )
                    : tasks.map((task, value) => (
                        <ListItem
                            key={task.id}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="edit" color='primary'>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="edit" color='error'
                                        sx={{
                                            ml: 1
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={task.task} sx={{ color: 'lightgrey' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Box>
    )
}

export default Tasks