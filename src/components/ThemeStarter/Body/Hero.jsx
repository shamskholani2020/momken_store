import React from "react";
import { storeId } from "../../../utils/utils";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="grid grid-cols-4 grid-rows-2 w-full h-[500px] gap-2">
      {[
        {
          name: "",
          color: "DEE3EF",
          image:
            "https://dropovercl.s3.amazonaws.com/73796f16-74b2-4952-8b39-571cf6fba291/608284ce-848f-4d67-ac35-13d828b633e1/fe85d602-3b87-452f-a4fa-4fd8a5cb4df2.png",
          colSpan: 2,
          rowSpan: 2,
          content: {
            title: {
              en: "Upgrade Your Tech Game",
              ar: "ترقية لعبتك التقنية",
            },
            subtitle: {
              en: "Find your perfect phone — sleek and stylish or budget-friendly.",
              ar: "ابحث عن هاتفك المثالي-أنيق وأنيق أو صديق للميزانية.",
            },
            button: {
              text: { en: "Shop Now", ar: "تسوق الآن" },
              link: `/shop?store=${storeId}`,
            },
            badge: {
              en: "New",
              ar: "جديد",
            },
          },
        },
        {
          name: "",
          color: "EFF3FF",
          image:
            "https://dropovercl.s3.amazonaws.com/004d5fff-629b-45c6-b33e-a6a043e0128b/6ba41f2a-f1ed-48e7-a550-4b8ecdfcf158/5736bb81-df3b-4f1d-9aff-1d2d5d47dbbe.png",
          colSpan: 1,
          rowSpan: 2,
          content: {
            title: {
              en: "Discover ideal gaming solutions",
              ar: "مرحبًا بك في بداية المظهر",
            },
            subtitle: {
              en: null,
              ar: null,
            },
            button: {
              text: { en: null, ar: null },
              link: null,
            },
            badge: {
              en: "GAMING",
              ar: "الألعاب",
            },
          },
        },
        {
          name: "",
          color: "F0E8E2",
          image:
            "https://dropovercl.s3.amazonaws.com/8d71f228-c892-43b9-867d-347a3193ea74/42bc1142-ee08-4249-a5c3-4b1906180f43/3eb22aea-b467-4c08-b8b8-d0d4d475618f.png",
          colSpan: 1,
          rowSpan: 1,
          content: {
            title: {
              en: "Hear the Difference",
              ar: "مرحبًا بك في بداية المظهر",
            },
            subtitle: {
              en: null,
              ar: null,
            },
            button: {
              text: { en: null, ar: null },
              link: null,
            },
            badge: {
              en: "HEADPHONES",
              ar: "سماعات الرأس",
            },
          },
        },
        {
          name: "",
          color: "E5E5D5",
          image:
            "https://dropovercl.s3.amazonaws.com/79dd900c-e22d-47ea-a96e-da94a696c109/a2c0a74f-b0df-442a-8cd5-233e22d60a4e/ecc8fbe0-1d99-4e99-9665-3b44257baba9.png",
          colSpan: 1,
          rowSpan: 1,
          content: {
            title: {
              en: "Experience the Latest Technology",
              ar: "مرحبًا بك في بداية المظهر",
            },
            subtitle: {
              en: null,
              ar: null,
            },
            button: {
              text: { en: null, ar: null },
              link: null,
            },
            badge: {
              en: "Smart Watches",
              ar: "الساعات الذكية",
            },
          },
        },
      ].map((el, index) => {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 + index * 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{
              gridColumn: `span ${el.colSpan} / span ${el.colSpan}`,
              gridRow: `span ${el.rowSpan} / span ${el.rowSpan}`,
              backgroundColor: `#${el.color}`,
              backgroundImage: `url(${el.image})`,
              backgroundSize: "auto 100%",

              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className={`w-full col-span-1 row-span-1 h-full relative flex flex-col items-start justify-start p-5 rounded-2xl bg-base-300  `}
          >
            <div className="flex flex-col items-start justify-between w-3/5 h-full">
              {el?.content?.badge?.en && (
                <div className="p-2 px-4 text-xs bg-base-100 rounded-2xl">
                  {el?.content?.badge?.en}
                </div>
              )}
              <div className="flex w-full items-start justify-start flex-col gap-2">
                {el?.content?.title?.en && (
                  <h1
                    style={{
                      lineHeight: "1.3",
                    }}
                    className={`${
                      index == 0
                        ? "text-5xl  w-full font-semibold"
                        : "text-xl w-full font-semibold"
                    }`}
                  >
                    {el.content.title.en}
                  </h1>
                )}
                {el?.content?.subtitle?.en && (
                  <p className="text-lg">{el.content.subtitle.en}</p>
                )}
              </div>
              {el?.content?.button?.text?.en && (
                <a href={el.content.button.link} className="btn btn-primary">
                  {el.content.button.text.en}
                </a>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
