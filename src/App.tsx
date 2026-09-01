import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    forcedTheme="dark"
    disableTransitionOnChange
  >
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/case-studies" element={<Index />} />
        <Route path="/skills" element={<Index />} />
        <Route path="/framework" element={<Index />} />
        <Route path="/contact" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
