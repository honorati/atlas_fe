import { Editor } from '@tinymce/tinymce-react';

type Props = {
    label : string
    id: string
}

export function WYSIWIG(props : Props) {
  return (
    <Editor
        apiKey='hec75pcwdpyijvrtsihgut0yzwaong2hbut26xh88n2gckt4'      
        id={props.id}
        initialValue={props.label}
        init={{
            menubar: false,
            statusbar: true,
            branding: false,
            language: 'pt_BR',
            icons: 'small',
            skin: 'small',
            font_family_formats: 'Noto Sans',
            toolbar:'blocks fontsize bold italic underline strikethrough removeformat' +
            ' link image table mergetags align lineheight numlist bullist indent outdent',
            plugins: 'mentions anchor autolink charmap codesample image link inlinecss ' +
            'lists media searchreplace table visualblocks wordcount checklist casechange '+ 
            'export formatpainter pageembed permanentpen footnotes advtemplate advtable ' +
            'advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker ' + 
            'autocorrect a11ychecker typography wordcount',        
            mobile: {
                menubar: false,
                statusbar: true,
                branding: false,
                language: 'pt_BR',
                icons: 'small',
                skin: 'small',
                font_family_formats: 'Noto Sans',
                toolbar:'blocks fontsize bold italic underline strikethrough removeformat' +
                ' link image table mergetags align lineheight numlist bullist indent outdent',
                plugins: ' mentions anchor autolink charmap codesample image link inlinecss ' +
                'lists media searchreplace table visualblocks wordcount checklist casechange '+ 
                'export formatpainter pageembed permanentpen footnotes advtemplate advtable ' +
                'advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker ' + 
                'autocorrect a11ychecker typography wordcount',   
            }
        }}
    />
  );
}