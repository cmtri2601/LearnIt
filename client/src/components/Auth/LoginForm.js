import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';

import { AuthContext } from '../../Context/auth-context';
import AlertMessage from '../Layout/AlertMessage';

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = event =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async event => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success)
        setAlert({ type: 'danger', message: loginData.message });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className='m-3' onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className='m-2'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='on'
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='info' size='sm' className='ms-2'>
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
