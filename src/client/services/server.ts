function getServerApiUrl() {
  return process.env.SERVER_API_URL.toString()
}

async function callFetchAsync(
  url: string,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  body: any = null,
  headers = {}
) {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers
    }),
    body: null
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${getServerApiUrl()}${url}`, {
    method,
    ...options
  })

  if (response.status !== 200) {
    throw new Error(
      `Request failed with status code ${response.status}.  ${await response.text()}`
    )
  }

  return await response.json()
}

function getAsync(url: string) {
  return callFetchAsync(url, 'GET')
}

function postAsync(url: string, body: any) {
  return callFetchAsync(url, 'POST', body)
}

function putAsync(url: string, body: any) {
  return callFetchAsync(url, 'PUT', body)
}

function deleteAsync(url: string, body: any) {
  return callFetchAsync(url, 'DELETE', body)
}

async function uploadPhotoAsync(apiUrl: string, uri: string) {
  const uriParts = uri.split('.')
  const filename = uriParts[uriParts.length - 2]
  const fileType = uriParts[uriParts.length - 1]

  const formData = new FormData()
  formData.append('photo', {
    uri,
    name: `${filename}.${fileType}`,
    type: `image/${fileType}`
  })

  const options = {
    method: 'POST',
    body: formData,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    })
  }

  const response = await fetch(`${getServerApiUrl()}${apiUrl}`, options)

  if (response.status !== 200) {
    throw new Error(
      `Request failed with status code ${response.status}.  ${await response.text()}`
    )
  }

  return response.json()
}

export { getAsync, postAsync, putAsync, deleteAsync, uploadPhotoAsync, getServerApiUrl }
