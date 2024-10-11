import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User, UserData } from '../../types'
import UserCard from '../../components/UserCard'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'
import { fetchData } from '../../slice/dataSlice'
import Filter from '../../components/Filter'
import { logout } from '../../slice/authSlice'
import LoadingCard from '../../components/LoadingCard'
import { RootState, AppDispatch } from '../../store'

function Users() {
  const allUsers = useSelector((state: RootState) => state.data.data)
  const status = useSelector((state: RootState) => state.data.status)
  const totalPages = useSelector((state: RootState) => state.data.totalPages)

  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [page, setPage] = useState<UserData['page']>(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputData, setInputData] = useState<string>('')
  const debounceTimeoutRef = useRef<number | null>(null)
  const dispatch: AppDispatch = useDispatch()

  const getData = useCallback(
    async (page: number) => {
      await dispatch(fetchData(page))
    },
    [dispatch],
  )
  useEffect(() => {
    getData(page)
  }, [page, getData])

  useEffect(() => {
    setFilteredUsers(allUsers)
  }, [allUsers])

  const memoizedUsers: User[] = useMemo(() => filteredUsers, [filteredUsers])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.toLowerCase()
      setInputData(searchValue)

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        const filtered = allUsers.filter(
          user =>
            user.first_name.toLowerCase().startsWith(searchValue) ||
            (user.first_name.toLowerCase().includes(searchValue) &&
              user.last_name.toLowerCase().includes(searchValue)),
        )
        setFilteredUsers(filtered)
      }, 600)
    },
    [allUsers],
  )

  const handleSearchClick = useCallback(() => {
    const searchValue = inputRef.current?.value.toLowerCase() || ''
    const filtered = allUsers.filter(
      user =>
        user.first_name.toLowerCase().startsWith(searchValue) ||
        (user.first_name.toLowerCase().includes(searchValue) &&
          user.last_name.toLowerCase().includes(searchValue)),
    )
    setFilteredUsers(filtered)
  }, [allUsers])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const filterUserByName = useCallback(() => {
    let filtered = allUsers
      .slice()
      .sort((a, b) => a.first_name.localeCompare(b.first_name))
    setFilteredUsers([...filtered])
  }, [allUsers])

  const filterUserByNameDesc = useCallback(() => {
    const filtered = allUsers
      .slice()
      .sort((a, b) => b.first_name.localeCompare(a.first_name))
    setFilteredUsers([...filtered])
  }, [allUsers])
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='flex flex-col h-screen  gap-6'>
      <div className='flex w-[100%] flex-col lg:flex-row items-center gap-5 lg:gap-0  justify-center lg:justify-between'>
        <div></div>
        <SearchBar
          inputData={inputData}
          ref={inputRef}
          handleChange={handleChange}
          handleSearchClick={handleSearchClick}
        />
        <div className='flex justify-center items-center gap-12'>
          <Filter
            filterByName={filterUserByName}
            filterByNameDesc={filterUserByNameDesc}
          />
          <button
            className='text-white text-[16px] bg-red-500 hover:bg-red-700 py-3 px-6 rounded-2xl'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {status === 'loading' && (
        <div className='flex flex-wrap gap-5 items-center justify-center h-screen'>
          {memoizedUsers.map(item => (
            <LoadingCard key={item.id} />
          ))}{' '}
        </div>
      )}

      <div className='flex flex-wrap justify-center items-center gap-5'>
        {memoizedUsers.length === 0 ? (
          <div className='flex justify-center items-center h-[70vh] text-black'>
            No User Found ...
          </div>
        ) : (
          memoizedUsers.map(item => (
            <div key={item.id}>
              <UserCard data={item} userId={item.id} />
            </div>
          ))
        )}
      </div>
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
