import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface StoryItem {
  title: string;
  date: string;
  content: string;
  icon?: string;
}

interface LoveStoryTimelineProps {
  stories: StoryItem[];
  className?: string;
  variant?: "classic" | "modern" | "elegant" | "romantic";
  accentColor?: string;
}

const LoveStoryTimeline = ({
  stories,
  className = "",
  variant = "classic",
  accentColor = "rose"
}: LoveStoryTimelineProps) => {
  const colorClasses = {
    rose: {
      badge: "bg-rose-500",
      line: "bg-rose-200",
      border: "border-rose-200",
      text: "text-rose-600",
      bg: "bg-rose-50",
      glow: "shadow-rose-200",
    },
    amber: {
      badge: "bg-amber-600",
      line: "bg-amber-200",
      border: "border-amber-200",
      text: "text-amber-700",
      bg: "bg-amber-50",
      glow: "shadow-amber-200",
    },
    emerald: {
      badge: "bg-emerald-600",
      line: "bg-emerald-200",
      border: "border-emerald-200",
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      glow: "shadow-emerald-200",
    },
    slate: {
      badge: "bg-slate-700",
      line: "bg-slate-300",
      border: "border-slate-300",
      text: "text-slate-700",
      bg: "bg-slate-50",
      glow: "shadow-slate-200",
    },
    pink: {
      badge: "bg-pink-500",
      line: "bg-pink-200",
      border: "border-pink-200",
      text: "text-pink-600",
      bg: "bg-pink-50",
      glow: "shadow-pink-200",
    },
  };

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.rose;

  if (variant === "modern") {
    return (
      <div className={`relative ${className}`}>
        <div className="space-y-0">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className={`w-full md:w-5/12 p-6 ${colors.bg} rounded-2xl border ${colors.border} shadow-lg ${colors.glow}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{story.icon || story.title.charAt(0)}</span>
                  <div>
                    <h4 className={`font-semibold ${colors.text}`}>
                      {story.title.replace(/^[^\s]+\s/, "")}
                    </h4>
                    <p className="text-xs text-gray-500">{story.date}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{story.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "elegant") {
    return (
      <div className={`relative ${className}`}>
        <div className="space-y-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className={`absolute left-0 top-0 w-1 h-full ${colors.line} rounded-full`} />
              <div className={`absolute left-0 top-2 w-1 h-4 ${colors.badge} rounded-full`} />
              
              <div className="ml-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{story.icon || "✨"}</span>
                  <span className={`text-sm font-medium ${colors.text}`}>{story.date}</span>
                </div>
                <h4 className="font-serif text-xl text-gray-800 mb-2">
                  {story.title.replace(/^[^\s]+\s/, "")}
                </h4>
                <p className="text-gray-600 leading-relaxed">{story.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "romantic") {
    return (
      <div className={`relative ${className}`}>
        {/* Center line with hearts */}
        <div className={`absolute left-1/2 top-0 bottom-0 w-px ${colors.line} -translate-x-1/2`} />
        
        <div className="space-y-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Center heart icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: index * 0.2 + 0.3 }}
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 ${colors.badge} rounded-full flex items-center justify-center shadow-lg z-10`}
              >
                <Heart className="h-5 w-5 text-white fill-white" />
              </motion.div>

              <div className={`grid grid-cols-2 gap-8 pt-6`}>
                <div className={`text-right ${index % 2 === 0 ? "" : "order-2"}`}>
                  {index % 2 === 0 ? (
                    <>
                      <span className={`text-sm ${colors.text} font-medium`}>{story.date}</span>
                      <h4 className="font-serif text-lg text-gray-800 mt-1">{story.title.replace(/^[^\s]+\s/, "")}</h4>
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{story.content}</p>
                    </>
                  ) : (
                    <div className="flex justify-end">
                      <span className="text-3xl">{story.icon || "💕"}</span>
                    </div>
                  )}
                </div>
                <div className={`text-left ${index % 2 === 0 ? "" : "order-1"}`}>
                  {index % 2 !== 0 ? (
                    <>
                      <span className={`text-sm ${colors.text} font-medium`}>{story.date}</span>
                      <h4 className="font-serif text-lg text-gray-800 mt-1">{story.title.replace(/^[^\s]+\s/, "")}</h4>
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{story.content}</p>
                    </>
                  ) : (
                    <div className="flex justify-start">
                      <span className="text-3xl">{story.icon || "💕"}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Classic variant (default)
  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 ${colors.line} md:-translate-x-1/2`} />

      <div className="space-y-8">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex items-start gap-6 md:gap-0 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Badge number */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: index * 0.2 + 0.3 }}
              className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 ${colors.badge} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10`}
            >
              {index + 1}
            </motion.div>

            {/* Content */}
            <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
              <div className={`${colors.bg} p-6 rounded-2xl border ${colors.border} shadow-lg ${colors.glow}`}>
                <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <span className="text-3xl">{story.icon || story.title.match(/^[^\s]+/)?.[0] || "💕"}</span>
                  <div className={index % 2 === 0 ? "md:text-right" : ""}>
                    <h4 className={`font-semibold ${colors.text}`}>
                      {story.title.replace(/^[^\s]+\s/, "")}
                    </h4>
                    <p className="text-xs text-gray-500">{story.date}</p>
                  </div>
                </div>
                <p className={`text-gray-600 text-sm leading-relaxed ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  {story.content}
                </p>
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block md:w-5/12" />
          </motion.div>
        ))}
      </div>

      {/* End heart */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: stories.length * 0.2 }}
        className={`relative left-6 md:left-1/2 mt-8 -translate-x-1/2 w-16 h-16 ${colors.badge} rounded-full flex items-center justify-center shadow-xl`}
      >
        <Heart className="h-8 w-8 text-white fill-white" />
      </motion.div>
    </div>
  );
};

export default LoveStoryTimeline;
