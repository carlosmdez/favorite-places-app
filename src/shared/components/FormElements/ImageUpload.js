import React, { useRef, useState, useEffect } from 'react'

import Button from './Button'

import './ImageUpload.css'

const ImageUpload = props => {
  const { center, id, onInput, errorText } = props

  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)

  const filePickerRef = useRef()

  useEffect(() => {
    if (!file) return
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = event => {
    const { files } = event.target
    let pickedFile
    let fileIsValid = false
    console.log(files)
    if (files || files.length === 1) {
      pickedFile = files[0]
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      fileIsValid = false
      setIsValid(false)
    }
    onInput(id, pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className='form-control'>
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg, .png, .jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl ? (
            <img src={previewUrl} alt='Preview' />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          Pick image
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  )
}

export default ImageUpload
