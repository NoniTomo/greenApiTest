import NewChatIcon from '@/assets/icons/newChat.svg?react'
import SidebarIcon from '@/assets/icons/sidebar.svg?react'

import { NewChatForm } from '@/shared/components'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog'

import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useMain } from './hooks/useMain'
import { Button } from '@/shared/components'

export const Main = () => {
  const { state, functions } = useMain()

  return (
    <div className="grid grid-cols-[auto,1fr] w-screen bg-[#1a2329] text-background">
      <>
        {state.open && (
          <div className="flex flex-col justify-center min-w-[250px] max-w-[400px] h-screen border-r-[1px] border-secondary">
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
                      'px-5 w-full flex text-background hover:text-slate-400',
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
                className="p-5 w-full rounded-xl bg-green-700 hover:bg-green-800  text-background"
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
        <Outlet />
      </>
    </div>
  )
}
