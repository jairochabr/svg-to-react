# SVG to React Component

Turn your SVGs into React components with a simple file rename! 🖼️ → 🧩

![demo](https://github.com/user-attachments/assets/b430049d-84f2-4fe9-abbf-4e16b0b158f3)

## Features ✨

- 🔄 Conversion from SVG to React (JSX/TSX)
- 🚀 Support for JSX and TSX with auto-generated TypeScript definitions
- 💅 Handles inline styles and CSS classes
- 📝 Generates smart component names based on the file name
- 🔧 Zero configuration required!

## How to Use 🛠️

1. Locate the SVG file in your project
2. Rename the file from `.svg` to `.jsx` or `.tsx`
3. Voilà! Your React component is ready to use

## Quick Example 👁️‍🗨️

**Before (`icon.svg`):**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

**After (`Icon.jsx`):**

```jsx
import * as React from "react";

const Icon = (props) => {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <circle cx={50} cy={50} r={40} fill="red" />
    </svg>
  );
};

export default Icon;
```

For TypeScript (`.tsx`), the component will include auto-typing!

## Why use SVG to React Component? 🤔

- ⚡ Convert SVGs to React components with just one rename
- 🕒 Save hours of manual labor
- 🧩 Create reusable Svg components easily
- 🎛️ Maintain full control over your SVGs in React
- 🛠️ Seamless integration with VSCode

## Solving problems 🔍

Encountered an issue? Try these quick tips:

1. Ensure the SVG file is valid
2. Restart VSCode and try again
3. Verify you're in a React JS project
4. Confirm you're using the correct file extension (JSX or TSX)

Still having trouble? Open an issue in my [GitHub repository](https://github.com/jairochabr/svg-to-react/issues). I'm here to help!

---

Developed with ❤️ and lots of ☕ by [@jairochabr](https://github.com/jairochabr)

[⭐ Rate this extension](https://marketplace.visualstudio.com/items?itemName=jairochabr.svg-to-react&ssr=false#review-details)

[🐛 Report a bug](https://github.com/jairochabr/svg-to-react/issues)

[💡 Suggest Improvements](https://github.com/jairochabr/svg-to-react/issues)











