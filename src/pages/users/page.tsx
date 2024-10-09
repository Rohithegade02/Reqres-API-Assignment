import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User, UserData } from '../../types'
import UserCard from '../../components/UserCard'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'
import { fetchData } from '../../slice/dataSlice'
import { RootState } from '../../store'
import Filter from '../../components/Filter'

function Users() {
  const dispatch = useDispatch()

  const allUsers = useSelector((state: RootState) => state.data.data)
  const status = useSelector((state: RootState) => state.data.status)
  const totalPages = useSelector((state: RootState) => state.data.totalPages)

  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [page, setPage] = useState<UserData['page']>(1)
  const [showFilterOption, setShowFilterOption] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputData, setInputData] = useState<string>('')

  const debounceTimeoutRef = useRef<number | null>(null)

  const getData = useCallback(
    async (page: number) => {
      dispatch(fetchData(page))
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
      }, 500)
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
    setFilteredUsers([...filtered]) // Ensure new array reference
  }, [allUsers])

  const filterUserByNameDesc = useCallback(() => {
    const filtered = allUsers
      .slice()
      .sort((a, b) => b.first_name.localeCompare(a.first_name))
    setFilteredUsers([...filtered]) // Ensure new array reference
  }, [allUsers])

  return (
    <div>
      <div className='flex flex-col h-screen flex-wrap gap-10'>
        <div className='flex w-full justify-between'>
          <div></div>
          <SearchBar
            inputData={inputData}
            ref={inputRef}
            handleChange={handleChange}
            handleSearchClick={handleSearchClick}
          />
          <div>
            <Filter
              showFilterOption={showFilterOption}
              setShowFilterOption={setShowFilterOption}
              filterByName={filterUserByName}
              filterByNameDesc={filterUserByNameDesc} // Pass the descending sort function
            />
          </div>
        </div>

        {status === 'loading' && <div>Loading...</div>}

        <div className='flex flex-wrap justify-center items-center gap-10'>
          {memoizedUsers.map(item => (
            <div key={item.id} className='w-[25%]'>
              <UserCard data={item} userId={item.id} />
            </div>
          ))}
        </div>
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
