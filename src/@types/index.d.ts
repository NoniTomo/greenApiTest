declare module '*.svg?react' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

interface Message {
  idMessage: string
  chatId: string
  sender: string
  timestamp: number
  message: string
}

interface Chat {
  chatId: string
  phone: string
}

interface UserData {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
  phone: string
}
