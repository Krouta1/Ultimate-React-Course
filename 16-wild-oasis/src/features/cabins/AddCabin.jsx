/* eslint-disable no-unused-vars */

import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

import React from 'react';

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Button opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Button>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
