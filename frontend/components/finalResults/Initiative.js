import GpsFixedIcon from '@mui/icons-material/GpsFixed'

function Initiative(props) {
  return (
    <div className="flex items-center justify-between">
      <GpsFixedIcon />
      <h2 className="ml-2 font-mono text-gray-500">{props.title}</h2>
    </div>
  )
}
export default Initiative
