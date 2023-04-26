import axios from 'axios'

export async function getUrl(url: string): Promise<string> {
  axios.interceptors.response.use(
    async function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    async function (error: Error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )

  const response = await axios.request({
    url,
    method: 'get',
    responseType: 'arraybuffer',
    timeout: 5000
  })

  return response.data
}
