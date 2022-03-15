import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';

import { AuthContext } from '../../Context/auth-context';
import AlertMessage from '../Layout/AlertMessage';

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = event =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match!' });
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success)
        setAlert({ type: 'danger', message: registerData.message });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className='m-3' onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className='m-2'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            autoomplete='off'
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            autoComplete='off'
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant='success' type='submit' className='m-2'>
          Register
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ms-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
