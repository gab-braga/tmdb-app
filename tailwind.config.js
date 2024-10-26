/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "purple-dark": {
          50: "#18111B",
          100: "#1E1523",
          200: "#3D224E",
          300: "#3D224E",
          400: "#48295C",
          500: "#54346B",
          600: "#664282",
          700: "#8457AA",
          800: "#8E4EC6",
          900: "#9A5CD0",
          950: "#D19DFF",
          975: "#ECD9FA",
        },
        "purple-dark-alpha": {
          50: "#1F1125",
          100: "#24152C",
          200: "#361C43",
          300: "#422255",
          400: "#4D2963",
          500: "#583471",
          600: "#6A4287",
          700: "#8757AE",
          800: "#904EC8",
          900: "#9C5DD2",
          950: "#D19DFF",
          975: "#EDD9FA",
        },
        "purple": {
          50: "#FEFCFE",
          100: "#FBF7FE",
          200: "#F7EDFE",
          300: "#F2E2FC",
          400: "#EAD5F9",
          500: "#E0C4F4",
          600: "#D1AFEC",
          700: "#BE93E4",
          800: "#8E4EC6",
          900: "#8347B9",
          950: "#8145B5",
          975: "#402060",
        },
        "purple-alpha": {
          50: "#FDF9FD",
          100: "#FAF4FD",
          200: "#F6EAFD",
          300: "#F1DFFB",
          400: "#E9D3F8",
          500: "#DFC2F3",
          600: "#D0ADEB",
          700: "#BE91E4",
          800: "#8E4DC6",
          900: "#8346B9",
          950: "#8144B5",
          975: "#402060",
        },
        "mauve-dark": {
          50: "#121113",
          100: "#1A191B",
          200: "#232225",
          300: "#2B292D",
          400: "#323035",
          500: "#3C393F",
          600: "#49474E",
          700: "#625F69",
          800: "#6F6D78",
          900: "#7C7A85",
          950: "#B5B2BC",
          975: "#EEEEF0",
        },
        "mauve-dark-alpha": {
          50: "#121113",
          100: "#1A191B",
          200: "#232225",
          300: "#2B292D",
          400: "#323035",
          500: "#3C393F",
          600: "#49474E",
          700: "#625F69",
          800: "#6F6D78",
          900: "#7C7A85",
          950: "#B5B2BC",
          975: "#EEEEF0",
        },
        "mauve": {
          50: "#FDFCFDu",
          100: "#FAF9FB",
          200: "#F2EFF3",
          300: "#EAE7EC",
          400: "#E3DFE6",
          500: "#DBD8E0",
          600: "#D0CDD7",
          700: "#BCBAC7",
          800: "#8E8C99",
          900: "#84828E",
          950: "#65636D",
          975: "#211F26",
        },
        "mauve-alpha": {
          50: "#FBF9FB",
          100: "#F8F6F9",
          200: "#F0ECF1",
          300: "#E8E4EA",
          400: "#E1DCE4",
          500: "#D9D5DE",
          600: "#CFCBD5",
          700: "#BBB8C6",
          800: "#8D8A98",
          900: "#83818D",
          950: "#65626D",
          975: "#211F26"
        },
      }
    },
  },
  plugins: [],
}
