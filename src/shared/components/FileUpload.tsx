import * as React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function FileUpload() {
  const [state, setState] = React.useState([])
  return (
    <FilePond
      files={state}
      allowMultiple={true}
      server="/api/moments"
      onupdatefiles={items => {
        setState(items.map(item => item.file))
      }}
    />
  )
}

export { FileUpload }
