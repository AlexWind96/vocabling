import { IconColorPicker, IconX } from '@tabler/icons-react'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import { Link, RichTextEditor } from '@mantine/tiptap'

export function NoteEditor({ value, onChange, isSubmitted, isNotes, onClose }) {
  const editor = useEditor(
    {
      extensions: [StarterKit, Link, TextStyle, Color],
      content: value,
      onUpdate: (options) => {
        onChange(options.editor.getHTML())
      },
    },
    []
  )

  useEffect(() => {
    if (isSubmitted) {
      editor?.commands.clearContent()
    }
  }, [isSubmitted])

  useEffect(() => {
    if (isNotes) {
      editor?.commands.focus()
    }
  }, [isNotes])

  return (
    <RichTextEditor
      pos={isNotes ? 'static' : 'absolute'}
      opacity={isNotes ? 1 : 0}
      mt={isNotes ? 0 : 20}
      editor={editor}
    >
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Control interactive={false}>
            <IconColorPicker size={16} stroke={1.5} />
          </RichTextEditor.Control>
          <RichTextEditor.Color color="#F03E3E" />
          <RichTextEditor.Color color="#7048E8" />
          <RichTextEditor.Color color="#2042ad" />
          <RichTextEditor.Color color="#37B24D" />
          <RichTextEditor.Color color="#F59F00" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.UnsetColor />
        <RichTextEditor.ControlsGroup className={'flex-1 flex justify-end'}>
          <RichTextEditor.Control onClick={onClose}>
            <IconX size={16} />
          </RichTextEditor.Control>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
