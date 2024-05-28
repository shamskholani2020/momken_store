import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { UiEditorContext } from "../../../context/UiEditor/UiEditor";

import { getBackgroundColorProps } from "../../getBackgroundColorProps";

import ButtonBuilder from "./Components/ButtonBuilder";
import DivBuilder from "./Components/DivBuilder";
import GridBuilder from "./Components/GridBuilder";
import IconBuilder from "./Components/IconBuilder";
import ProductBuilder from "./Components/ProductBuilder";
import TextBuilder from "./Components/TextBuilder";
import { getAnimationProps } from "../../getAnimationProps";
import { useNavigate } from "react-router-dom";

export default function SectionBuilder({ key, el, activeBreakpoint }) {
  const { store, pages } = useContext(UiEditorContext);

  const [isEditModeForText, setIsEditModeForText] = useState(false);

  const position = el?.position[activeBreakpoint];

  const nav = useNavigate();

  return (
    <motion.div
      {...getAnimationProps(el?.animation, true)}
      value={el}
      key={key}
      id={el?._id}
      onClick={(event) => {
        event.stopPropagation();
        event.stopPropagation();

        if (el?.event?.type === "navigation") {
          nav(el?.event?.value);
        } else if (el?.event?.type == "product") {
          nav("/product-details?productId=" + el?.event?.value);
        } else if (el?.event?.type == "page") {
          const page = pages?.find((pg) => pg?.url == el?.event?.value);
          alert(page?.name);
        }
      }}
      style={{
        width: el?.dimensions?.width[activeBreakpoint]?.includes("auto")
          ? "fit-content"
          : el?.dimensions?.width[activeBreakpoint],
        height: el?.dimensions?.height[activeBreakpoint]?.includes("auto")
          ? "fit-content"
          : el?.dimensions?.height[activeBreakpoint],

        position: position?.type,
        top: position?.specs?.top,
        left: position?.specs?.left,
        right: position?.specs?.right,
        bottom: position?.specs?.bottom,
        zIndex: position?.zIndex,

        gridColumn:
          el?.layout[activeBreakpoint]?.gridColSpan &&
          `span ${el?.layout[activeBreakpoint]?.gridColSpan} / span ${el?.layout[activeBreakpoint]?.gridColSpan}`,

        alignItems: "center",
        alignContent: "center",

        borderRadius: position?.borderRaduis?.total.includes("0")
          ? position?.borderRaduis?.total
          : `${position?.borderRaduis?.topLeft} ${position?.borderRaduis?.topRight} ${position?.borderRaduis?.bottomRight} ${position?.borderRaduis?.bottomLeft}`,

        rotate: position?.rotation + "deg",
        overflow: "clip",
      }}
      className={`${
        (!el?.visable || el?.isDeleted) && "hidden"
      }  relative flex flex-col items-start group gap-5 peer
        `}
    >
      {/* Background */}
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
        className="absolute top-0 start-0 z-0"
      >
        {el?.fill?.map((item) => {
          if (item?.type == "image") {
            return (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  display: !item?.options?.visiable && "none",
                  objectFit:
                    item?.options?.size[activeBreakpoint] ??
                    item?.options?.size,
                  opacity: item?.options?.opacity,
                  zIndex: "auto",
                }}
                className={`${item.options?.size} absolute top-0 start-0 `}
                // src={item?.srcs ? item?.srcs[canvasMediaPreview] : item.value}
                src={item?.srcs ? item?.srcs["original"] : item.value}
              />
            );
          } else {
            return (
              <div
                style={{
                  ...getBackgroundColorProps(el, item),
                }}
                className="w-full h-full absolute top-0 start-0"
              ></div>
            );
          }
        })}
      </div>

      {/* Builders */}
      <div
        style={{
          zIndex: el?.fill?.length + 1,
        }}
        className="w-full h-full "
      >
        {/* Div Builder */}
        {el?.type == "div" && (
          <DivBuilder
            activeBreakpoint={activeBreakpoint}
            el={el}
            key={el?._id + "child"}
          />
        )}

        {el?.type == "grid" && (
          <GridBuilder
            activeBreakpoint={activeBreakpoint}
            el={el}
            key={el?._id + "child"}
          />
        )}

        {el?.type == "text" && (
          <TextBuilder
            activeBreakpoint={activeBreakpoint}
            el={el}
            key={el?._id + "child"}
          />
        )}

        {(el?.type == "heading" ||
          el?.type == "paragraph" ||
          el?.type == "body" ||
          el?.type == "link") && (
          <>
            {isEditModeForText && (
              <form
                className="w-full"
                onSubmit={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  if (isEditMode) {
                    setIsEditModeForText(false);
                  }
                }}
              >
                <input
                  style={{
                    fontSize: store.props.theme.typography[el?.type].font.size,
                    fontWeight:
                      store.props.theme.typography[el?.type].font.weight,
                    fontFamily:
                      store.props.theme.typography[el?.type].font.family,
                    backgroundColor: "transparent",
                    ...getBackgroundColorProps(el, el?.fill[0]),
                  }}
                  value={el?.content?.text?.en}
                  onChange={(event) => {
                    if (isEditMode) {
                      if (activeElements.find((ele) => ele?._id == el?._id)) {
                        el.content.text.en = event.target.value;
                        handleUpdate();
                      }
                    }
                  }}
                  className="w-full border-info border-4"
                />
              </form>
            )}
            {!isEditModeForText && (
              <motion.h1
                style={{
                  fontSize: store.props.theme.typography[el?.type].font.size,
                  fontWeight:
                    store.props.theme.typography[el?.type].font.weight,
                  fontFamily:
                    store.props.theme.typography[el?.type].font.family,
                  // color: getBackground(el?.fill),
                  textAlign:
                    store.props.theme.typography[el?.type].font.textAlign,

                  ...getBackgroundColorProps(el, el?.fill[0]),
                }}
                className={` w-full ${
                  el?.content?.font[activeBreakpoint]?.decoration
                    ?.lineThrough && "line-through"
                } ${
                  el?.content?.font[activeBreakpoint]?.decoration?.underline &&
                  "underline"
                } ${
                  el?.content?.font[activeBreakpoint]?.decoration?.italic &&
                  "italic"
                }`}
              >
                {el?.content?.text?.en}
              </motion.h1>
            )}
          </>
        )}

        {el?.type == "button" && (
          <ButtonBuilder
            activeBreakpoint={activeBreakpoint}
            el={el}
            key={el?._id + "child"}
          />
        )}

        {el?.type == "icon" && (
          <IconBuilder
            activeBreakpoint={activeBreakpoint}
            el={el}
            key={el?._id + "child"}
          />
        )}

        {el?.type == "product" && (
          <ProductBuilder el={el} key={el?._id + "key"} />
        )}
      </div>
    </motion.div>
  );
}
