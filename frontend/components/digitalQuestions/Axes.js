import Axis from './Axis.js'
function Axes({ axisCounter, axes }) {
  return (
    <div className="m-2 flex flex-wrap justify-between p-2">
      {axes.map((axis, index) => (
        <Axis
          key={axis._id}
          axisName={axis.name}
          counter={axisCounter}
          axisIndex={index}
        />
      ))}
    </div>
  )
}
export default Axes
