import { Footer } from "./components/Footer";
import { SectionHead } from "./components/SectionHead";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

export default function App() {
  return (
    <>
      <Topbar />
      <div className="shell" id="top">
        <Sidebar />
        <main id="main" className="main">
          <section id="work" aria-labelledby="work-title">
            <SectionHead id="work" title="Work" />
          </section>
          <section id="services" aria-labelledby="services-title">
            <SectionHead id="services" title="Services" />
          </section>
          <section id="devtools" aria-labelledby="devtools-title">
            <h2 id="devtools-title" className="sr-only">Dev tools</h2>
          </section>
          <section id="about" aria-labelledby="about-title">
            <SectionHead id="about" title="About" />
          </section>
          <section id="quote" aria-labelledby="quote-title">
            <SectionHead id="quote" title="Get a quote" />
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
