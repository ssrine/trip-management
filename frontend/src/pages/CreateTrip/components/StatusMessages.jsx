import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const StatusMessages = ({ messages }) => {
  return (
    <>
      {messages.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300 animate-fadeIn">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          {messages.error}
        </div>
      )}
      {messages.success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-300 animate-fadeIn">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          {messages.success}
        </div>
      )}
    </>
  );
};

export default StatusMessages;