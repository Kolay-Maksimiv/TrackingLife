export class TextEditorOptions {
  public options: Object = {
      plugins: ['media', 'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'],
      toolbar: 'undo redo | media | formatselect | bold italic underline backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help',

      height: 530,
      menubar: false,
      
      // min_height: 200,
      // max_height: 630,

      // resize: true,
      // image_title: true,
      // paste_data_images: true,
      // paste_filter_drop: true,
      // menubar: false,

      // statusbar: true,
      // branding: false,

      // file_picker_types: 'image',
      // toolbar_drawer: 'floating',
      // body_class: 'tinymce-body',
      // content_style: 'img { max-width: 100%; max-height: auto; }'
  };
}
