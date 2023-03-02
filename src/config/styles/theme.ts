import { extendTheme } from '@chakra-ui/react'

const DEFAULT_STYLES = {
    styles: {
        global: {
            body: {
                bg: '#0F1E33',
                color: 'white',
              }
        }
    }
}

const DEFAULT_FONTS = {
    fonts: {
        heading: `'Nunito', sans-serif`,
        body: `'Nunito', sans-serif`,
    },
}

const theme = extendTheme({
    ...DEFAULT_STYLES,
   ...DEFAULT_FONTS
})

export {
    theme,
    DEFAULT_FONTS,
    DEFAULT_STYLES
};