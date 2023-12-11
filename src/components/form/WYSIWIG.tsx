import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

type Props = {
   initialValue?: string;
   id: string;
   onDataChange: (data: string) => void;
};

export function WYSIWIG(props: Props) {
   const [editorContent, setEditorContent] = useState<string>(
      props.initialValue || "",
   );

   const handleEditorChange = (content: string) => {
      setEditorContent(content);
      props.onDataChange(content);
   };

   return (
      <Editor
         apiKey="hec75pcwdpyijvrtsihgut0yzwaong2hbut26xh88n2gckt4"
         id={props.id}
         initialValue={props.initialValue}
         value={editorContent}
         onEditorChange={handleEditorChange}
         init={{
            menubar: false,
            statusbar: true,
            branding: false,
            language: "pt_BR",
            skin: "small",
            toolbar:
               "blocks fontfamily fontsize bold italic underline strikethrough removeformat" +
               " link image table mergetags align lineheight numlist bullist indent outdent",
            plugins:
               "anchor autolink charmap codesample image link " +
               "lists media searchreplace table visualblocks wordcount wordcount",
            mobile: {
               menubar: false,
               statusbar: true,
               branding: false,
               language: "pt_BR",
               skin: "small",
               toolbar:
                  "blocks fontfamily fontsize bold italic underline strikethrough removeformat" +
                  " link image table mergetags align lineheight numlist bullist indent outdent",
               plugins:
                  "anchor autolink charmap codesample image link " +
                  "lists media searchreplace table visualblocks wordcount wordcount",
            },
         }}
      />
   );
}
