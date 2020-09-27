import React, { useState } from "react";
import { Modal } from "antd";

interface IConfirmModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
  message: string;
  children: (setVisible: () => void) => React.ReactNode;
}

export function ConfirmModal({
  onConfirm,
  onCancel,
  message,
  children,
}: IConfirmModalProps) {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      {children(() => setVisible(true))}
      <Modal visible={visible} onOk={onConfirm} onCancel={onCancel}>
        {message}
      </Modal>
    </React.Fragment>
  );
}

export default ConfirmModal;
