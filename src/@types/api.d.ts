interface UserData {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
  phone: string
}
interface ChatData {
  chatId: string
  message: string
  quotedMessageId: string
}

type StateInstance = 'yellowCard' | 'starting' | 'sleepMode' | 'blocked' | 'authorized' | 'notAuthorized'
interface GetStateInstanceResponse {
  stateInstance: StateInstance
}

interface GetReceiveNotificationResponse {
  receiptId: 1234567
  body: {
    typeWebhook: 'incomingMessageReceived'
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: string
    }
    timestamp: 1588091580
    idMessage: string
    senderData: {
      chatId: string
      sender: string
      senderName: string
      senderContactName: string
    }
    messageData: {
      typeMessage: 'textMessage'
      textMessageData: {
        textMessage: string
      }
    }
  }
}

interface SendMessageRequest {
  chatId: string
  message: string
  quotedMessageId?: string
}

interface SendMessageResponse {
  idMessage: string
}

interface MessageBody {
  instanceData: {
    idInstance: number
    wid: string
    typeInstance: string
  }
  timestamp: 1588091580
  idMessage: string
  senderData: {
    chatId: string
    sender: string
    senderName: string
    senderContactName: string
  }
  messageData: {
    typeMessage: string
    textMessageData: {
      textMessage: string
    }
  }
}

interface GetWaInstanceResponse {
  avatar: string
  phone: string
  stateInstance: StateInstance
  deviceId: string
}
