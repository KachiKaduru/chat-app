export interface SidebarItem {
  image: string;
  id?: string;
  conversation_id?: string;
  name?: string;
  display_name?: string;
  is_group?: boolean;
  last_message?: string;
  last_sent_at?: string;
}
