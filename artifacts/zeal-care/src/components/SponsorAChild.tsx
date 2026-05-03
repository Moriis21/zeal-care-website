import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, BookOpen, Heart, CheckCircle, Loader2 } from "lucide-react";
import { useChildren, useSponsorChild, type Child } from "@/hooks/useChildren";
import { useDonate } from "@/context/DonateContext";
import mosesPhoto from "@assets/image_1777773678529.png";

const CHILD_PHOTOS: Record<string, string> = {
  c003: mosesPhoto,
};

const NEEDS_COLORS: Record<string, string> = {
  "School Fees": "bg-blue-100 text-blue-700",
  "Books": "bg-amber-100 text-amber-700",
  "Uniform": "bg-purple-100 text-purple-700",
  "Meals": "bg-green-100 text-green-700",
  "Transport": "bg-orange-100 text-orange-700",
  "Transportation": "bg-orange-100 text-orange-700",
  "Shoes": "bg-rose-100 text-rose-700",
  "Stationery": "bg-teal-100 text-teal-700",
  "Art Supplies": "bg-pink-100 text-pink-700",
  "Counseling": "bg-indigo-100 text-indigo-700",
  "Laptop Access": "bg-cyan-100 text-cyan-700",
  "Exam Fees": "bg-red-100 text-red-700",
};

type FilterTab = "all" | "available" | "sponsored";

function ChildCard({ child, index }: { child: Child; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { openDonate } = useDonate();
  const sponsorChild = useSponsorChild();
  const photo = CHILD_PHOTOS[child.id];

  const handleSponsor = () => {
    openDonate(150, { id: child.id, name: child.name });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-border group ${child.isSponsored ? "opacity-80" : ""}`}
    >
      {/* Photo / Avatar Header */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={
          photo
            ? {}
            : { background: `linear-gradient(135deg, ${child.avatarColor}33, ${child.avatarColor}99)` }
        }
      >
        {photo ? (
          <img
            src={photo}
            alt={`${child.name} — Zeal Care student`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center font-black text-4xl text-white shadow-lg border-4 border-white/30"
            style={{ backgroundColor: child.avatarColor }}
          >
            {child.name[0]}
          </div>
        )}

        {/* Gradient overlay for photo cards */}
        {photo && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}

        {child.isSponsored ? (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            <CheckCircle className="w-3.5 h-3.5" />
            Sponsored
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-secondary text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            Needs Sponsor
          </div>
        )}

        <div className={`absolute bottom-3 left-3 flex items-center gap-1 text-xs font-semibold ${photo ? "text-white" : "text-white/80"}`}>
          <MapPin className="w-3.5 h-3.5" />
          {child.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-black text-primary text-xl">{child.name}</h3>
          <span className="text-xs text-muted-foreground font-semibold bg-primary/5 px-2 py-1 rounded-full">Age {child.age}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-3">
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{child.grade} · {child.school}</span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
          {child.story}
        </p>

        {/* Needs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {child.needs.map((need) => (
            <span
              key={need}
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${NEEDS_COLORS[need] ?? "bg-gray-100 text-gray-600"}`}
            >
              {need}
            </span>
          ))}
        </div>

        {/* CTA */}
        {child.isSponsored ? (
          <div className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold">
            <CheckCircle className="w-4 h-4" />
            This child is sponsored — thank you!
          </div>
        ) : (
          <button
            onClick={handleSponsor}
            disabled={sponsorChild.isPending}
            className="w-full bg-secondary text-primary py-3 rounded-2xl font-black text-sm hover:bg-secondary/90 transition-all duration-200 shadow hover:shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {sponsorChild.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Heart className="w-4 h-4 fill-primary" />
            )}
            Sponsor {child.name} — $150/yr
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function SponsorAChild() {
  const { data: children, isLoading, isError } = useChildren();
  const [filter, setFilter] = useState<FilterTab>("all");

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All Children" },
    { id: "available", label: "Needs Sponsor" },
    { id: "sponsored", label: "Already Sponsored" },
  ];

  const filtered = children
    ? filter === "available"
      ? children.filter((c) => !c.isSponsored)
      : filter === "sponsored"
        ? children.filter((c) => c.isSponsored)
        : children
    : [];

  const sponsoredCount = children?.filter((c) => c.isSponsored).length ?? 0;
  const totalCount = children?.length ?? 0;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-primary text-sm font-bold tracking-wider mb-4 uppercase">
            Make It Personal
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">
            Sponsor a Specific Child
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Every child here has a name, a dream, and a story. Choose one to support directly — your $150 covers their full year of school.
          </p>

          {/* Progress Bar */}
          {children && (
            <div className="mt-8 max-w-sm mx-auto">
              <div className="flex justify-between text-sm font-bold text-primary mb-2">
                <span>{sponsoredCount} of {totalCount} sponsored</span>
                <span className="text-secondary">{totalCount - sponsoredCount} still need you</span>
              </div>
              <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(sponsoredCount / totalCount) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className="h-full bg-secondary rounded-full"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-border rounded-2xl p-1.5 gap-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  filter === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {tab.label}
                {tab.id !== "all" && children && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === tab.id ? "bg-white/20" : "bg-primary/10"}`}>
                    {tab.id === "available" ? totalCount - sponsoredCount : sponsoredCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-semibold">Loading children profiles…</span>
          </div>
        )}

        {isError && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-semibold">Could not load profiles right now. Please try again shortly.</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((child, i) => (
              <ChildCard key={child.id} child={child} index={i} />
            ))}
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl font-black text-primary mb-2">All children are sponsored! 🎉</p>
            <p className="text-muted-foreground">Your generosity has made this possible. Contact us to support the next intake.</p>
          </div>
        )}

        {/* Bottom CTA */}
        {!isLoading && !isError && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground text-sm">
              Want to sponsor multiple children or give a general gift?{" "}
              <button
                onClick={() => {
                  const el = document.getElementById("join-us");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-primary font-bold underline underline-offset-2 hover:text-secondary transition-colors"
              >
                See all giving options →
              </button>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
