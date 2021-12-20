import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import React, { useCallback, useRef, useState } from "react";
import { draftToMarkdown } from "markdown-draft-js";
import classNames from "classnames";
import { BlockStyleControls } from "./BlockStyleControls";
import { InlineStyleControls } from "./InlineStyleControls";
import "draft-js/dist/Draft.css";

export function RichEditor({ onChange }: RichEditorProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = useCallback((state: EditorState) => {
    setEditorState(state);

    // convert content to markdown and propogate
    const raw = convertToRaw(state.getCurrentContent());
    const md = draftToMarkdown(raw);
    onChange(md);
  }, []);
  const editorRef = useRef<Editor>();

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let hidePlaceholder = false;
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      hidePlaceholder = true;
    }
  }

  return (
    <div className="flex flex-col px-4 py-3 mb-4 bg-white shadow-sm border border-gray-200 rounded divide-y-2">
      <div className="flex flex-col mb-3">
        <BlockStyleControls
          editorState={editorState}
          onToggle={(type) => {
            setEditorState(RichUtils.toggleBlockType(editorState, type));
          }}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={(style) => {
            setEditorState(RichUtils.toggleInlineStyle(editorState, style));
          }}
        />
      </div>

      <div
        className={classNames("pt-3", { "hide-placeholder": hidePlaceholder })}
      >
        <Editor
          editorState={editorState}
          placeholder="Type your biography"
          ref={editorRef}
          onChange={onEditorStateChange}
        />
      </div>
    </div>
  );
}

export interface RichEditorProps {
  onChange: (content: string) => void;
}
