import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";

export const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editCabinId, ...editValues } = cabinToEdit
  const isEdit = Boolean(editCabinId)
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {}
  })
  const {createCabin, isAdding} = useCreateCabin()
  const {editCabin, isEditing} = useEditCabin()
  const { errors } = formState

  const onSubmit = data => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if(isEdit) editCabin({newCabinData: {...data, image}, id: editCabinId}, {
      onSuccess: () => reset()
    })
    else createCabin({ ...data, image }, {
      onSuccess: () => reset()
    })
  }

  const onError = error => {
    toast.error('There wwas some error in submittion of form!!!')
    console.error(error.message)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="cabin Name">
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register('name', {
          required: 'This field is required!!!'
        })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="max_capacity">Maximum capacity</Label>
        <Input type="number" id="max_capacity" {...register('max_capacity', {
          required: 'This field is required!!!'
        })}/>
        {errors?.max_capacity?.message && <Error>{errors.max_capacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="price">Price</Label>
        <Input type="number" id="price" {...register('price', {
          required: 'This field is required!!!',
          min: {
            value: 1,
            message: 'Minimum price should be 1'
          }
        })} />
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          validate: value => {
            if (value > getValues().price) return 'Discount should be lesser than price!!!';
          }
        })} />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register('description')} />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register('image', {
          required: isEdit ? false : 'This field is required!!!'
        })} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button> 
        {isEdit ?
          <Button disabled={isEditing}>{isEditing ? 'Editing...' : `Edit Cabin`}</Button> :
          <Button disabled={isAdding}>{isAdding ? 'Adding...' : 'Add cabin'}</Button>
        }
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;