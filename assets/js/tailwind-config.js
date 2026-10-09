tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "secondary-fixed-dim": "#ffb4aa",
                background: "#131313",
                "on-background": "#e5e2e1",
                "on-primary-fixed-variant": "#584400",
                "on-secondary": "#5f1410",
                "on-secondary-container": "#ff9f93",
                "on-primary": "#3d2e00",
                "primary-fixed-dim": "#f0c12c",
                primary: "#ffe3a1",
                "inverse-on-surface": "#313030",
                "surface-container-lowest": "#0e0e0e",
                "surface-bright": "#393939",
                "on-error": "#690005",
                "on-tertiary-fixed-variant": "#6e3900",
                surface: "#131313",
                "on-tertiary-fixed": "#2f1500",
                "surface-tint": "#f0c12c",
                "tertiary-fixed-dim": "#ffb77d",
                "tertiary-container": "#ffbc87",
                "primary-container": "#f4c430",
                secondary: "#ffb4aa",
                "surface-container-highest": "#353535",
                "tertiary-fixed": "#ffdcc3",
                "on-error-container": "#ffdad6",
                "on-surface": "#e5e2e1",
                "surface-container-low": "#1c1b1b",
                "inverse-surface": "#e5e2e1",
                "secondary-container": "#812d26",
                outline: "#9a907a",
                "on-tertiary": "#4d2600",
                "on-secondary-fixed": "#410001",
                "surface-container-high": "#2a2a2a",
                "inverse-primary": "#755b00",
                "error-container": "#93000a",
                "surface-variant": "#353535",
                "surface-dim": "#131313",
                "on-secondary-fixed-variant": "#7e2b23",
                "on-primary-container": "#695200",
                "on-surface-variant": "#d1c5ad",
                "surface-container": "#20201f",
                "secondary-fixed": "#ffdad5",
                error: "#ffb4ab",
                "on-tertiary-container": "#824500",
                "primary-fixed": "#ffdf90",
                "outline-variant": "#4e4634",
                tertiary: "#ffe0cb",
                "on-primary-fixed": "#241a00"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
            spacing: {
                base: "8px",
                "container-padding-desktop": "64px",
                "container-padding-mobile": "20px",
                "section-gap": "80px",
                gutter: "24px"
            },
            fontFamily: {
                "headline-lg": ["EB Garamond"],
                "body-lg": ["Hanken Grotesk"],
                "headline-lg-mobile": ["EB Garamond"],
                "display-lg": ["EB Garamond"],
                "headline-md": ["EB Garamond"],
                "label-md": ["Hanken Grotesk"],
                "body-md": ["Hanken Grotesk"]
            },
            fontSize: {
                "headline-lg": ["40px", { lineHeight: "1.2", fontWeight: "600" }],
                "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
                "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
                "display-lg": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
                "headline-md": ["28px", { lineHeight: "1.3", fontWeight: "500" }],
                "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600" }],
                "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }]
            }
        }
    }
};
