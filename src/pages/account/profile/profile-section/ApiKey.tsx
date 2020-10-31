import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { selectApiKey, createApiKeyStart } from "../../../../modules/user";
import {
  ApiKeyContainer,
  ApiKeyCopyContainer,
  ApiKeyLabel,
  ApiKeyCopyText,
} from "./api-key/styles";
import Spacer from "../../../../components/Spacer";

function ApiKey() {
  const dispatch = useDispatch();
  const apiKey = useSelector(selectApiKey);

  const createApiKey = useCallback(() => dispatch(createApiKeyStart()), [
    dispatch,
  ]);

  const copyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
    }
  };

  return (
    <ApiKeyContainer>
      <ApiKeyLabel>Your Key:</ApiKeyLabel>
      <ApiKeyCopyContainer>
        <ApiKeyCopyText>{apiKey ? apiKey : "No api key"}</ApiKeyCopyText>
        <Spacer width=".5rem" />
        <Button
          type="dashed"
          shape="circle-outline"
          icon={<CopyOutlined />}
          onClick={copyApiKey}
        />
      </ApiKeyCopyContainer>
      <Spacer height="1rem" />
      <Button onClick={createApiKey}>
        {apiKey ? "Reset key" : "Generate an api key"}
      </Button>
    </ApiKeyContainer>
  );
}

export default ApiKey;
