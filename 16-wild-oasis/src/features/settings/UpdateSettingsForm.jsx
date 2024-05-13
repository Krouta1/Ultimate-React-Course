/* eslint-disable no-unused-vars */
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useEditSetting } from './useEditSetting';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minimumBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { updateSetting, isUpdating } = useEditSetting();

  if (isLoading) {
    return <Spinner />;
  }

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minimumBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minimumBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
