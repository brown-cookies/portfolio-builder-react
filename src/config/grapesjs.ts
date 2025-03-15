// import grapesjsFontsPlugin from '@silexlabs/grapesjs-fonts'
// import grapesjsUiSuggestClassPlugin from '@silexlabs/grapesjs-ui-suggest-classes'
import type { EditorConfig } from 'grapesjs'
import grapesjsBasicBlocksPlugin from 'grapesjs-blocks-basic'
import grapesjsFlexboxBlocksPlugin from 'grapesjs-blocks-flexbox'
import grapesjsCustomCodePlugin from 'grapesjs-custom-code'
import grapesjsNavbarPlugin from 'grapesjs-navbar'
import grapesjsParserPostCSSPlugin from 'grapesjs-parser-postcss'
import grapesjsCKEPlugin from 'grapesjs-plugin-ckeditor'
import grapesjsExportPlugin from 'grapesjs-plugin-export'
import grapesjsFormsPlugin from 'grapesjs-plugin-forms'
import grapesjsPresetPlugin from 'grapesjs-preset-webpage'
import grapesjsBGPlugin from 'grapesjs-style-bg'
import grapesjsFilterPlugin from 'grapesjs-style-filter'
import grapesjsGradientPlugin from 'grapesjs-style-gradient'
import grapesjsTooltipPlugin from 'grapesjs-tooltip'
import grapesjsTUIPlugin from 'grapesjs-tui-image-editor'

const config: EditorConfig = {
  container: '#gjs',

  showOffsets: true,
  noticeOnUnload: false,

  // storageManager to be set in initialization

  plugins: [
    (editor) => grapesjsPresetPlugin(editor, {}),
    (editor) => grapesjsBasicBlocksPlugin(editor, {}),
    (editor) => grapesjsFlexboxBlocksPlugin(editor, {}),
    (editor) => grapesjsNavbarPlugin(editor, {}),
    (editor) => grapesjsFormsPlugin(editor, {}),
    (editor) => grapesjsExportPlugin(editor, {}),
    (editor) => grapesjsCKEPlugin(editor, {}),
    (editor) => grapesjsTUIPlugin(editor, {}),
    (editor) => grapesjsGradientPlugin(editor, {}),
    (editor) => grapesjsFilterPlugin(editor, {}),
    (editor) => grapesjsBGPlugin(editor, {}),
    (editor) => grapesjsCustomCodePlugin(editor, {}),
    (editor) => grapesjsParserPostCSSPlugin(editor, {}),
    (editor) => grapesjsTooltipPlugin(editor, {}),
    // (editor) => grapesjsFontsPlugin(editor, {}),
    // (editor) => grapesjsUiSuggestClassPlugin(editor, {}),
  ],
}

export { config }
