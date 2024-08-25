import { Error, FormRow, Label } from "../cabins/CreateCabinForm";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";


function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="password">New Password:</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Confirm Password:</Label>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm?.message && <Error>{errors.papasswordConfirmssword.message}</Error>}

      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
