import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import Table from './Table.js'
import { members } from './membersCol.js'

const Members = () => {
  const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // Flag to check component mount status
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8000/members')
    //     if (isMounted) {
    //       setData(response.data)
    //       setLoading(false)
    //     }
    //   } catch (error) {
    //     if (isMounted) {
    //       console.error('Error fetching data:', error)
    //       setError(error)
    //       setLoading(false)
    //     }
    //   }
    // }

    // fetchData()

    setData([
      {
          "id": 1,
          "profileImage": "https://example.com/images/avatar1.jpg",
          "fullName": "John Doe",
          "gender": "Male",
          "email": "john.doe@example.com",
          "date": "2025-01-01",
          "status": true,
          "actions": "edit-delete-view"
      },
      {
          "id": 2,
          "profileImage": "https://example.com/images/avatar2.jpg",
          "fullName": "Jane Smith",
          "gender": "Female",
          "email": "jane.smith@example.com",
          "date": "2025-01-02",
          "status": false,
          "actions": "edit-delete-view"
      },
      {
          "id": 3,
          "profileImage": "https://example.com/images/avatar3.jpg",
          "fullName": "Alice Johnson",
          "gender": "Female",
          "email": "alice.johnson@example.com",
          "date": "2025-01-03",
          "status": true,
          "actions": "edit-delete-view"
      },
      {
          "id": 4,
          "profileImage": "https://example.com/images/avatar4.jpg",
          "fullName": "Bob Brown",
          "gender": "Male",
          "email": "bob.brown@example.com",
          "date": "2025-01-04",
          "status": false,
          "actions": "edit-delete-view"
      }
  ])


    return () => {
      isMounted = false // Cleanup function to prevent state update on unmounted component
    }
  }, [])

  return (
    <>
      <section className="container">
        <Table columnDef={members} dataJSON={data} />
      </section>
    </>
  )
}

export default Members
