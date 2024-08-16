import { FormRow, Label } from '../cabins/CreateCabinForm';
import { useSettings } from './useSettings';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner'
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const { settings: { min_booking_length, max_booking_length, breakfast_price, max_guests_per_booking } = {}, isSettingLoading } = useSettings()
  const { isUpdating, updateSetting } = useUpdateSettings()

  const handleUpdate = (e, feild) => {
    const {value} = e.target
    if(!value) return
    updateSetting({[feild]: value})
  }

  if (isSettingLoading) return <Spinner />
  return (
    <Form>
      <FormRow>
        <Label htmlFor='min_booking_length'>Minimum nights/booking:</Label>
        <Input type='number' id='min_booking_length' defaultValue={min_booking_length} disabled={isUpdating} onBlur={e => handleUpdate(e, 'min_booking_length')} />
      </FormRow>
      <FormRow>
        <Label htmlFor='max_booking_length'>Maximum nights/booking:</Label>
        <Input type='number' id='max_booking_length' defaultValue={max_booking_length} disabled={isUpdating} onBlur={e => handleUpdate(e, 'max_booking_length')}/>
      </FormRow>
      <FormRow>
        <Label htmlFor='max_guests_per_booking'>Maximum guests/booking:</Label>
        <Input type='number' id='max_guests_per_booking' defaultValue={max_guests_per_booking} disabled={isUpdating} onBlur={e => handleUpdate(e, 'max_guests_per_booking')}/>
      </FormRow>
      <FormRow >
        <Label htmlFor='breakfast_price'>Breakfast price:</Label>
        <Input type='number' id='breakfast_price' defaultValue={breakfast_price} disabled={isUpdating} onBlur={e => handleUpdate(e, 'breakfast_price')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
