import { X } from "react-feather";

const Modal = (props) => {
  const {
    isOpen,
    size,
    toggle,
    children,
    className,
    style
  } = props;

  if (!isOpen) return <></>;

  return (
    <div className="fixed top-0 left-0 right-0 h-screen w-screen z-50 flex items-center justify-center"
         style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
      <div className={`bg-white rounded p-6 relative -top-12 px-4 pt-6 ${className}`} style={{width: size === "lg" ? 700 : 500, maxWidth: "90%", ...style}}>
        {toggle ?
          <X className="absolute top-5 right-5 cursor-pointer" size={32} color="#333" onClick={toggle} />
        : <></>}
        {children}
      </div>
    </div>
  )
}

export default Modal;