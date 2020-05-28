import React, { useState, useEffect } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import useHttpClient from '../../shared/hooks/useHttpClient'
import { GET_USERS_URL } from '../../shared/constants'

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [users, setUsers] = useState([])

  useEffect(() => {
    sendRequest(GET_USERS_URL)
      .then(res => {
        setUsers(res.users)
      })
      .catch(err => console.log(err))
  }, [sendRequest])

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {users && <UsersList items={users} />}
    </>
  )
}

export default Users
