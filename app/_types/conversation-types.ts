export type ConversationType = {
  id?: string;
  conversation_id: string;
  created_at: string;
  is_group: boolean;
  created_by: string;
  group_name?: string;
  display_name?: string;
  last_message: string;
  last_sent_at: string;
};
