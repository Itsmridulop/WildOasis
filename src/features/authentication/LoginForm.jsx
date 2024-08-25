import { useState } from "react";
import { FormRow, Label } from '../cabins/CreateCabinForm';
import { useLogin } from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from '../../ui/SpinnerMini'

function LoginForm() {
  const [email, setEmail] = useState("test@admin.in");
  const [password, setPassword] = useState("test12345678");
  const {login, isLoading} = useLogin()


  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return
    login({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow style={{ display: 'flex', flexDirection: 'column' }} label="Email address">
        <Label htmlFor="email">Email address:</Label>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow style={{ display: 'flex', flexDirection: 'column' }} label="Password">
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <Button style={{ width: '100%' }} size="large" disabled={isLoading}>{isLoading ? <SpinnerMini/> : 'Login'}</Button>
    </Form>
  );
}

export default LoginForm;
