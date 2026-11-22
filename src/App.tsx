import { useCallback, useState } from "react";
import { About } from "./components/About";
import { FilterChips } from "./components/FilterChips";
import { HexBand } from "./components/HexBand";
import { Footer } from "./components/Footer";
import { Lightbox } from "./components/Lightbox";
import { QuoteForm } from "./components/QuoteForm";
import { SectionHead } from "./components/SectionHead";
import { Services } from "./components/Services";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { WorkGrid } from "./components/WorkGrid";
import { site } from "./data/site";
import type { WorkItem } from "./data/types";
import { useFilter } from "./hooks/useFilter";

export default function App() {
  const filter = useFilter(site.work);
  const [open, setOpen] = useState<{ item: WorkItem; trigger: HTMLElement } | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <Topbar />
      <div className="shell" id="top">
        <Sidebar />
        <main id="main" className="main">
          <section id="work" aria-labelledby="work-title">
            <SectionHead id="work" title="Work" />
            <FilterChips active={filter.active} onChange={filter.setActive} />
            <WorkGrid items={filter.visible} onOpen={(item, trigger) => setOpen({ item, trigger })} />
          </section>
          <section id="services" aria-labelledby="services-title">
            <Services />
          </section>
          <section id="devtools" aria-labelledby="devtools-title">
            <h2 id="devtools-title" className="sr-only">Dev tools</h2>
            <HexBand />
          </section>
          <section id="about" aria-labelledby="about-title">
            <About />
          </section>
          <section id="quote" aria-labelledby="quote-title">
            <QuoteForm />
          </section>
          <Footer />
        </main>
      </div>
      <Lightbox item={open?.item ?? null} trigger={open?.trigger} onClose={close} />
    </>
  );
}
