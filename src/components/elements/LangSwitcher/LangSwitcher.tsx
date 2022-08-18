import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Menu } from '@mantine/core'

export const LangSwitcher = ({}) => {
  const { i18n } = useTranslation()

  const changeLanguageHandler = (lang) => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        console.log('hello')
      })
      .catch((err) => {
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

        <Menu.Item onClick={() => changeLanguageHandler('de')}>DE</Menu.Item>
        <Menu.Item onClick={() => changeLanguageHandler('en')}>EN</Menu.Item>
        <Menu.Item onClick={() => changeLanguageHandler('ru')}>RU</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
