import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "./components/theme-provider"

const root = document.getElementById("root")!
const loader = document.getElementById("initial-loader")

createRoot(root).render(
  <HashRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HashRouter>
)

// Remove loader after React mounts
if (loader) {
  requestAnimationFrame(() => {
    loader.classList.add("loaded")
    setTimeout(() => { loader.style.display = "none" }, 500)
  })
}
