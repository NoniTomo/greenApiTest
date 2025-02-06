import { NavLink, Outlet } from 'react-router-dom'
import clsx from 'clsx'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  NewChatForm
} from '@/shared/components'
import { useMain } from './hooks/useMain'

import NewChatIcon from '@/assets/icons/newChat.svg?react'
import SidebarIcon from '@/assets/icons/sidebar.svg?react'

export const Main = () => {
  const { state, functions } = useMain()

  return (
    <div className="grid grid-cols-[auto,1fr] w-screen">
      <>
        {state.open && (
          <div className="flex flex-col justify-center min-w-[250px] sm:max-w-[400px] h-screen border-r-[1px] border-secondary w-screen sm:w-min">
            <div className="flex justify-between text-2xl p-5 ">
              <p>Чаты</p>
              <div className="flex gap-3">
                <Dialog open={state.openNumberModal} onOpenChange={functions.setOpenNumberModal}>
                  <DialogTrigger asChild>
                    <Button className="p-0 w-10 h-full bg-transparent hover:bg-transparent focus:border-none hover:border-none">
                      <NewChatIcon className="scale-[2]" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Создать новый чат</DialogTitle>
                      <DialogDescription>Добавить новый чат</DialogDescription>
                    </DialogHeader>
                    <NewChatForm
                      onSubmitAction={() => {
                        functions.setOpenNumberModal(false)
                      }}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  className="p-0 w-10 h-full bg-transparent hover:bg-transparent focus:border-none hover:border-none"
                  onClick={() => functions.setOpen(!state.open)}
                >
                  <SidebarIcon className="scale-[2]" />
                </Button>
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              {state.chatIds.map((chatId) => (
                <NavLink
                  key={chatId}
                  className={({ isActive }) =>
                    clsx(
                      'px-5 w-full flex text-foreground hover:text-slate-400',
                      isActive && 'bg-green-200 bg-opacity-20'
                    )
                  }
                  to={`chat-id/${chatId}`}
                >
                  <div className="h-max static p-2 rounded-xl max-w-[80%] sm:max-w-sm text-balance">
                    <p>{state.chatEntities[chatId].phone}</p>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="p-5">
              <Button
                className="p-5 w-full rounded-xl bg-green-700 hover:bg-green-800  "
                onClick={() => functions.onLeave()}
                type="submit"
              >
                Выйти
              </Button>
            </div>
          </div>
        )}
        {!state.open && (
          <div className="py-5 px-2 h-screen border-r-[1px] border-secondary">
            <Button
              className="p-0 w-10 bg-transparent hover:bg-transparent focus:border-none hover:border-none"
              onClick={() => functions.setOpen(!state.open)}
            >
              <SidebarIcon className="scale-[2]" />
            </Button>
          </div>
        )}
        <div className={clsx(state.open && 'hidden sm:block', !state.open && 'block')}>
          <Outlet />
        </div>
      </>
    </div>
  )
}
