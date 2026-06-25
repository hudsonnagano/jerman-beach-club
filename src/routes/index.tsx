import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import heroClub from "@/assets/hero-club.jpg";
import vipCamarote from "@/assets/vip-camarote.jpg";
import djImg from "@/assets/dj.jpg";
import crowdImg from "@/assets/crowd.jpg";
import barImg from "@/assets/bar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jerman Beach Club — A Balada Mais Exclusiva da Cidade" },
      {
        name: "description",
        content:
          "Lista VIP, ingressos, camarotes e aniversários no Jerman Beach Club. Viva a noite mais luxuosa, energética e inesquecível.",
      },
      { property: "og:title", content: "Jerman Beach Club — Noite Premium" },
      {
        property: "og:description",
        content: "Garanta sua lista VIP gratuita, camarotes e ingressos antecipados.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const NEXT_EVENT_ISO = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(23, 0, 0, 0);
  return d.toISOString();
})();

function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = now == null ? 0 : Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function saveLead(kind: string, data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const key = "jerman_leads";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.push({ kind, data, at: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(list));
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 px-6 md:px-10 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Heading({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 text-center animate-float-up">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-[var(--neon)]">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">{title}</h2>
      {sub && <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Eventos", "#eventos"],
    ["Lista VIP", "#vip"],
    ["Camarotes", "#camarotes"],
    ["Aniversários", "#aniversarios"],
    ["Galeria", "#galeria"],
    ["Contato", "#contato"],
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/5">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl text-gradient-gold tracking-widest">
          JERMAN
        </a>
        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-[var(--neon)] transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#vip"
          className="hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-black bg-[var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:scale-105 transition"
          style={{ background: "var(--gradient-gold)" }}
        >
          Entrar na Lista VIP
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-4 h-0.5 bg-current ml-auto" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-background/95 px-6 py-4 flex flex-col gap-3">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-[var(--neon)]"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const c = useCountdown(NEXT_EVENT_ISO);
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroClub})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-1/2 animate-laser"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.85 0.25 142 / 0.15), transparent)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-4xl animate-float-up">
        <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-[var(--neon)] mb-6 neon-glow">
          A noite que todos vão falar amanhã
        </p>
        <h1 className="font-display text-5xl md:text-8xl leading-[0.95] mb-6">
          <span className="text-gradient-gold">JERMAN</span>
          <br />
          <span className="text-foreground">BEACH CLUB</span>
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Música eletrônica, drinks autorais e a vista mais sofisticada da cidade. Um lugar onde
          você não apenas vai — você é visto.
        </p>

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-10">
          {[
            ["Dias", c.days],
            ["Horas", c.hours],
            ["Min", c.minutes],
            ["Seg", c.seconds],
          ].map(([l, v]) => (
            <div key={l as string} className="glass rounded-xl p-3">
              <div className="font-display text-2xl md:text-3xl text-gradient-gold">
                {String(v).padStart(2, "0")}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                {l}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#ingressos"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold text-black animate-pulse-neon"
            style={{ background: "var(--gradient-neon)" }}
          >
            Comprar Ingresso
          </a>
          <a
            href="#vip"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold border-neon text-[var(--neon)] hover:bg-[var(--neon)]/10 transition"
          >
            Lista VIP Grátis
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest uppercase">
        ↓ Role para descobrir
      </div>
    </section>
  );
}

function Eventos() {
  const events = [
    {
      date: "SEX 26",
      title: "ELECTRIC NIGHTS",
      dj: "DJ Marlon Souza",
      tag: "House / Tech",
      img: djImg,
    },
    {
      date: "SAB 27",
      title: "GOLDEN HOUR",
      dj: "Carol Vega",
      tag: "Open Format",
      img: crowdImg,
    },
    {
      date: "SEX 03",
      title: "NEON DREAMS",
      dj: "Lucas Prime",
      tag: "Progressive",
      img: barImg,
    },
  ];
  return (
    <Section id="eventos">
      <Heading
        eyebrow="Próximos Eventos"
        title="A Agenda Mais Quente"
        sub="DJs internacionais, line-ups exclusivos e noites que viram lenda."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((e) => (
          <article
            key={e.title}
            className="group relative overflow-hidden rounded-3xl glass hover:-translate-y-1 transition duration-500"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={e.img}
                alt={e.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur border-neon text-[var(--neon)]">
              {e.date}
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] mb-2">{e.tag}</p>
              <h3 className="font-display text-2xl text-foreground mb-1">{e.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">com {e.dj}</p>
              <a
                href="#vip"
                className="inline-flex items-center text-sm font-semibold text-[var(--neon)] hover:gap-2 gap-1 transition-all"
              >
                Garantir presença →
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function VipForm() {
  const [loading, setLoading] = useState(false);
  return (
    <Section id="vip" className="relative">
      <div className="absolute inset-0 -z-10 opacity-40">
        <img src={crowdImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--neon)] mb-3">Lista VIP Grátis</p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-gold mb-6">
            Entre sem fila.
            <br /> Pague menos.
          </h2>
          <ul className="space-y-3 text-muted-foreground mb-8">
            {[
              "Entrada gratuita até 00h",
              "Fila preferencial a noite toda",
              "Welcome drink de cortesia",
              "Acesso a eventos privados",
            ].map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--neon)] shadow-[0_0_12px_var(--neon)]" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            const fd = new FormData(e.currentTarget);
            const data = Object.fromEntries(fd.entries());
            saveLead("vip", data);
            setTimeout(() => {
              setLoading(false);
              toast.success("Você está na Lista VIP! Confirmação no WhatsApp.");
              (e.target as HTMLFormElement).reset();
            }, 600);
          }}
          className="glass rounded-3xl p-8 space-y-4"
        >
          <h3 className="font-display text-2xl text-foreground mb-2">Cadastro VIP</h3>
          {[
            { n: "name", p: "Nome completo", t: "text" },
            { n: "phone", p: "WhatsApp com DDD", t: "tel" },
            { n: "email", p: "E-mail", t: "email" },
            { n: "birthday", p: "Data de nascimento", t: "date" },
          ].map((f) => (
            <input
              key={f.n}
              required
              name={f.n}
              type={f.t}
              placeholder={f.p}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-[var(--neon)] focus:outline-none transition"
            />
          ))}
          <select
            name="event"
            required
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-[var(--neon)] focus:outline-none"
          >
            <option value="">Para qual evento?</option>
            <option>Electric Nights — Sex 26</option>
            <option>Golden Hour — Sab 27</option>
            <option>Neon Dreams — Sex 03</option>
          </select>
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl py-4 text-sm font-bold text-black disabled:opacity-50"
            style={{ background: "var(--gradient-neon)" }}
          >
            {loading ? "Enviando..." : "Quero estar na Lista VIP"}
          </button>
          <p className="text-[11px] text-muted-foreground text-center">
            Ao se cadastrar, você concorda em receber novidades.
          </p>
        </form>
      </div>
    </Section>
  );
}

function Camarotes() {
  const tiers = [
    { name: "Silver", price: "R$ 1.200", people: "até 6", perks: ["Mesa reservada", "1 garrafa", "Vista pista"] },
    {
      name: "Gold",
      price: "R$ 2.400",
      people: "até 10",
      perks: ["Camarote elevado", "2 garrafas premium", "Garçom exclusivo", "Welcome drinks"],
      featured: true,
    },
    {
      name: "Black",
      price: "R$ 4.800",
      people: "até 16",
      perks: ["Camarote master", "Open bar premium", "Anfitriã dedicada", "Entrada lateral", "Brinde da casa"],
    },
  ];
  return (
    <Section id="camarotes">
      <Heading
        eyebrow="Experiência Premium"
        title="Camarotes & Bottle Service"
        sub="Sua noite, do seu jeito. Reserve com nosso concierge."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-3xl p-8 glass ${
              t.featured ? "border-neon ring-neon" : ""
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black"
                style={{ background: "var(--gradient-gold)" }}
              >
                Mais Pedido
              </span>
            )}
            <h3 className="font-display text-3xl text-gradient-gold mb-1">{t.name}</h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {t.people} pessoas
            </p>
            <p className="font-display text-4xl text-foreground mb-6">{t.price}</p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-8">
              {t.perks.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-[var(--neon)]">✦</span> {p}
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="block text-center rounded-xl py-3 text-sm font-bold border-neon text-[var(--neon)] hover:bg-[var(--neon)]/10 transition"
            >
              Reservar Camarote
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Aniversarios() {
  return (
    <Section id="aniversarios">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden">
          <img src={vipCamarote} alt="Camarote VIP de aniversário" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)] mb-3">
            Pacotes de Aniversário
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-6">
            Comemore como uma estrela
          </h2>
          <p className="text-muted-foreground mb-8">
            Bolo personalizado, parabéns no DJ booth, área reservada e fotos profissionais.
            Aniversariante não paga.
          </p>
          <div className="space-y-3 mb-8">
            {[
              ["Essencial", "10 cortesias + bolo + área reservada"],
              ["Premium", "20 cortesias + open bar + DJ shoutout"],
              ["Diamond", "Camarote Black + champagne parade + fotógrafo"],
            ].map(([n, d]) => (
              <div key={n} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-lg text-foreground">{n}</h4>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </div>
                <a
                  href="#contato"
                  className="text-xs font-semibold text-[var(--neon)] whitespace-nowrap"
                >
                  Quero esse →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Galeria() {
  const imgs = [heroClub, djImg, crowdImg, barImg, vipCamarote];
  return (
    <Section id="galeria">
      <Heading eyebrow="Galeria" title="A experiência em imagens" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {imgs.map((src, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl ${
              i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
            }`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover hover:scale-110 transition duration-700"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Depoimentos() {
  const items = [
    { n: "Marina S.", t: "Melhor balada da cidade. O camarote Gold é absurdo, drinks no nível.", r: 5 },
    { n: "Rafael T.", t: "Comemorei meus 25 anos no Black. Inesquecível. Voltarei sempre.", r: 5 },
    { n: "Júlia P.", t: "Lista VIP funciona perfeitamente, entrei sem fila e ainda peguei welcome drink.", r: 5 },
  ];
  return (
    <Section>
      <Heading eyebrow="Quem viveu, conta" title="Depoimentos" />
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((i) => (
          <blockquote key={i.n} className="glass rounded-2xl p-6">
            <div className="text-[var(--gold)] mb-3">{"★".repeat(i.r)}</div>
            <p className="text-sm text-muted-foreground italic mb-4">"{i.t}"</p>
            <footer className="text-xs uppercase tracking-widest text-foreground">— {i.n}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

function Loyalty() {
  return (
    <Section>
      <div className="rounded-3xl glass p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30" style={{ background: "var(--gradient-hero)" }} />
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--neon)] mb-3">Programa Indique & Ganhe</p>
        <h2 className="font-display text-3xl md:text-5xl text-gradient-gold mb-6">
          Traga seus amigos. Ganhe a noite.
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            ["3 amigos", "Fila preferencial"],
            ["5 amigos", "Drink grátis"],
            ["10 amigos", "Acesso VIP completo"],
          ].map(([n, p]) => (
            <div key={n} className="rounded-2xl p-6 border border-white/10">
              <div className="font-display text-3xl text-[var(--neon)] mb-2">{n}</div>
              <div className="text-sm text-muted-foreground">{p}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contato() {
  return (
    <Section id="contato">
      <Heading eyebrow="Fale Conosco" title="Reserve agora" sub="Atendimento via WhatsApp 7 dias por semana." />
      <div className="grid md:grid-cols-3 gap-6">
        {[
          ["📍 Endereço", "Av. Atlântica, 2024 — Beira Mar"],
          ["🕒 Horário", "Sex e Sáb · 23h às 06h"],
          ["📱 WhatsApp", "(11) 99999-0000"],
        ].map(([t, d]) => (
          <div key={t} className="glass rounded-2xl p-6 text-center">
            <div className="font-display text-xl text-gradient-gold mb-2">{t}</div>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a
          href="https://wa.me/5511999990000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-black"
          style={{ background: "var(--gradient-gold)" }}
        >
          Falar no WhatsApp
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 text-center text-xs text-muted-foreground">
      <p className="font-display text-lg text-gradient-gold mb-2 tracking-widest">JERMAN</p>
      <p>© {new Date().getFullYear()} Jerman Beach Club — Proibida a entrada de menores de 18 anos.</p>
    </footer>
  );
}

function WhatsFloat() {
  return (
    <a
      href="https://wa.me/5511999990000"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full grid place-items-center text-black font-bold animate-pulse-neon"
      style={{ background: "var(--gradient-neon)" }}
    >
      💬
    </a>
  );
}

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Eventos />
      <VipForm />
      <Camarotes />
      <Aniversarios />
      <Galeria />
      <Depoimentos />
      <Loyalty />
      <Contato />
      <Footer />
      <WhatsFloat />
    </main>
  );
}
