import { useForm } from "react-hook-form";
import { FormRow, Label, Error } from '../cabins/CreateCabinForm';

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";


function SignupForm() {
  const { register, formState: { errors }, getValues, handleSubmit, reset } = useForm()
  const { signUp, isLoading } = useSignUp()

  const onSubmit = ({ fullName, email, password }) => {
    signUp({ fullName, email, password }, {
      onSettled: reset
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="fullName" >Full Name: </Label>
        <Input type="text" id="fullName" disabled={isLoading} {...register('fullName', { require: 'This feild is required' })} />
        {errors?.fullName?.message && <Error>{errors.fullName.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email Address: </Label>
        <Input type="email" id="email" disabled={isLoading} {...register('email', { require: 'This feild is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Please Enter a valid email' } })} />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password: </Label>
        <Input type="password" id="password" disabled={isLoading} {...register('password', { require: 'This feild is required', minLength: { value: 8, message: 'Password length must be at least 8 character' } })} />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Confirm Password: </Label>
        <Input type="password" id="passwordConfirm" disabled={isLoading} {...register('passwordConfirm', { require: 'This feild is required', validate: value => value === getValues().password || 'Password does not matched' })} />
        {errors?.passwordConfirm?.message && <Error>{errors.passwordConfirm.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>{isLoading ? 'Creating User ....' : 'Create new user'}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
