export class MessageAppSettings {
  public static DOMAIN: string = "http://localhost:3003";

  public static REQUEST_EVENTS = {
    // AuthenticationManager
    LOGIN: "req_authentication_login",
    LOGOUT: "req_authentication_logout",

    // ChannelManager
    GET_CHANNEL_LIST: "req_channel_get_channel_list",
    CREATE_CHANNEL: "req_channel_create_channel",
    LEAVE_CHANNEL: "req_channel_leave_channel",
    SEND_CONVERSATION: "req_channel_send_conversation",
    GET_CONVERSATION: "req_channel_get_conversation",

    // InvitationManager
    GET_INVITATION_LIST: "req_invitation_get_invitation_list",
    SEND_INVITATION: "req_invitation_send_invitation",
    DEAL_WITH_INVITATION: "req_invitation_deal_with_invitation"
  };

  public static RESPONSE_EVENTS = {
    // Channel
    CHANNEL_LIST: "channel_list",
    CHANNEL_CREATED: "channel_created",
    CHANNEL_REMOVED: "channel_removed",

    // Channel
    INVITATION_LIST_FROM_CHANNEL: "invitation_list_from_channel",
    INVITATION_FROM_CHANNEL_TO_ME: `invitation_from_channel_to_me`,
    CONVERSATION_LIST: `conversation_list`,
    CONVERSATION_FROM_CHANNEL: "conversation_from_channel",

    // Exception
    EXCEPTION_ALERT: "exception_alert"
  };
}
