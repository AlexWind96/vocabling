import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Menu } from '@mantine/core'

type LangSwitcherProps = {
  languages: string[]
}

export const LangSwitcher = ({ languages }: LangSwitcherProps) => {
  const { i18n } = useTranslation()

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang).catch((err) => {
      console.log(err)
    })
  }
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant={'default'}>{i18n.language.toUpperCase()}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Languages</Menu.Label>
        {languages.map((lang, index) => {
          return (
            <Menu.Item key={lang + index} onClick={() => changeLanguageHandler(lang)}>
              {lang.toUpperCase()}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
