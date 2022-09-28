import React from 'react'

export default function Historiques() {
  return (
    <div className="flex min-h-screen flex-col items-center ">
      <div className="mt-6 w-full sm:w-4/6 md:w-5/6 xl:w-4/6">
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full cursor-pointer text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="space-x-4 bg-gray-50 p-40 px-6 text-lg  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-10 py-3">
                  Date
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">View Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 px-10 font-medium text-gray-900 dark:text-white"
                >
                  10-05-2019
                </th>

                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
