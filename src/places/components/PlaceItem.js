import React, { useState, useContext } from 'react'

import Map from '../../shared/components/UIElements/Map'
import Card from '../../shared/components/UIElements/Card'
import Modal from '../../shared/components/UIElements/Modal'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Button from '../../shared/components/FormElements/Button'
import useHttpClient from '../../shared/hooks/useHttpClient'
import { AuthContext } from '../../shared/context/authContext'
import { DELETE_PLACE_URL, API_URL } from '../../shared/constants'

import './PlaceItem.css'

const PlaceItem = props => {
  const auth = useContext(AuthContext)
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const {
    id,
    title,
    image,
    address,
    description,
    coordinates,
    creatorId
  } = props

  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)
  const showConfirmModalHandler = () => setShowConfirmModal(true)
  const cancelConfirmModalHandler = () => setShowConfirmModal(false)
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false)
    sendRequest(`${DELETE_PLACE_URL}/${id}`, 'DELETE')
      .then(res => {
        props.onDelete(id)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>Close</Button>}
        onCancel={closeMapHandler}>
        <div className='map-container'>
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={cancelConfirmModalHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
        onCancel={cancelConfirmModalHandler}>
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img src={`${API_URL}/${image}`} alt={title} />
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
            {creatorId === auth.userId && (
              <>
                <Button to={`/places/${id}`}>Edit</Button>
                <Button danger onClick={showConfirmModalHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem
