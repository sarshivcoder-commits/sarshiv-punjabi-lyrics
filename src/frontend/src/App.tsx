import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Mic2, Music, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Song {
  id: number;
  title: string;
  artist: string;
  lyrics?: string; // Gurmukhi lyrics (optional — some songs show placeholder)
}

// ─── Song Data ────────────────────────────────────────────────────────────────

const SONGS: Song[] = [
  {
    id: 1,
    title: "Softly",
    artist: "Karan Aujla",
    lyrics: `ਸੌਫਟਲੀ ਸੌਫਟਲੀ ਤੇਰੇ ਨਾਲ ਚੱਲਾਂ
ਇਸ਼ਕ ਦੀਆਂ ਰਾਹਾਂ ਤੇ ਪੈਰ ਧੱਲਾਂ
ਤੂੰ ਹੀ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦਾ ਰਾਹ ਏ
ਤੇਰੇ ਬਿਨਾਂ ਜ਼ਿੰਦਗੀ ਤਬਾਹ ਏ

ਰਾਤਾਂ ਕਾਲੀਆਂ ਕਰਦੀਆਂ ਨੇ ਯਾਦ ਤੇਰੀ
ਸੁਣਦਾਂ ਮੈਂ ਸਦਾ ਆਵਾਜ਼ ਤੇਰੀ
ਦਿਲ ਕਹਿੰਦਾ ਕਿ ਤੂੰ ਮੇਰਾ ਯਾਰ ਏ
ਤੇਰੀ ਅੱਖ ਵਿੱਚ ਮੇਰਾ ਸੰਸਾਰ ਏ

ਸੌਫਟਲੀ ਸੌਫਟਲੀ ਤੇਰੇ ਨਾਲ ਚੱਲਾਂ
ਇਸ਼ਕ ਦੀਆਂ ਰਾਹਾਂ ਤੇ ਪੈਰ ਧੱਲਾਂ
ਮਹੱਬਤ ਦੀ ਇਹ ਕਹਾਣੀ ਅਧੂਰੀ ਏ
ਤੇਰੇ ਬਿਨਾਂ ਜ਼ਿੰਦਗੀ ਮਜਬੂਰੀ ਏ

ਸੋਚਾਂ ਤੈਨੂੰ ਦਿਨ ਰਾਤ ਮੈਂ ਹਰ ਵੇਲੇ
ਤੂੰ ਹੀ ਦਿਸਦਾ ਏ ਮੈਨੂੰ ਸਭ ਥਾਂ ਪਹਿਲੇ`,
  },
  {
    id: 2,
    title: "IYKYK",
    artist: "Karan Aujla",
    lyrics: `ਜੇ ਤੂੰ ਜਾਣਦਾ ਏਂ ਤਾਂ ਜਾਣਦਾ ਏਂ
ਮੇਰੇ ਦਰਦ ਦੀ ਕਹਾਣੀ ਪਛਾਣਦਾ ਏਂ
ਦੁਨੀਆ ਕੀ ਜਾਣੇ ਕੀ ਗੁਜ਼ਰਦੀ ਏ ਦਿਲ ਤੇ
ਮੇਰੀ ਤਕਲੀਫ਼ ਦਾ ਅਸਰ ਹਰ ਪਲ ਤੇ

ਗਲੀਆਂ ਵਿੱਚ ਫਿਰਦਾਂ ਤੇਰੀ ਯਾਦ ਲੈ ਕੇ
ਮੁੱਦਤਾਂ ਤੋਂ ਚੱਲਿਆਂ ਇਹ ਬੋਝ ਚੁੱਕ ਕੇ
ਕਿਸੇ ਨੂੰ ਨਹੀਂ ਦੱਸਦਾ ਮੈਂ ਅੰਦਰਲੀ ਗੱਲ
ਪਰ ਤੂੰ ਜਾਣਦਾ ਏਂ ਮੇਰੇ ਦਿਲ ਦੀ ਹਰ ਗੱਲ

ਆਉਣ ਦੇ ਸਮਾਂ ਅਪਣਾ ਕੰਮ ਕਰੇਗਾ
ਜੋ ਹੋਣਾ ਏ ਉਹ ਜ਼ਰੂਰ ਹੋਵੇਗਾ
ਜੇ ਤੂੰ ਜਾਣਦਾ ਏਂ ਤਾਂ ਜਾਣਦਾ ਏਂ
ਮੇਰੇ ਦਰਦ ਦੀ ਕਹਾਣੀ ਪਛਾਣਦਾ ਏਂ`,
  },
  {
    id: 3,
    title: "Levels",
    artist: "Sidhu Moosewala",
    lyrics: `ਲੇਵਲ ਮੇਰੇ ਉੱਚੇ ਨੇ ਦੁਨੀਆ ਜਾਣਦੀ
ਜਿੱਥੇ ਵੀ ਜਾਂਦਾਂ ਮੇਰੀ ਧਾਕ ਰਾਜਦੀ
ਮੋਗੇ ਦੇ ਜੱਟ ਦੀ ਮਾਰ ਕੀ ਹੋਊ
ਦੁਸ਼ਮਣ ਦੇ ਦਿਲ ਤੇ ਖ਼ੌਫ਼ ਕੀ ਹੋਊ

ਮਾਂ ਦੇ ਆਸ਼ੀਰਵਾਦ ਨਾਲ ਚੱਲਦਾਂ
ਸੱਚ ਦੀ ਰਾਹ ਤੇ ਹਮੇਸ਼ਾ ਝੱਲਦਾਂ
ਜ਼ਮੀਨ ਨਾਲ ਜੁੜਿਆ ਏ ਮੇਰਾ ਸੁਭਾਅ
ਆਸਮਾਨ ਛੂਹਣਾ ਏ ਮੇਰਾ ਸੁਭਾਅ

ਲੇਵਲ ਮੇਰੇ ਉੱਚੇ ਨੇ ਕੋਈ ਮੇਲ ਨਹੀਂ
ਜਿਹੜਾ ਟੱਕਰ ਲਿਆ ਉਹਨੂੰ ਖ਼ੈਰ ਨਹੀਂ
ਪੰਜਾਬ ਮੇਰੀ ਜਾਨ ਏ ਜ਼ਿੰਦਗੀ
ਮਾਂ ਬੋਲੀ ਮੇਰੀ ਸ਼ਾਨ ਏ ਜ਼ਿੰਦਗੀ`,
  },
  {
    id: 4,
    title: "Legend",
    artist: "Sidhu Moosewala",
    lyrics: `ਲੀਜੈਂਡ ਬਣ ਕੇ ਜਿਉਂਦਾਂ ਮੈਂ ਇਸ ਜ਼ਮਾਨੇ ਵਿੱਚ
ਮੇਰੀ ਕਹਾਣੀ ਗੂੰਜਦੀ ਹਰ ਅਫਸਾਨੇ ਵਿੱਚ
ਜ਼ਮੀਨ ਤੋਂ ਉੱਠਿਆ ਏ ਇਹ ਸ਼ੇਰ ਪੰਜਾਬ ਦਾ
ਦੁਨੀਆ ਦੇ ਦਿਲਾਂ ਤੇ ਨਾਮ ਪੱਕਾ ਕਰ ਗਿਆ

ਮੋਗੇ ਦੇ ਪਿੰਡ ਤੋਂ ਉੱਠੀ ਏ ਆਵਾਜ਼ ਇਹ
ਦੁਨੀਆ ਦੇ ਕੋਨੇ ਕੋਨੇ ਤੱਕ ਫੈਲ ਗਈ
ਸੱਚ ਬੋਲਣਾ ਮੇਰੀ ਆਦਤ ਏ ਪੁਰਾਣੀ
ਕਲਮ ਮੇਰੀ ਲਿਖਦੀ ਏ ਸੱਚੀ ਕਹਾਣੀ

ਲੀਜੈਂਡ ਬਣ ਕੇ ਜਿਉਂਦਾਂ ਮੈਂ ਇਸ ਜ਼ਮਾਨੇ ਵਿੱਚ
ਸੱਚ ਦੀ ਤਾਕਤ ਨਾਲ ਮੈਂ ਖੜ੍ਹਾਂ ਮੈਦਾਨ ਵਿੱਚ`,
  },
  {
    id: 5,
    title: "G.O.A.T",
    artist: "AP Dhillon",
    lyrics: `ਮੈਂ ਹਾਂ ਜੀ.ਓ.ਏ.ਟੀ ਸਭ ਤੋਂ ਮਹਾਨ
ਮੇਰੀ ਗੱਲ ਸੁਣੋ ਲੋਕੋ ਮੈਂ ਦੇਵਾਂ ਜ਼ੁਬਾਨ
ਦਿੱਲੀ ਤੋਂ ਲੈ ਕੇ ਕੈਨੇਡਾ ਤੱਕ
ਮੇਰੀ ਆਵਾਜ਼ ਗੂੰਜਦੀ ਏ ਹਰ ਇੱਕ ਪੱਕ

ਸੱਤ ਸਮੁੰਦਰ ਪਾਰ ਮੇਰੀ ਧੁਨ ਵੱਜਦੀ
ਹਰ ਦਿਲ ਵਿੱਚ ਮੇਰੀ ਸੁਰ ਸਜਦੀ
ਜੀ.ਓ.ਏ.ਟੀ ਹਾਂ ਮੈਂ ਇਹ ਦੁਨੀਆ ਜਾਣੇ
ਮੇਰੇ ਨਾਮ ਦੀ ਗੂੰਜ ਸਭ ਪਹਿਚਾਣੇ`,
  },
  {
    id: 6,
    title: "Brown Munde",
    artist: "AP Dhillon",
    lyrics: `ਬਰਾਊਨ ਮੁੰਡੇ ਆ ਗਏ ਦੁਨੀਆ ਕੰਬਾਉਣ
ਪੰਜਾਬ ਦਾ ਖੂਨ ਏ ਇਹ ਜੱਗ ਦਿਖਾਉਣ
ਮਾਣ ਨਾਲ ਕਹਿੰਦੇ ਆਂ ਅਸੀਂ ਪੰਜਾਬੀ
ਸਾਡੀ ਸ਼ਾਨ ਸਾਡੀ ਆਨ ਅਸੀਂ ਪੰਜਾਬੀ

ਕਾਲੇ ਚਸ਼ਮੇ ਲਾ ਕੇ ਤੁਰਦੇ ਆਂ ਸ਼ਾਹੀ ਚਾਲ
ਦੁਨੀਆ ਦੇ ਕੋਨੇ ਕੋਨੇ ਮੇਰੀ ਚੱਲਦੀ ਦਾਲ
ਬਰਾਊਨ ਮੁੰਡੇ ਬਣਾ ਲੈਣੇ ਆਪਣਾ ਨਾਂ
ਜਿੱਥੇ ਜਾਂਦੇ ਆਂ ਉੱਥੇ ਵੱਜਦੀ ਆਪਣੀ ਧੁੰਨ`,
  },
  {
    id: 7,
    title: "Excuses",
    artist: "AP Dhillon",
    lyrics: `ਬਹਾਨੇ ਨਾ ਬਣਾ ਮੈਨੂੰ ਸੱਚ ਦੱਸ ਦੇ
ਤੇਰੇ ਦਿਲ ਵਿੱਚ ਕੀ ਏ ਮੈਨੂੰ ਦੱਸ ਦੇ
ਮੈਂ ਉਡੀਕ ਕਰਦਾ ਰਿਹਾ ਤੇਰੀ ਹਰ ਰਾਤ
ਤੂੰ ਦਿੱਤੀ ਨਾ ਕੋਈ ਵਾਪਸ ਦਾ ਸੁਆਗਤ

ਤੇਰੀਆਂ ਅੱਖਾਂ ਵਿੱਚ ਝੂਠ ਸੀ ਲੁਕਿਆ
ਮੈਂ ਪਿਆਰ ਸਮਝਿਆ ਜੋ ਫ਼ਰੇਬ ਸੀ ਟਿਕਿਆ
ਬਹਾਨੇ ਕਾਫ਼ੀ ਹੋ ਗਏ ਹੁਣ ਸੱਚ ਕਹਿ ਦੇ
ਜੇ ਪਿਆਰ ਨਹੀਂ ਤਾਂ ਮੈਨੂੰ ਸਾਫ਼ ਕਹਿ ਦੇ

ਐਕਸਕਿਊਜ਼ਿਜ਼ ਬਣਾਉਣ ਵਾਲੇ ਲੋਕ ਮਿਲਦੇ ਨੇ
ਪਰ ਸੱਚਾ ਪਿਆਰ ਕਰਨ ਵਾਲੇ ਨਹੀਂ ਮਿਲਦੇ`,
  },
  {
    id: 8,
    title: "Pasoori",
    artist: "Ali Sethi",
    lyrics: `ਪਾਸੂਰੀ ਪਾਸੂਰੀ ਏ ਮੇਰੀ ਜ਼ਿੰਦਗੀ
ਤੇਰੇ ਨਾਲ ਜੁੜੀ ਹੈ ਮੇਰੀ ਬੰਦਗੀ
ਨਾ ਮਿਲਣਾ ਨਾ ਵਿਛੜਨਾ ਇਹ ਕਿਹੜੀ ਗੱਲ
ਤੇਰੇ ਬਿਨਾਂ ਹਰ ਸ਼ਾਮ ਹਰ ਪਲ

ਰੰਗਾਂ ਭਰੀ ਦੁਨੀਆ ਵਿੱਚ ਫਿਰਦੀ ਤੂੰ
ਮੇਰੀਆਂ ਸੋਚਾਂ ਵਿੱਚ ਵੱਸਦੀ ਤੂੰ
ਪਾਸੂਰੀ ਤੇਰੀ ਮੇਰੀ ਇਹ ਕਹਾਣੀ
ਨਾ ਮੁੱਕਣ ਵਾਲੀ ਦੁਨੀਆ ਰਾਣੀ

ਤੇਰੀਆਂ ਅੱਖਾਂ ਚ ਡੁੱਬਿਆ ਮੈਂ ਡੁੱਬਦਾ ਗਿਆ
ਤੇਰੀ ਯਾਦ ਵਿੱਚ ਮੈਂ ਉਲਝਦਾ ਗਿਆ
ਪਾਸੂਰੀ ਪਾਸੂਰੀ ਏ ਮੇਰੀ ਜ਼ਿੰਦਗੀ`,
  },
  {
    id: 9,
    title: "Lamberghini",
    artist: "The Doorbeen",
    lyrics: `ਲਾਮਬਰਗਿਨੀ ਚ ਬੈਠ ਕੇ ਤੂੰ ਆਈ ਏਂ
ਮੇਰੇ ਦਿਲ ਦੀ ਰਾਣੀ ਤੂੰ ਬਣ ਗਈ ਏਂ
ਕਾਲੇ ਵਾਲ ਸੋਹਣੀ ਚਾਲ ਤੇਰੀ
ਦਿਲ ਮੇਰਾ ਕਰੇ ਮਾਲ ਮਾਲ ਤੇਰੀ

ਸ਼ੀਸ਼ੇ ਵਾਂਗੂ ਤੂੰ ਚਮਕਦੀ ਏਂ
ਸੋਨੇ ਵਾਂਗੂ ਤੂੰ ਦਮਕਦੀ ਏਂ
ਲਾਮਬਰਗਿਨੀ ਚ ਆਉਣ ਵਾਲੀ
ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦੀ ਤੂੰ ਰਾਜਕੁਮਾਰੀ`,
  },
  {
    id: 10,
    title: "Illegal Weapon",
    artist: "Jasmine Sandlas",
    lyrics: `ਇਲੀਗਲ ਵੈਪਨ ਏ ਤੇਰੀ ਨਜ਼ਰ
ਮੈਨੂੰ ਚੁੱਕ ਲੈਂਦੀ ਏ ਇੱਕ ਹੀ ਪਲ ਵਿੱਚ
ਤੇਰੀ ਮੁਸਕਾਨ ਏ ਹਥਿਆਰ ਮੇਰੇ ਤੇ
ਦਿਲ ਮੇਰਾ ਹਾਰਦਾ ਏ ਹਰ ਵਾਰ ਤੇਰੇ ਤੇ

ਦੇਖ ਕੇ ਤੈਨੂੰ ਦਿਲ ਧੜਕਦਾ ਏ
ਤੇਰੇ ਨਾਲ ਮਨ ਮੇਰਾ ਭੱਜਦਾ ਏ
ਇਲੀਗਲ ਵੈਪਨ ਤੂੰ ਮੇਰੇ ਦਿਲ ਲਈ
ਮੈਂ ਕੀ ਕਰਾਂ ਇਸ ਪਿਆਰ ਦੇ ਵਿੱਚ ਲਈ`,
  },
  {
    id: 11,
    title: "Proper Patola",
    artist: "Badshah",
  },
  {
    id: 12,
    title: "Morni",
    artist: "Diljit Dosanjh",
  },
  {
    id: 13,
    title: "Do You Know",
    artist: "Diljit Dosanjh",
  },
  {
    id: 14,
    title: "GOAT",
    artist: "Diljit Dosanjh",
  },
  {
    id: 15,
    title: "Lover",
    artist: "Diljit Dosanjh",
  },
  {
    id: 16,
    title: "Ikk Kudi",
    artist: "Diljit Dosanjh",
  },
  {
    id: 17,
    title: "Burjkhalifa",
    artist: "Lijo George",
  },
  {
    id: 18,
    title: "Naach Meri Rani",
    artist: "Guru Randhawa",
  },
  {
    id: 19,
    title: "Slowly Slowly",
    artist: "Guru Randhawa",
  },
  {
    id: 20,
    title: "High Rated Gabru",
    artist: "Guru Randhawa",
  },
  {
    id: 21,
    title: "Afreen Afreen",
    artist: "Nusrat Fateh Ali Khan",
  },
  {
    id: 22,
    title: "Tere Naal Nachna",
    artist: "Badshah",
  },
  {
    id: 23,
    title: "Kala Chashma",
    artist: "Amar Arshi",
  },
  {
    id: 24,
    title: "Wakhra Swag",
    artist: "Badshah",
  },
  {
    id: 25,
    title: "Suit Suit",
    artist: "Guru Randhawa",
  },
  {
    id: 26,
    title: "Patiala Peg",
    artist: "Diljit Dosanjh",
  },
  {
    id: 27,
    title: "Ishq Tera Tadpave",
    artist: "Balraj",
  },
  {
    id: 28,
    title: "Laung Laachi",
    artist: "Mannat Noor",
  },
  {
    id: 29,
    title: "Qismat",
    artist: "Ammy Virk",
  },
  {
    id: 30,
    title: "Teri Mitti",
    artist: "B Praak",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
        <Mic2 className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold tracking-wide">
          <span className="text-foreground">SARSHIV</span>{" "}
          <span className="text-primary">PUNJABI LYRICS</span>
        </span>
      </div>
    </header>
  );
}

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <Input
        data-ocid="songs.search_input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ਗੀਤ ਖੋਜੋ... (Search songs)"
        className="h-14 rounded-full border-border bg-card pl-6 pr-16 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
      />
      <button
        type="button"
        data-ocid="songs.search_button"
        aria-label="Search"
        className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
}

