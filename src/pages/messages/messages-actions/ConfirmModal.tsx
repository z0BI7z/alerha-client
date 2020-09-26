import React from "react";
import { Modal } from "antd";

interface IConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

export function ConfirmModal({
  onConfirm,
  onCancel,
  visible,
}: IConfirmModalProps) {
  return (
    <Modal visible={visible} onOk={onConfirm} onCancel={onCancel}>
      Are you sure you want to delete these messages?
    </Modal>
  );
}

export default ConfirmModal;
