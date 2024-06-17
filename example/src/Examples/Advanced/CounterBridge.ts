import { BridgeExtension } from '@vimeiro-co/tentap-editor';
import CharacterCount from '@tiptap/extension-character-count';

type CounterEditorState = {
  wordCount: number;
  characterCount: number;
};

type CounterEditorInstance = {};

declare module '@vimeiro-co/tentap-editor' {
  interface BridgeState extends CounterEditorState {}
  interface EditorBridge extends CounterEditorInstance {}
}

export const CounterBridge = new BridgeExtension<
  CounterEditorState,
  CounterEditorInstance,
  unknown
>({
  tiptapExtension: CharacterCount.configure({
    limit: 240,
  }),
  extendEditorState: (editor) => {
    return {
      wordCount: editor.storage.characterCount.characters(),
      characterCount: editor.storage.characterCount.words(),
    };
  },
});