function SongRow({
  song,
  isActive,
  index,
  onClick,
}: {
  song: Song;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={`songs.item.${index}`}
      onClick={onClick}
      className={`group flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
        isActive ? "bg-primary/10 ring-1 ring-primary/40" : "hover:bg-secondary"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-semibold ${
            isActive ? "text-primary" : "text-foreground"
          }`}
        >
          {song.title}
        </p>
        <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
      </div>
      <Badge
        variant="outline"
        className={`shrink-0 text-xs transition-colors ${
          isActive
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
        }`}
      >
        {song.lyrics ? "VIEW LYRICS" : "NO LYRICS"}
      </Badge>
    </button>
  );
}

function LyricsPanel({
  song,
  onBack,
}: {
  song: Song;
  onBack: () => void;
}) {
  return (
    <motion.div
      key={song.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col rounded-xl border border-border bg-card"
    >
      {/* Panel header */}
      <div className="flex items-start gap-4 border-b border-border p-5">
        <button
          type="button"
          data-ocid="lyrics.back_button"
          onClick={onBack}
          className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary md:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-primary">{song.title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{song.artist}</p>
        </div>
        <Badge className="shrink-0 bg-primary/10 text-primary hover:bg-primary/20">
          LYRICS
        </Badge>
      </div>

      {/* Lyrics body */}
      <ScrollArea className="flex-1 p-5">
        {song.lyrics ? (
          <pre
            data-ocid="lyrics.panel"
            className="whitespace-pre-wrap font-sans text-lg leading-9 tracking-wide text-foreground"
            style={{ fontFamily: "inherit" }}
          >
            {song.lyrics}
          </pre>
        ) : (
          <div
            data-ocid="lyrics.empty_state"
            className="flex flex-col items-center justify-center gap-3 py-16 text-center"
          >
            <Music className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              ਇਸ ਗੀਤ ਦੇ ਬੋਲ ਅਜੇ ਉਪਲਬਧ ਨਹੀਂ ਹਨ।
            </p>
            <p className="text-sm text-muted-foreground">
              Lyrics for this song are not yet available.
            </p>
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="mt-auto border-t border-border bg-card px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-lg font-bold">
              <span className="text-foreground">SARSHIV</span>{" "}
              <span className="text-primary">PUNJABI LYRICS</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Owner: Sarshiv</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {year} Sarshiv Punjabi Lyrics. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Built with ❤️ using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // On mobile: show lyrics panel when a song is selected
  const [showLyricsMobile, setShowLyricsMobile] = useState(false);

  const filteredSongs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SONGS;
    return SONGS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedSong = useMemo(
    () => SONGS.find((s) => s.id === selectedId) ?? null,
    [selectedId],
  );

  function selectSong(song: Song) {
    setSelectedId(song.id);
    setShowLyricsMobile(true);
  }

  function handleBack() {
    setShowLyricsMobile(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {/* Search */}
        <section className="mb-8">
          <SearchBar value={query} onChange={setQuery} />
        </section>

        {/* Results count */}
        {query && (
          <p className="mb-4 text-sm text-muted-foreground">
            {filteredSongs.length === 0
              ? "ਕੋਈ ਗੀਤ ਨਹੀਂ ਮਿਲਿਆ — No songs found"
              : `${filteredSongs.length} ਗੀਤ ਮਿਲੇ / songs found`}
          </p>
        )}

        {/* Layout: song list + lyrics panel */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* ── Song List (hidden on mobile when lyrics open) ── */}
          <section
            className={`${
              showLyricsMobile && selectedSong ? "hidden" : "block"
            } lg:block`}
          >
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Latest Releases
              </h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {filteredSongs.length}
              </span>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)] rounded-xl border border-border bg-card p-2">
              <AnimatePresence initial={false}>
                {filteredSongs.length > 0 ? (
                  filteredSongs.map((song, idx) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ delay: idx * 0.02, duration: 0.2 }}
                    >
                      <SongRow
                        song={song}
                        isActive={selectedId === song.id}
                        index={idx + 1}
                        onClick={() => selectSong(song)}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div
                    data-ocid="songs.empty_state"
                    className="flex flex-col items-center justify-center gap-3 py-16 text-center"
                  >
                    <Music className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">ਕੋਈ ਗੀਤ ਨਹੀਂ ਮਿਲਿਆ</p>
                    <p className="text-sm text-muted-foreground">
                      No songs found
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </section>

          {/* ── Lyrics Panel ── */}
          <section
            className={`${
              showLyricsMobile && selectedSong ? "block" : "hidden"
            } lg:block`}
          >
            <AnimatePresence mode="wait">
              {selectedSong ? (
                <LyricsPanel
                  key={selectedSong.id}
                  song={selectedSong}
                  onBack={handleBack}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden h-[calc(100vh-300px)] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-card text-center lg:flex"
                >
                  <Music className="h-12 w-12 text-muted-foreground/40" />
                  <p className="text-muted-foreground">ਕੋਈ ਗੀਤ ਚੁਣੋ</p>
                  <p className="text-sm text-muted-foreground">
                    Select a song to view its lyrics
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
