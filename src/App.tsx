import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { DocPage } from "./pages/DocPage";
import { ExamplePage } from "./pages/ExamplePage";
import { DocsOverviewPage } from "./pages/DocsOverviewPage";
import { ExamplesOverviewPage } from "./pages/ExamplesOverviewPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsOverviewPage />} />
          <Route path="/docs/:categorySlug/:itemSlug" element={<DocPage />} />
          <Route path="/examples" element={<ExamplesOverviewPage />} />
          <Route path="/examples/:categorySlug/:itemSlug" element={<ExamplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
