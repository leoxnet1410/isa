import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='wrapper'>
      <Form onSubmit={(e) => e.preventDefault()}>
        <h1>Iniciar Sesión</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' required />
          <i className="fa fa-user"></i>
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' required />
          <i className="fa fa-lock"></i>
        </div>
        <div className='remember-forgot'>
          <label><input type='checkbox' /> Recordar</label>
          <button type='button' className='btn-link' onClick={() => alert('Recuperar Contraseña')}>Olvidó su Contraseña?</button>
        </div>
        <Link to="/welcome" className="btn">Ingresar</Link>
        <div className='register-link'>
          <p>No tienes cuenta? <button type='button' className='btn-link' onClick={() => alert('Registrar')}>Regístrate</button></p>
        </div>
      </Form>
    </div>
  );
};

export default Login;