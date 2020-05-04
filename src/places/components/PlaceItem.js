import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import './PlaceItem.css'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'

const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)
  const showConfirmModalHandler = () => setShowConfirmModal(true)
  const cancelConfirmModalHandler = () => setShowConfirmModal(false)
  const confirmDeleteHandler = () => {
    console.log('Deleted')
  }


  const {
    id,
    title,
    image,
    address,
    description,
    coordinates
  } = props
  return (
    <>
      <Modal
        show={showMap}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>Close</Button>}
        onCancel={closeMapHandler}
      >
        <div className='map-container'>
          <Map center={coordinates} zoom={16}/>
        </div>
      </Modal>
      <Modal
      show={showConfirmModal}
      header='Are you sure?'
      footerClass='place-item__modal-actions'
      footer={
        <>
          <Button inverse onClick={cancelConfirmModalHandler}>Cancel</Button>
          <Button danger onClick={confirmDeleteHandler}>Delete</Button>
        </>
      }
      onCancel={cancelConfirmModalHandler}>
        <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter.</p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={image} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            <Button to={`/places/${id}`}>Edit</Button>
            <Button danger onClick={showConfirmModalHandler}>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem
