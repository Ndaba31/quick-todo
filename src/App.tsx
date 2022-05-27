import { Avatar, Box, Button, Container, createTheme, Divider, InputBase, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import Tasks from './components/Tasks/Tasks';

interface IFormInput {
  task: string;
}

export interface Task {
  id: string,
  task: string,
  done: boolean
}

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1F8B72',
      },
      secondary: {
        main: '#105748',
      },
    },
  });

  const [tasks, setTasks] = useState<Task[]>([])

  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    setTasks((state) => ([...state, { id: uuidv4(), task: data, done: false }]))
    reset();
  };



  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth='sm'
      >
        <Box sx={{ display: 'flex' }} justifyContent={'center'} alignItems='center'>
          <Avatar
            alt="Forest Tech Logo"
            src="/forest.jpg"
            sx={{ width: 100, height: 100, border: '2px solid #1F8B72', mt: 2 }}
          />
        </Box>
        <Typography
          variant='h4'
          align='center'
          color='primary'
          sx={{
            pt: 2
          }}
          gutterBottom>
          Welcome to Todo Task Manager
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Container
            sx={{
              textAlign: "center",
              pt: 2
            }}
          >
            <Controller
              name="task"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { isTouched, isDirty } }) =>
                <InputBase
                  onChange={onChange}
                  required
                  autoFocus
                  value={value}
                  placeholder="Name of task"
                  fullWidth
                  color='primary'
                  sx={{
                    input: { color: 'lightgrey' },
                    border: '1px solid #1F8B72',
                    borderRadius: '10px',
                    p: 2
                  }}
                />}
            />
            <Button onClick={() => reset()} variant='outlined' sx={{ m: 2 }}>Clear</Button>
            <Button type='submit' variant='contained' sx={{ m: 2 }}>Add</Button>
          </Container>
        </form>
        <Divider variant='middle' sx={{ background: 'lightgrey', mt: 1 }} />
        <Tasks tasks={tasks} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
