import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, timeSplits }) {
  const handleClose = () => setOpen(false);
  const handleDownload = () => {
    const element = document.createElement("a");
    const data =
      `Time         Active\n` +
      timeSplits?.map(({ time, type }) => `${time} ${type} \n`);
    const file = new Blob([data.replace(/,/g, "")], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "timeStamps.txt";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div
            style={{ marginRight: "90px", fontSize: "18px", fontWeight: "600" }}
          >
            TIME{" "}
          </div>
          <div style={{ fontSize: "18px", fontWeight: "600" }}>ACTIVE</div>
        </div>
        {timeSplits?.map(({ time, type }) => (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "40px" }}>{time}</div>
            <div>{type}</div>
          </div>
        ))}

        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            textTransform: "uppercase",
          }}
          onClick={handleDownload}
        >
          Download
        </button>
      </Box>
    </Modal>
  );
}
