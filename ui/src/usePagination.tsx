import { useState } from 'react'
import { TablePaginationConfig } from 'antd'

export interface PaginationSettings extends TablePaginationConfig {
  updateTotalCount: (newTotalCount: number) => void
  take: number
  skip: number
  resetPage: () => void
}

export const usePagination = (
  itemNames: string = 'reports',
  itemsPerPage: number = 10
): PaginationSettings => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(itemsPerPage)
  const [total, setTotal] = useState(0)

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    if (pageSize) {
      setPageSize(pageSize)
    }
  }

  const updateTotalCount = (newTotalCount: number) => {
    setTotal(newTotalCount)
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  return {
    current: currentPage,
    pageSize: pageSize,
    total,
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
    showTotal: (total: number, range: any[]) => {
      return (
        <div className="text-sm mt-2">
          Showing {range[0]} to {range[1]} of {total} {itemNames}
        </div>
      )
    },
    updateTotalCount,
    resetPage,
    onChange: handlePageChange,
  }
}