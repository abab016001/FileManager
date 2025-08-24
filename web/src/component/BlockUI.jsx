function BlockUI({ children, handleCancle }) {
  const cancle = (e) => {
    const bg = document.querySelector("#block_ui .bg");
    if (e.target == bg) {
      handleCancle();
    }
  }
  return (
    <>
      <div className="block_ui" id="block_ui">
        <div className="bg" onClick={cancle}>
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlockUI;