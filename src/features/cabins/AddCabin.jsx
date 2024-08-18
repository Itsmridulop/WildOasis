import { useState } from "react"

import Button from '../../ui/Button'
import CreateCabinForm from '../cabins/CreateCabinForm'
import Modal from "../../ui/Modal"


function AddCabin() {
    return <Modal>
        <Modal.Open opens="cabin-form">
            <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
            <CreateCabinForm />
        </Modal.Window>
    </Modal>
}

export default AddCabin
