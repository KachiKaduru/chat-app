export interface SingleMessageType {
  id: string;
  created_at: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  sent_at: string;
}

export type Messages = SingleMessageType[];
