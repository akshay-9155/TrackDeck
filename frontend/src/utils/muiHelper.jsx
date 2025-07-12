export const buttonNeumorphicSx = {
  background: "#e0e5ec",
  color: "#333",
  borderRadius: "12px",
  boxShadow: `
          8px 8px 15px rgba(0, 0, 0, 0.1),
          -8px -8px 15px rgba(255, 255, 255, 0.7)
        `,
  "&:hover": {
    background: "#d2d8e0",
    boxShadow: `
            inset 4px 4px 10px rgba(0, 0, 0, 0.15),
            inset -4px -4px 10px rgba(255, 255, 255, 0.8)
          `,
  },
};