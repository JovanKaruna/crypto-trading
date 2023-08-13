import axios from 'axios'

export default axios.create({
  baseURL: 'https://',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
