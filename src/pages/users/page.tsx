import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { User, UserData } from '../../types'
import { getAllUsersByPage } from '../../api'
import UserCard from '../../components/UserCard'
import Pagination from '../../components/Pagination'

function Users() {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [page, setPage] = useState<UserData['page']>(1)
  const [totalPages, setTotalPages] = useState<UserData['total_pages']>(1)
  const getData = useCallback(async (page: number) => {
    const res: UserData | undefined = await getAllUsersByPage(page)
    if (res) {
      setAllUsers(res.data)
      setTotalPages(res.total_pages)
    }
  }, [])

  useEffect(() => {
    getData(page)
  }, [page, getData])

  const memoizedUsers: User[] = useMemo(() => allUsers, [allUsers])

  const handlePageChange: (newPage: number) => void = (newPage: number) => {
    setPage(newPage)
  }
  return (
    <div className='flex flex-row justify-center items-center h-screen flex-wrap gap-10'>
      {memoizedUsers.map(item => (
        <div key={item.id}>
          <UserCard data={item} key={item.id} />
        </div>
      ))}
      <div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Users
