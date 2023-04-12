import { useState } from 'react';
import { Action, ActionPanel, Form, showToast, Toast } from '@raycast/api';

export default function Command() {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [expiredAt, setExpiredAt] = useState('');

  const handleSubmit = () => {
    try {
      const [header, payload, signature] = jwt.split('.');
      const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
      const parsedPayload = JSON.parse(decodedPayload);
      const issuedAt = new Date(parsedPayload.iat).toLocaleString('ja-JP');
      const expiredAt = new Date(parsedPayload.exp).toLocaleString('ja-JP');
      const decodedString = JSON.stringify(parsedPayload, null, 2);
      setIssuedAt(issuedAt);
      setExpiredAt(expiredAt);
      setDecoded(decodedString);
    } catch (error: any) {
      showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: error.message,
      });
    }
  };

  return (
      <Form
        actions={
        <ActionPanel>
          <Action.SubmitForm title="Decode" onSubmit={handleSubmit} />
        </ActionPanel>
      }>
      <Form.TextField id="jwt" title="Payload" value={jwt} onChange={setJwt} />
      <Form.TextArea id="decoded" title="decoded" value={decoded} />
      <Form.TextField id="issued_at" title="issued_at" value={issuedAt} />
      <Form.TextField id="expired_at" title="expired_at" value={expiredAt} />
    </Form>
  );
}
