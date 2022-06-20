import PropTypes from 'prop-types'

const Checkbox = ({ label, sublabel, value, onChange, className, style}) => {

  return (
    <div className={`checkbox_container ${className}`}
         style={{minWidth: 200, ...style}}>
      <label className="flex items-center">
        <span className="checkbox_label">{label}</span>
        <input type="checkbox" checked={value} onChange={e => onChange(!value)} />
        <span className="checkbox_checkmark"></span>
      </label>
      <p className="text-sm">{sublabel}</p>
    </div>
  )
}

Checkbox.defaultProps = {
  label: 'Label',
  sublabel: 'Sublabel',
  value: false,
  onChange: undefined,
  style: {},
  className: ""
}

Checkbox.propTypes = {
  label: PropTypes.string,
  sublabel: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: {},
}

export default Checkbox;