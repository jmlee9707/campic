import React from "react";
import "./TalkContent.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function TalkContent() {
  return (
    <div className="TalkContent">
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={editor => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}

export default TalkContent;
