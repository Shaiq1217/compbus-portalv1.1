import { useForm, Controller } from 'react-hook-form';
import { Button, FormControl, FormHelperText, Input, InputLabel, Grid, Typography } from '@mui/material';
import usePostMutation from '../../api/post-query';
import { ILogin, IUser } from '../../types/user';
import { useNavigate } from 'react-router-dom';
interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const loginUser = usePostMutation<ILogin, IUser>('login');
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginUser.mutateAsync(data);
      if (response.data?.isDeleted) {
        console.error('User is deleted');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Typography variant="h4" gutterBottom>
          Welcome to <span style={{ fontWeight: 'bold' }}>Compbus</span>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={Boolean(errors.email)} fullWidth margin="normal">
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => <Input id="email" aria-describedby="Email" {...field} />}
            />
            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl error={Boolean(errors.password)} fullWidth margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => <Input id="password" aria-describedby="Password" type="password" {...field} />}
            />
            {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
