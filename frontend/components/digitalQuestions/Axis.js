function Axis({ axisName, counter, axisIndex }) {
  return (
    <h1
      className={`rounded-md border-2 border-gray-400 bg-blue-100 p-1 m-2 hover:bg-blue-500 ${
        axisIndex === counter ? 'bg-blue-500' : 'bg-blue-100'
      }`}
    >
      {axisName}
    </h1>
  )
}
export default Axis
