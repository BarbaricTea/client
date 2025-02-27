import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const StandardMessageForm = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("C", `${Math.floor(Math.random() * 1000)}+00:00`);

    const at = attachment ? [{blob: attachment, file: attachment.name}] : [];
    const form = {
        attachment: at,
        created: date,
        sender_username: props.username,
        text: message,
        activeChatId: activeChat.id,
    }

    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            className="message-form-preview-image"
            src={preview}
            alt="message-form-preview"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message"
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            accepedFiles=".jpg,.jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(accepedFiles) => {
              setAttachment(accepedFiles[0]);
              setPreview(URL.createObjectURL(accepedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StandardMessageForm;
