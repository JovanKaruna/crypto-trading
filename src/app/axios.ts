import axios from 'axios'

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
