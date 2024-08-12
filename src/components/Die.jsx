const Die = (props) => {
  const dieStyle = props.isLocked ? 'from-blue-900 to-blue-500 text-white shadow-none scale-90' : 'from-blue-200 to-blue-100 text-black shadow-xl scale-100'

  return (
    <button
      className={`w-12 h-12 md:w-16 md:h-16 md:text-xl bg-gradient-to-b ${dieStyle} rounded-lg transition-all`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Die
