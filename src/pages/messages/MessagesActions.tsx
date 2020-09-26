import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ConfirmModal } from "./messages-actions/ConfirmModal";
import { MessagesActionsButton } from "./messages-actions/styles";

function MessagesActions() {
  const [visible, setVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<Function | null>(null);

  const onConfirm = () => {
    if (pendingAction) {
      pendingAction();
    }
    setPendingAction(null);
    setVisible(false);
  };

  const onCancel = () => {
    setPendingAction(null);
    setVisible(false);
  };

  const deleteMessages = (duration: string) => {
    setPendingAction(() => console.log(duration));
    setVisible(true);
  };

  const menu = (
    <Menu style={{ display: "inline-block" }}>
      <Menu.Item>Reload</Menu.Item>
      <Menu.SubMenu title="Delete">
        <Menu.Item onClick={() => deleteMessages("1h")}>
          {"Before last hour"}
        </Menu.Item>
        <Menu.Item onClick={() => deleteMessages("1d")}>
          {"Before last day"}
        </Menu.Item>
        <Menu.Item onClick={() => deleteMessages("1M")}>
          {"Before last 30 days"}
        </Menu.Item>
        <Menu.Item onClick={() => deleteMessages("all")}>{"All"}</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <React.Fragment>
      <div>
        <Dropdown overlay={menu}>
          <MessagesActionsButton>
            Actions <DownOutlined />
          </MessagesActionsButton>
        </Dropdown>
      </div>
      <ConfirmModal
        visible={visible}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </React.Fragment>
  );
}

export default MessagesActions;
