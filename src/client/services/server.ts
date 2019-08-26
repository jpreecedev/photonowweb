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

  const token = await getFromStorageAsync('jwtoken')
  if (token) {
    options.headers.append('Authorization', `Bearer ${token}`)
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

async function uploadPhotoAsync(apiUrl: string, filename: string, blob: Blob) {
  const formData = new FormData()
  formData.append('photo', blob, filename)

  const options = {
    method: 'POST',
    body: formData
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
