import { useState } from "react";
import { FormRow, Label } from '../cabins/CreateCabinForm';
import { useUser } from "./useUser";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";



function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isUpdating } = useUpdateUser()

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return
    updateUser({ fullName, avatar }, {
      onSettled: () => {
        setFullName(currentFullName);
        setAvatar(null)
      }
    })
  }

  function handleCancel() {
    setFullName('');
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label>Email Address:</Label>
        <Input value={email} disabled />
      </FormRow>
      <FormRow >
        <Label htmlFor="fullName">Full Name:</Label>
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow >
        <Label htmlFor="avatar">Avatar Image:</Label>
        <FileInput
          id="avatar"
          disabled={isUpdating}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel} disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>{isUpdating ? 'Updateing user...' : 'Update account'}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
