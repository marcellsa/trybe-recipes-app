import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
  // Configurando estados

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [buttonState, setButtonState] = useState({
    isButtonDisabled: true,
  });

  const [willRedirect, setWillRedirect] = useState();

  // Configurando estados

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCLick = () => {
    const { email } = userInfo;
    localStorage.setItem('user', JSON.stringify({ email }));
    setWillRedirect(true);
  };

  useEffect(() => {
    const isUserInfoValid = () => {
      const { email, password } = userInfo;
      const minPasswordLength = 7;
      if (/\S+@\S+\.\S+/.test(email) && password.length >= minPasswordLength) {
        setButtonState({ isButtonDisabled: false });
      } else {
        setButtonState({ isButtonDisabled: true });
      }
    };
    isUserInfoValid();
    localStorage.clear();
  }, [userInfo]);

  const { email, password } = userInfo;
  const { isButtonDisabled } = buttonState;

  return (
    <div>
      {willRedirect && <Redirect to="meals" />}

      <input
        value={ email }
        name="email"
        onChange={ handleChange }
        type="email"
        data-testid="email-input"
      />
      <input
        value={ password }
        name="password"
        onChange={ handleChange }
        type="password"
        data-testid="password-input"
      />
      <button
        type="button"
        disabled={ isButtonDisabled }
        onClick={ handleCLick }
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}
