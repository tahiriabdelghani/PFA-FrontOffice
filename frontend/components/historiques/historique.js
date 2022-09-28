import React from 'react'
import QuestionNumber from '../questions/QuestionNumber'

export default function Historique() {
  return (
    <div className="mt-6 w-full sm:w-4/6 md:w-5/6 xl:w-4/6">
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full cursor-pointer text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="space-x-4 bg-gray-50 p-40 px-6 text-sm  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 "></th>
              <th scope="col" className="px-6 py-3">
                Question
              </th>
              <th scope="col" className="px-6 py-3">
                Response
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap py-4  font-medium text-gray-900 dark:text-white"
              >
                <QuestionNumber color="#123210" number={1} />
              </th>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4  font-medium text-gray-900 dark:text-white"
              >
                This is a question hehe?
              </th>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4  font-medium text-gray-900 dark:text-white"
              >
                This is a response
              </th>
            </tr>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap py-4  font-medium text-gray-900 dark:text-white"
              >
                <QuestionNumber color="#123210" number={2} />
              </th>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4  font-medium text-gray-900 dark:text-white"
              >
                This is a question hehe?
              </th>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4  font-medium text-gray-900 dark:text-white"
              >
                This is a response
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
